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
reveals();
