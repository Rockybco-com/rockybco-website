/* ============================================ */ /* ROCKYBCO — NAVIGATION JS */ /* ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav a'); /* Scroll shadow */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }); /* Hamburger toggle */
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
  } /* Close mobile nav on link click */
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  }); /* Scroll reveal with IntersectionObserver */
  const revealEls = document.querySelectorAll('.reveal, .stagger-children');
  const pending = new Set(revealEls);
  const show = (el) => {
    el.classList.add('visible');
    pending.delete(el);
  };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        show(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });
  revealEls.forEach(el => revealObserver.observe(el));
  /* Safety sweep: IO only fires on intersection crossings, so a fast jump
     (Page Down, anchor link, restored scroll) can skip small elements
     entirely. Reveal anything the viewport has reached or passed. */
  let sweeping = false;
  const sweep = () => {
    sweeping = false;
    const limit = window.innerHeight - 40;
    pending.forEach(el => {
      if (el.getBoundingClientRect().top < limit) {
        revealObserver.unobserve(el);
        show(el);
      }
    });
  };
  window.addEventListener('scroll', () => {
    if (!sweeping) {
      sweeping = true;
      requestAnimationFrame(sweep);
    }
  }, { passive: true });
});