document.addEventListener("DOMContentLoaded", () => {
  console.log("GianniTan script loaded!");

  // FAQ open/close
  document.querySelectorAll('[js-faq-collapse="true"]').forEach((element) => {
    element.addEventListener('click', () => {
      if (!element.classList.contains('open')) {
        document.querySelectorAll('[js-faq-collapse="true"].open').forEach((item) => {
          item.click();
        });
        element.classList.add('open');
      } else {
        element.classList.remove('open');
      }
    });
  });

  const defaultFaq = document.querySelector('[js-faq-default="true"]');
  if (defaultFaq) defaultFaq.click();

  // Scroll animatie met SplitText
  if (window.gsap && window.SplitText && window.ScrollTrigger) {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
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
                scrub: true
              }
            }
          );
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-highlight').forEach((el) => {
      io.observe(el);
    });
  } else {
    console.error('GSAP of plugins niet geladen.');
  }
});
