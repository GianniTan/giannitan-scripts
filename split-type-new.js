gsap.registerPlugin(ScrollTrigger);

const splitTypes = document.querySelectorAll('.scroll-highlight');
splitTypes.forEach((char,i) => {
  const text = new SplitType(char, {types: ['chars','words']});
  gsap.from(text.chars, {
    scrollTrigger: {
      trigger: char,
      start: 'top 80%',
      end: 'top 50%',
      scrub: true,
    },
    opacity: 0.2,
    stagger: 0.1,
  })
});
