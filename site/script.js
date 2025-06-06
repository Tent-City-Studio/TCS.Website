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
    const imgs = Array.from(gallery.querySelectorAll('img'));
    let current = 0;
    const show = (idx) => {
      if (idx < 0) idx = imgs.length - 1;
      if (idx >= imgs.length) idx = 0;
      current = idx;
      const lb = document.querySelector('.lightbox');
      if (!lb) return;
      lb.querySelector('img').src = imgs[current].src;
      lb.querySelector('img').alt = imgs[current].alt;
      lb.querySelector('.caption').textContent = imgs[current].alt;
    };
    const open = (idx) => {
      current = idx;
      const lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = `<button class="nav prev">&lt;</button>`+
        `<img src="${imgs[current].src}" alt="${imgs[current].alt}" loading="lazy">`+
        `<button class="nav next">&gt;</button>`+
        `<p class="caption">${imgs[current].alt}</p>`;
      lb.addEventListener('click', e => { if (e.target === lb) lb.remove(); });
      lb.querySelector('.prev').addEventListener('click', e => { e.stopPropagation(); show(current-1); });
      lb.querySelector('.next').addEventListener('click', e => { e.stopPropagation(); show(current+1); });
      document.addEventListener('keydown', keyHandler);
      document.body.appendChild(lb);
    };
    const keyHandler = (e) => {
      const lb = document.querySelector('.lightbox');
      if (!lb) return;
      if (e.key === 'Escape') lb.remove();
      if (e.key === 'ArrowRight') show(current+1);
      if (e.key === 'ArrowLeft') show(current-1);
    };
    gallery.addEventListener('click', e => {
      const target = e.target.closest('img');
      if (!target) return;
      open(imgs.indexOf(target));
    });
  }

  if (window.hljs) {
    hljs.highlightAll();
  }

  const loadBtn = document.getElementById('loadMore');
  if (loadBtn) {
    loadBtn.addEventListener('click', () => {
      const posts = document.querySelectorAll('main article');
      posts.forEach(p => loadBtn.before(p.cloneNode(true)));
    });
  }
});
