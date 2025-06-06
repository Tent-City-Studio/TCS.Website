/* Global configuration for site-wide values */
const SITE_CONFIG = {
  links: {
    twitter: 'https://twitter.com/tentcity',
    discord: 'https://discord.gg/tentcity',
    youtube: 'https://youtube.com/tentcity'
  }
};

/* Intersection Observer for scroll reveal */
document.addEventListener('DOMContentLoaded', () => {
  // Replace any anchor with a data-link attribute using SITE_CONFIG values
  document.querySelectorAll('[data-link]').forEach(el => {
    const key = el.dataset.link;
    if (SITE_CONFIG.links[key]) {
      el.href = SITE_CONFIG.links[key];
    }
  });

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
