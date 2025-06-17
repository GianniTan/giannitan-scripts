let text;

function runSplit() {
  text = new SplitType('#target', { types: 'line, words' });
}

runSplit();

window.addEvenListener('resize', function() {
  text.revert();
  runSplit();
});
