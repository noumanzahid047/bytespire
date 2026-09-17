/* =========================================
   NexaCart – script.js
   ========================================= */

/* ── Sticky header shadow ───────────────── */
(function () {
  const header = document.getElementById("site-header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile nav ─────────────────────────── */
(function () {
  const openBtn   = document.getElementById("nav-hamburger");
  const closeBtn  = document.getElementById("nav-mobile-close");
  const overlay   = document.getElementById("nav-mobile");
  if (!openBtn || !overlay) return;

  const open  = () => { overlay.classList.add("open"); document.body.style.overflow = "hidden"; };
  const close = () => { overlay.classList.remove("open"); document.body.style.overflow = ""; };

  openBtn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });

  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
})();

/* ── Active nav link ────────────────────── */
(function () {
  const links = document.querySelectorAll(".nav__link, .nav__mobile-link");
  links.forEach(link => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".nav__link").forEach(l => l.classList.remove("active"));
      if (link.classList.contains("nav__link")) link.classList.add("active");
    });
  });
})();

/* ── Scroll-reveal (IntersectionObserver) ── */
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach(el => io.observe(el));
})();

/* ── Progress bar animation ─────────────── */
(function () {
  const bars = document.querySelectorAll(".why__progress-bar");
  if (!bars.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.width || "0%";
          io.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach(bar => io.observe(bar));
})();

/* ── Newsletter form validation ─────────── */
(function () {
  const form       = document.getElementById("newsletter-form");
  const input      = document.getElementById("newsletter-email");
  const errorEl    = document.getElementById("newsletter-error");
  const successEl  = document.getElementById("newsletter-success");
  if (!form || !input) return;

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const showError = (msg) => {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.style.display = "block";
    input.style.borderColor = "#dc2626";
  };
  const clearError = () => {
    if (!errorEl) return;
    errorEl.style.display = "none";
    input.style.borderColor = "";
  };

  input.addEventListener("input", clearError);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearError();
    const val = input.value.trim();
    if (!val) { showError("Please enter your email address."); return; }
    if (!isValidEmail(val)) { showError("Please enter a valid email address."); return; }

    /* Simulate submission */
    const btn = form.querySelector(".newsletter-btn");
    if (btn) { btn.textContent = "Subscribing…"; btn.disabled = true; }

    setTimeout(() => {
      form.style.display = "none";
      if (successEl) successEl.style.display = "flex";
    }, 900);
  });
})();

/* ── Cart icon placeholder feedback ─────── */
(function () {
  const cartBtn = document.getElementById("cart-btn");
  if (!cartBtn) return;
  cartBtn.addEventListener("click", () => {
    cartBtn.style.transform = "scale(0.85)";
    setTimeout(() => { cartBtn.style.transform = ""; }, 180);
  });
})();

/* ── Search icon placeholder ─────────────── */
(function () {
  const searchBtn = document.getElementById("search-btn");
  if (!searchBtn) return;
  searchBtn.addEventListener("click", () => {
    alert("Search functionality coming soon!");
  });
})();

/* ── Smooth scroll for anchor links ─────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    /* Close mobile nav if open */
    const overlay = document.getElementById("nav-mobile");
    if (overlay) {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
});

/* ── "View Product" button ripple effect ── */
document.querySelectorAll(".product-card__btn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position:absolute;width:1px;height:1px;border-radius:50%;
      background:rgba(255,255,255,.5);transform:scale(0);
      left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;
      pointer-events:none;animation:ripple .5s ease-out forwards;
    `;
    if (!this.style.position) this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 550);
  });
});

/* inject ripple keyframe */
const style = document.createElement("style");
style.textContent = "@keyframes ripple{to{transform:scale(120);opacity:0}}";
document.head.appendChild(style);
