const reduce = matchMedia("(prefers-reduced-motion: reduce)");

function countdown() {
  const box = document.querySelector("[data-countdown]");
  if (!box) return;
  const start = Date.parse(box.dataset.start);
  const end = Date.parse(box.dataset.end);
  const lead = box.querySelector("[data-countdown-lead]");
  const cells = box.querySelector(".countdown__cells");
  const units = Object.fromEntries([...box.querySelectorAll("[data-unit]")].map((el) => [el.dataset.unit, el]));
  let timer = 0;

  const tick = () => {
    const now = Date.now();
    if (now >= end) {
      lead.textContent = "Thank you for coming. See you at the next one.";
      cells.hidden = true;
      clearInterval(timer);
      return;
    }
    if (now >= start) {
      lead.textContent = "Happening now at Pearlmont Hotel.";
      cells.hidden = true;
      return;
    }
    const s = Math.floor((start - now) / 1000);
    units.days.textContent = String(Math.floor(s / 86400));
    units.hours.textContent = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
    units.minutes.textContent = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    units.seconds.textContent = String(s % 60).padStart(2, "0");
  };

  lead.textContent = "Starts in";
  cells.hidden = false;
  tick();
  timer = setInterval(tick, 1000);
}

function viewer() {
  const links = document.querySelectorAll("a.zoom");
  if (!links.length || !("showModal" in HTMLDialogElement.prototype)) return;

  const dialog = document.createElement("dialog");
  dialog.className = "viewer";
  dialog.dataset.ui = "";
  dialog.setAttribute("aria-label", "Photo");
  dialog.innerHTML = `
    <div class="viewer__frame"><img class="viewer__img" alt=""></div>
    <div class="viewer__text">
      <p class="viewer__title"></p>
      <details class="viewer__more">
        <summary>More details</summary>
        <p class="viewer__alt"></p>
        <p class="viewer__details"></p>
      </details>
      <button type="button" class="button button--ink viewer__close">Close</button>
    </div>`;
  document.body.append(dialog);

  const frame = dialog.querySelector(".viewer__frame");
  const img = dialog.querySelector(".viewer__img");
  const title = dialog.querySelector(".viewer__title");
  const more = dialog.querySelector(".viewer__more");
  const alt = dialog.querySelector(".viewer__alt");
  const details = dialog.querySelector(".viewer__details");
  let opener = null;

  const fill = (el, text) => {
    el.textContent = text;
    el.hidden = !text;
  };

  for (const link of links) {
    link.setAttribute("aria-label", "Open photo: " + (link.querySelector("img")?.alt || "photo"));
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      const figure = link.closest("figure");
      const source = link.querySelector("img");
      const caption = figure?.querySelector("figcaption");
      opener = link;
      img.src = link.href;
      img.alt = source.alt;
      frame.classList.remove("is-zoomed");
      fill(title, caption ? [...caption.children].map((c) => c.textContent).join(" · ") || caption.textContent : "");
      fill(alt, source.alt);
      fill(details, figure?.dataset.details || "");
      more.hidden = !source.alt && !figure?.dataset.details;
      more.open = false;
      dialog.showModal();
    });
  }

  img.addEventListener("click", () => frame.classList.toggle("is-zoomed"));
  dialog.querySelector(".viewer__close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    img.removeAttribute("src");
    requestAnimationFrame(() => opener?.focus());
  });
}

function albums() {
  const stacks = document.querySelectorAll("a.stack[data-album]");
  if (!stacks.length || !("showModal" in HTMLDialogElement.prototype)) return;
  document.documentElement.classList.add("has-albums");

  const dialog = document.createElement("dialog");
  dialog.className = "album-viewer";
  dialog.dataset.ui = "";
  dialog.setAttribute("aria-labelledby", "album-viewer-title");
  dialog.innerHTML = `
    <div class="album-viewer__bar">
      <button type="button" class="album-viewer__back" hidden>All photos</button>
      <h2 class="album-viewer__title" id="album-viewer-title"></h2>
      <p class="album-viewer__count" aria-live="polite"></p>
      <button type="button" class="button button--ink album-viewer__close">Close</button>
    </div>
    <ul class="album-viewer__grid"></ul>
    <div class="album-viewer__slide" hidden>
      <figure class="album-viewer__figure">
        <div class="album-viewer__frame"><img class="album-viewer__img" alt=""></div>
        <figcaption class="album-viewer__caption"></figcaption>
      </figure>
      <button type="button" class="album-viewer__nav album-viewer__nav--prev" aria-label="Previous photo">Previous</button>
      <button type="button" class="album-viewer__nav album-viewer__nav--next" aria-label="Next photo">Next</button>
    </div>`;
  document.body.append(dialog);

  const $ = (sel) => dialog.querySelector(sel);
  const title = $(".album-viewer__title");
  const count = $(".album-viewer__count");
  const back = $(".album-viewer__back");
  const grid = $(".album-viewer__grid");
  const slide = $(".album-viewer__slide");
  const img = $(".album-viewer__img");
  const caption = $(".album-viewer__caption");
  const prev = $(".album-viewer__nav--prev");
  const next = $(".album-viewer__nav--next");
  let photos = [];
  let index = -1;
  let opener = null;

  const preload = (i) => {
    if (photos[i]) new Image().src = photos[i].href;
  };

  const showGrid = () => {
    index = -1;
    slide.hidden = true;
    grid.hidden = false;
    back.hidden = true;
    title.hidden = false;
    count.textContent = `${photos.length} photos`;
  };

  const showSlide = (i) => {
    index = Math.max(0, Math.min(photos.length - 1, i));
    const photo = photos[index];
    img.src = photo.href;
    img.alt = photo.alt;
    img.width = photo.width;
    img.height = photo.height;
    caption.textContent = photo.caption;
    count.textContent = `Photo ${index + 1} of ${photos.length}`;
    prev.disabled = index === 0;
    next.disabled = index === photos.length - 1;
    grid.hidden = true;
    slide.hidden = false;
    back.hidden = false;
    title.hidden = true;
    preload(index + 1);
    preload(index - 1);
  };

  const focusThumb = (i) => grid.querySelectorAll("button")[i]?.focus();

  for (const stack of stacks) {
    const list = document.getElementById(stack.dataset.album);
    if (!list) continue;
    stack.setAttribute("role", "button");
    stack.addEventListener("click", (event) => {
      event.preventDefault();
      opener = stack;
      photos = [...list.querySelectorAll("a")].map((a) => ({
        href: a.href,
        thumb: a.querySelector("img").currentSrc || a.querySelector("img").src,
        crop: a.querySelector("img").className,
        alt: a.querySelector("img").alt,
        caption: a.dataset.caption || "",
        width: Number(a.dataset.width) || 0,
        height: Number(a.dataset.height) || 0,
      }));
      title.textContent = list.dataset.title || "Photos";
      grid.replaceChildren(
        ...photos.map((photo, i) => {
          const li = document.createElement("li");
          const button = document.createElement("button");
          button.type = "button";
          button.className = "album-viewer__thumb";
          button.setAttribute("aria-label", `Open photo ${i + 1} of ${photos.length}: ${photo.caption || photo.alt}`);
          const thumb = document.createElement("img");
          thumb.src = photo.thumb;
          thumb.alt = "";
          thumb.className = photo.crop;
          button.append(thumb);
          button.addEventListener("click", () => {
            showSlide(i);
            (next.disabled ? prev : next).focus();
          });
          li.append(button);
          return li;
        }),
      );
      showGrid();
      dialog.showModal();
      focusThumb(0);
    });
  }

  back.addEventListener("click", () => {
    const last = index;
    showGrid();
    focusThumb(last);
  });
  const step = (delta) => {
    showSlide(index + delta);
    if (dialog.contains(document.activeElement) && !document.activeElement.disabled) return;
    (next.disabled ? prev : next).focus();
  };
  prev.addEventListener("click", () => step(-1));
  next.addEventListener("click", () => step(1));
  $(".album-viewer__close").addEventListener("click", () => dialog.close());

  dialog.addEventListener("keydown", (event) => {
    if (index < 0) return;
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });
  dialog.addEventListener("cancel", (event) => {
    if (index < 0) return;
    event.preventDefault();
    back.click();
  });

  let startX = null;
  slide.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
  });
  slide.addEventListener("pointerup", (event) => {
    if (startX === null) return;
    const dx = event.clientX - startX;
    startX = null;
    if (Math.abs(dx) < 50) return;
    step(dx < 0 ? 1 : -1);
  });

  dialog.addEventListener("close", () => {
    img.removeAttribute("src");
    requestAnimationFrame(() => opener?.focus());
  });
}

function reveals() {
  if (reduce.matches || !("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("motion");
  const seen = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        seen.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  for (const el of document.querySelectorAll("[data-reveal]")) seen.observe(el);
}

countdown();
viewer();
albums();
reveals();
