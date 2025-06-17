// split-type-new.js
;(function(){
  'use strict';
  gsap.registerPlugin(ScrollTrigger);

  let text;

  function initSplitAndAnimation() {
    // 1) kill alle oude ScrollTriggers
    ScrollTrigger.getAll().forEach(t => t.kill());
    // 2) revert oude SplitType
    if (text) text.revert();
    // 3) nieuwe split
    const el = document.querySelector('.split-lines');
    if (!el) return;
    text = new SplitType(el, { types: 'lines, words' });
    // 4) masks en animaties
    el.querySelectorAll('.line').forEach(line => {
      let mask = line.querySelector('.line-mask');
      if (!mask) {
        mask = document.createElement('div');
        mask.className = 'line-mask';
        line.appendChild(mask);
      }
      gsap.timeline({
        scrollTrigger: {
          trigger: line,
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      }).to(mask, { width: '0%', duration: 1 });
    });
    // 5) recalc alles
    ScrollTrigger.refresh();
  }

  // 1e run zodra DOM + fonts klaar zijn
  const domReady = new Promise(res => {
    document.readyState !== 'loading' ? res()
      : document.addEventListener('DOMContentLoaded', res);
  });
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  domReady.then(() => fontsReady.then(initSplitAndAnimation));

  // 2e run écht ná álle assets (images, CSS, extern)
  window.addEventListener('load', initSplitAndAnimation);

  // bij resize opnieuw (optioneel met debounce)
  let _deb;
  window.addEventListener('resize', () => {
    clearTimeout(_deb);
    _deb = setTimeout(initSplitAndAnimation, 200);
  });
})();
