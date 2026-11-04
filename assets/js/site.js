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
reveals();
