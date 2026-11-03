const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const revealTargets = document.querySelectorAll(
  '.section-kicker, .about-layout, .principles article, .section-heading, .project-card, .skills-layout, .tool-row, .contact-content'
);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-ready');
  revealTargets.forEach((element) => element.setAttribute('data-reveal', ''));

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((element) => revealObserver.observe(element));
}

const portraitSlides = Array.from(document.querySelectorAll('.portrait-slide'));
const photoToggle = document.querySelector('.photo-toggle');
let activePortrait = 0;
let slideshowPaused = false;

function showPortrait(index) {
  portraitSlides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === index;
    slide.classList.toggle('is-active', isActive);
    slide.setAttribute('aria-hidden', String(!isActive));
  });
  activePortrait = index;
}

if (portraitSlides.length > 1) {
  window.setInterval(() => {
    if (!slideshowPaused && !document.hidden) {
      showPortrait((activePortrait + 1) % portraitSlides.length);
    }
  }, 4000);
}

photoToggle?.addEventListener('click', () => {
  slideshowPaused = !slideshowPaused;
  photoToggle.setAttribute('aria-pressed', String(slideshowPaused));
  photoToggle.setAttribute('aria-label', slideshowPaused ? 'Reprendre le diaporama' : 'Mettre le diaporama en pause');
  photoToggle.textContent = slideshowPaused ? '▶' : 'Ⅱ';
});
