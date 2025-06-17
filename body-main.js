// GianniTan main script
console.log("Script loaded!");

// FAQ logica
document.addEventListener('DOMContentLoaded', function () {
  console.log("GianniTan script running...");

  // FAQ collapse gedrag
  document.querySelectorAll('[js-faq-collapse="true"]').forEach(function (element) {
    element.addEventListener('click', function () {
      if (!element.classList.contains('open')) {
        document.querySelectorAll('[js-faq-collapse="true"].open').forEach(function (item) {
          item.click();
        });
        element.classList.add('open');
      } else {
        element.classList.remove('open');
      }
    });
  });

  // Default FAQ openen
  const defaultFaq = document.querySelector('[js-faq-default="true"]');
  if (defaultFaq) defaultFaq.click();

  // Scroll highlight animatie (GSAP SplitText)
  if (window.gsap && window.ScrollTrigger && window.SplitText) {
    gsap.registerPlugin(ScrollTrigger);

    function animate(el) {
      if (el._split) el._split.revert(); // Herstel vorige split
      el._split = new SplitText(el, { type: 'chars, words' });

      gsap.fromTo(
        el._split.chars,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            end: 'top 20%',
            scrub: true
          }
        }
      );
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-highlight').forEach(el => {
      observer.observe(el);
    });
  } else {
    console.error("GSAP, ScrollTrigger of SplitText is niet geladen.");
  }
});

// CookieConsent + Google Analytics (AVG-compliant)
window.addEventListener("load", function () {
  if (window.location.pathname === "/cookie-statement") return;

  const banner = document.querySelector(".cookie-banner");

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied'
  });

  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = name + "=" + value + "; path=/; expires=" + expires.toUTCString();
  }

  function updateScrollLock(showing) {
    document.body.classList.toggle('no-scroll', showing);
  }

  window.cookieconsent.initialise({
    type: "opt-in",
    guiOptions: {
      consentModal: false,
      settingsModal: false
    },
    onInitialise: function (status) {
      if (status === "allow") grantConsentAndLoadAnalytics();
    },
    onStatusChange: function (status) {
      if (status === "allow") grantConsentAndLoadAnalytics();
    }
  });

  const consentStatus = getCookie("cookieconsent_status");

  if (!consentStatus && banner) {
    banner.style.display = "flex";
    updateScrollLock(true);
  } else if (banner) {
    banner.style.display = "none";
    updateScrollLock(false);
  }

  document.addEventListener("click", function (e) {
    const acceptBtn = e.target.closest('[data-cc="c-accept"]');
    if (acceptBtn) {
      banner.style.display = "none";
      setCookie("cookieconsent_status", "allow", 30);
      updateScrollLock(false);
      grantConsentAndLoadAnalytics();
    }
  });

  document.addEventListener("click", function (e) {
    const denyBtn = e.target.closest('[data-cc="c-deny"]');
    if (denyBtn) {
      banner.style.display = "none";
      setCookie("cookieconsent_status", "deny", 30);
      updateScrollLock(false);
    }
  });

  function grantConsentAndLoadAnalytics() {
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    });

    if (window.gtagLoaded) return;
    window.gtagLoaded = true;

    const gtagScript = document.createElement("script");
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-8G9HLZB826";
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    gtag('js', new Date());
    gtag('config', 'G-8G9HLZB826');
  }
});
