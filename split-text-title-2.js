<script>
  window.addEventListener("DOMContentLoaded", () => {
    new SplitType("[text-split]", {
      types: "words, chars",
      tagName: "span"
    });

    document.querySelectorAll("[letters-slide-up]").forEach((el) => {
      const tl = gsap.timeline({ paused: true });

      tl.from(el.querySelectorAll(".char"), {
        yPercent: 100,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        stagger: { amount: 0.6 }
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.pause(0)
      });
    });

    gsap.set("[text-split]", { opacity: 1 });
  });
</script>
