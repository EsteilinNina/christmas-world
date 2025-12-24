"use strict";

(() => {
  /**
   * Lazy loading de imágenes
   * Optimiza rendimiento y Core Web Vitals
   */
  const lazyImages = document.querySelectorAll("img[data-src]");

  const loadImage = (img) => {
    img.src = img.dataset.src;

    if (img.dataset.srcset) {
      img.srcset = img.dataset.srcset;
    }

    img.onload = () => img.classList.add("loaded");

    img.removeAttribute("data-src");
    img.removeAttribute("data-srcset");
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.01
      }
    );

    lazyImages.forEach(img => observer.observe(img));
  } else {
    // Fallback para navegadores antiguos
    lazyImages.forEach(loadImage);
  }

  /**
   * Año dinámico en footer
   */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
