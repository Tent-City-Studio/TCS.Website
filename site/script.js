/* Global configuration for site-wide values */
const SITE_CONFIG = {
  links: {
    twitter: 'https://twitter.com/tentcity',
    discord: 'https://discord.gg/knwtcq3N2a',
    youtube: 'https://www.youtube.com/@damonfedorick'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Replace anchors with configured links
  document.querySelectorAll('[data-link]').forEach(el => {
    const key = el.dataset.link;
    if (SITE_CONFIG.links[key]) el.href = SITE_CONFIG.links[key];
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => revealObs.observe(el));

  // Animated counters
  document.querySelectorAll('.number[data-counter]').forEach(el => {
    const target = parseFloat(el.dataset.counter);
    const counterObs = new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting) {
        let val = 0;
        const step = () => {
          val += target / 60;
          if (val >= target) val = target;
          el.textContent = val.toFixed(target % 1 ? 1 : 0);
          if (val < target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.6 });
    counterObs.observe(el);
  });

  // Sticky nav show/hide
  const nav = document.getElementById('mainNav');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.classList.toggle('solid', y > 10);
    if (y > lastScroll && y > 50) nav.classList.add('hidden');
    else nav.classList.remove('hidden');
    lastScroll = y;
  });

  // Mobile drawer
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeBtn');
  const drawer = document.getElementById('drawer');
  menuBtn && menuBtn.addEventListener('click', () => drawer.classList.remove('hidden'));
  closeBtn && closeBtn.addEventListener('click', () => drawer.classList.add('hidden'));

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        drawer && drawer.classList.add('hidden');
      }
    });
  });
});
