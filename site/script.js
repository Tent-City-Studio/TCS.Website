/* Intersection Observer for scroll reveal */
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('[data-reveal]');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => obs.observe(el));

  // Lightbox for screenshots
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.addEventListener('click', e => {
      const target = e.target.closest('img');
      if (!target) return;
      const lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = `<img src="${target.src}" alt="${target.alt}" loading="lazy">`;
      lb.addEventListener('click', () => lb.remove());
      document.body.appendChild(lb);
    });
  }
});
