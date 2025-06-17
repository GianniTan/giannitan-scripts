gsap.registerPlugin(ScrollTrigger);

let text;

function initSplitAndAnimation() {
  if (text) text.revert();

  const currentElement = $(".split-lines");
  text = new SplitType(currentElement, { types: 'lines, words' });
  $(".line").append("<div class='line-mask'></div>");

  runAnimation();

  // refresh ScrollTrigger om alles direct goed te zetten
  ScrollTrigger.refresh();
}

function runAnimation() {
  $(".line").each(function () {
    const triggerElement = $(this);
    const targetElement = triggerElement.find('.line-mask');

    gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top center",
        end: "bottom center",
        scrub: 1
      }
    })
    .to(targetElement, { width: "0%", duration: 1 });
  });
}

// init na volledige page-load
window.addEventListener('load', initSplitAndAnimation);

// opnieuw init bij venster-resize
window.addEventListener('resize', initSplitAndAnimation);
