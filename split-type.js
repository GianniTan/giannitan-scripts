let text;

function runSplit() {
  let currentElement = $(".split-lines");
  text = new SplitType(currentElement, { types: 'lines' });
}

runSplit();

window.addEvenListener('resize', function() {
  text.revert();
  runSplit();
});
