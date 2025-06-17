;(function(){
  'use strict';
  gsap.registerPlugin(ScrollTrigger);

  let splitInstances = [];

  function destroySplits() {
    splitInstances.forEach(instance => instance.revert());
    splitInstances = [];
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  function initSplits() {
    const elements = document.querySelectorAll('.split-lines');
    if (!elements.length) return;

    elements.forEach(el => {
      const split = new SplitType(el, {
        types: 'lines, words',
        whitespace: true
      });
      splitInstances.push(split);

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
            start: 'top 80%',
            end: 'bottom 50%',
            scrub: 1
          }
        }).to(mask, { width: '0%', duration: 1 });
      });
    });

    ScrollTrigger.refresh(true);
  }

  function initWhenReady() {
    Promise.all([
      new Promise(res => {
        if (document.readyState !== 'loading') res();
        else document.addEventListener('DOMContentLoaded', res);
      }),
      document.fonts ? document.fonts.ready : Promise.resolve()
    ]).then(() => {
      requestAnimationFrame(() => {
        destroySplits();
        initSplits();
      });
    });
  }

  // Run op veilige momenten
  initWhenReady();
  window.addEventListener('load', () => setTimeout(initWhenReady, 50)); // extra backup
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initWhenReady, 200);
  });
})();
