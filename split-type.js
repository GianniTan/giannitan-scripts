// Splits text into words and characters
const text = new SplitType('#target', { types: 'lines, words, chars' })

$('body').on('click', function() {
  text.revert();
});
