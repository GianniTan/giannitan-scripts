// Splits text into words and characters
const text = new SplitType('#target', { types: 'lines, words, chars' })

window.addEvenListener("resize", function() {
  text.revert();
});
