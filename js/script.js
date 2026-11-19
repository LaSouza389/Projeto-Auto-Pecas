// WhatsApp oficial informado pela empresa, em formato internacional e somente com dígitos.
// Para atualizar o contato, altere apenas esta variável.
const WHATSAPP_PHONE = "5531987039987";
const WHATSAPP_MESSAGE = "Olá! Encontrei o site da Auto Peças Gold e gostaria de saber mais sobre os produtos disponíveis.";

const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.href = whatsappUrl;
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".nav-link")];

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  siteNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.open) {
    lightbox.close();
    return;
  }
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const revealElements = document.querySelectorAll(".reveal");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const activeId = entry.target.id;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-30% 0px -60% 0px" });

["inicio", "sobre", "produtos", "galeria", "contato"].forEach((id) => {
  const section = document.getElementById(id);
  if (section) sectionObserver.observe(section);
});

const backToTop = document.querySelector(".back-to-top");
const updateBackToTop = () => backToTop.classList.toggle("is-visible", window.scrollY > 500);
window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
});

const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");
let lastGalleryTrigger;

document.querySelectorAll("[data-lightbox]").forEach((item) => {
  item.addEventListener("click", () => {
    lastGalleryTrigger = item;
    lightboxImage.src = item.dataset.lightbox;
    lightboxImage.alt = item.dataset.alt || "";
    lightbox.showModal();
    lightboxClose.focus();
  });
});

lightboxClose.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => {
  lightboxImage.removeAttribute("src");
  lastGalleryTrigger?.focus();
  lastGalleryTrigger = null;
});

document.getElementById("current-year").textContent = String(new Date().getFullYear());
