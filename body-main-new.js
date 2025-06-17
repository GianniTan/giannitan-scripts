document.addEventListener("DOMContentLoaded", () => {
  console.log("GianniTan script loaded!");

<script> // Don't delete, for FAQ sectionAdd commentMore actions
document.addEventListener('DOMContentLoaded', function () {
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
  const defaultFaq = document.querySelector('[js-faq-default="true"]');
  if (defaultFaq) {
    defaultFaq.click();
  }
});
</script>

<style> // Don't delete, for text scroll + Splits text section 1.1
  .scroll-highlight .word {
    display: inline-block !important;
    white-space: nowrap !important;
  }
  .scroll-highlight .char {
    display: inline-block !important;
  }
</style>

<script> // Don't delete, for text scroll + Splits text section 1.2
  (function(){
    if (!window.gsap || !window.SplitText || !window.ScrollTrigger) {
      console.error('GSAP/plugins niet gevonden.');
      return;
    }
    gsap.registerPlugin(SplitText, ScrollTrigger);

    function animate(el) {
      if (el._split) el._split.revert();
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
            scrub: true,
            // once: true  ← deleted! (for one time activation)
          }
        }
      );
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-highlight').forEach(el => {
      io.observe(el);
    });
  })();
</script>


<script src="https://cdn.jsdelivr.net/npm/cookieconsent@3/build/cookieconsent.min.js"></script> 

<script> // Don't delete cookieconsent
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

window.addEventListener("load", function () {
  // Geen banner en geen scroll lock op cookie-statement pagina
  if (window.location.pathname === "/cookie-statement") return;

  const banner = document.querySelector(".cookie-banner");

  // Consent Mode v2 - standaard op denied
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied'
  });

  // Scroll blokkeren op basis van bannerstatus
  function updateScrollLock(showing) {
    document.body.classList.toggle('no-scroll', showing);
  }

  // CookieConsent init
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
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-8G9HLZB826"; // <-- GA-ID
    gtagScript.async = true;
    document.head.appendChild(gtagScript);

    gtag('js', new Date());
    gtag('config', 'G-8G9HLZB826'); // <-- Second GA-ID
  }
});
</script>

<style>
/* No scroll when visible */
.no-scroll {
  overflow: hidden;
}
</style>
