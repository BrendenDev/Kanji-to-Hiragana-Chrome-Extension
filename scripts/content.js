const kanjiRegex = /[\u4e00-\u9faf]/g;

const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

// loop through all text nodes in the DOM tree and check if they contain kanji characters
const elementsWithKanji = [];
while (walker.nextNode()) {
  const nodeText = walker.currentNode.nodeValue;
  if (nodeText && nodeText.match(kanjiRegex)) {
    elementsWithKanji.push(walker.currentNode.parentElement);
  }
}

console.log(elementsWithKanji);