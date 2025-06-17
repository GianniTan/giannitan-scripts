let text;

function runSplit() {
  text = new SplitType('#target', { types: 'lines, words' });
}

runSplit();

window.addEvenListener('resize', function() {
  text.revert();
  runSplit();
});
