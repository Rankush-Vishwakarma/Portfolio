'use strict';

/* =========================================================
   GLOBAL HELPERS
   ========================================================= */

const elementToggleFunc = (elem) => {
  if (elem) {
    elem.classList.toggle('active');
  }
};


/* =========================================================
   PIPELINE SPINE
   ========================================================= */

const spineRunner = document.getElementById('spineRunner');

if (spineRunner) {
  let ticking = false;

  const updateSpine = () => {
    const scrollTop = window.scrollY;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      scrollHeight > 0
        ? scrollTop / scrollHeight
        : 0;

    const maxTravel =
      Math.max(
        0,
        window.innerHeight - spineRunner.offsetHeight
      );

    spineRunner.style.transform =
      `translateY(${progress * maxTravel}px)`;

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateSpine);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateSpine);

  updateSpine();
}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

const navigationLinks =
  document.querySelectorAll('[data-nav]');

const pages =
  document.querySelectorAll('.page');

if (navigationLinks.length && pages.length) {

  const activatePage = (pageName) => {

    const targetPage =
      document.getElementById(`page-${pageName}`);

    if (!targetPage) {
      console.warn(
        `Page not found: page-${pageName}`
      );
      return;
    }

    /* Remove active state from every page */
    pages.forEach((page) => {
      page.classList.remove('active');
    });

    /* Remove active state from every nav item */
    navigationLinks.forEach((link) => {
      link.classList.remove('active');
    });

    /* Activate requested page */
    targetPage.classList.add('active');

    /* Activate matching nav item */
    navigationLinks.forEach((link) => {
      if (link.dataset.nav === pageName) {
        link.classList.add('active');
      }
    });

    /* Return to top */
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    /* Optional URL state */
    history.replaceState(
      null,
      '',
      `#${pageName}`
    );
  };


  navigationLinks.forEach((link) => {

    link.addEventListener('click', () => {

      const pageName =
        link.dataset.nav;

      activatePage(pageName);

    });

  });


  /* =====================================================
     RESTORE PAGE FROM URL HASH
     ===================================================== */

  const hash =
    window.location.hash.replace('#', '').trim();

  if (
    hash &&
    document.getElementById(`page-${hash}`)
  ) {
    activatePage(hash);
  }

}


/* =========================================================
   KEYBOARD NAVIGATION
   ========================================================= */

document.addEventListener('keydown', (event) => {

  if (
    event.key !== 'ArrowRight' &&
    event.key !== 'ArrowLeft'
  ) {
    return;
  }

  const links =
    Array.from(navigationLinks);

  if (!links.length) {
    return;
  }

  const currentIndex =
    links.findIndex(
      (link) =>
        link.classList.contains('active')
    );

  if (currentIndex === -1) {
    return;
  }

  let nextIndex;

  if (event.key === 'ArrowRight') {
    nextIndex =
      (currentIndex + 1) % links.length;
  } else {
    nextIndex =
      (currentIndex - 1 + links.length) %
      links.length;
  }

  links[nextIndex].click();
});


/* =========================================================
   ACTIVE DOT / STATUS EFFECT
   ========================================================= */

const activeDots =
  document.querySelectorAll('.dot-active');

activeDots.forEach((dot) => {

  dot.addEventListener(
    'mouseenter',
    () => {
      dot.style.transform = 'scale(1.35)';
    }
  );

  dot.addEventListener(
    'mouseleave',
    () => {
      dot.style.transform = 'scale(1)';
    }
  );

});


/* =========================================================
   EXTERNAL LINKS
   ========================================================= */

const externalLinks =
  document.querySelectorAll(
    'a[target="_blank"]'
  );

externalLinks.forEach((link) => {

  link.addEventListener('click', () => {

    link.classList.add('visited');

  });

});


/* =========================================================
   CONSOLE BRANDING
   ========================================================= */

console.log(
  '%cRankush Vishwakarma',
  'font-size:18px;font-weight:600;'
);

console.log(
  '%cSenior Data Engineer · Data Team Lead',
  'font-size:12px;'
);

console.log(
  '%cPipeline initialized.',
  'font-size:11px;'
);