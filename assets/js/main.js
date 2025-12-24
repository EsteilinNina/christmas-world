"use strict";

/**
 * Lazy loading manual para imágenes
 * Mejora rendimiento y Core Web Vitals
 */
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]");

  const loadImage = (img) => {
    img.src = img.dataset.src;
    img.removeAttribute("data-src");
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        obs.unobserve(entry.target);
      }
    });
  });

  images.forEach(img => observer.observe(img));
});

/**
 * Año dinámico en footer
 */
const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
