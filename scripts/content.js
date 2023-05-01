const kanjiRegex = /[\u4e00-\u9faf]/g;

//get all elements with kanji
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

console.log("ho");

const elementsWithKanji = [];
while (walker.nextNode()) {
const nodeText = walker.currentNode.nodeValue;
if (nodeText && nodeText.match(kanjiRegex)) {
    elementsWithKanji.push(walker.currentNode.parentElement);
    }
}

var script = document.createElement('script');
script.src = chrome.runtime.getURL('./node_modules/requirejs/require.js');
script.onload = function() {
    // RequireJS is loaded, configure it and load your modules
    require.config({
        baseUrl: chrome.extension.getURL('./modules'),
        paths: {
          'kuroshiro': 'kuroshiro.min.js',
          'kuroshiro-analyzer-kuromoji': 'kuroshiro-analyzer-kuromoji.min.js'
        }
      });
    require(['kuroshiro', 'kuroshiro-analyzer-kuromoji'], function(kuroshiro, analyzer) {
        kuroshiro.init(analyzer);
        
        const text = 'こんにちは、世界！';
        kuroshiro.convert(text, { to: 'hiragana' })
          .then(result => console.log(result));
    });
};
document.head.appendChild(script);



/*async function loadModule() {
    const Kuroshiro = await import('kuroshiro');
    const KuromojiAnalyzer = await import('kuroshiro-analyzer-kuromoji');
    // Instantiate:
    const kuroshiro = new Kuroshiro();
    // Initialize
    // Here uses async/await, you could also use Promise
    await kuroshiro.init(new KuromojiAnalyzer());
    // Convert what you want:
    const result = await kuroshiro.convert("感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！", { to: "hiragana" });
}
  
loadModule(); */



/* I don't think  i need this

//check if kanji is by itself, if not, get parent element
for (let i = 0; i < elementsWithKanji.length; i++) {
    if(elementsWithKanji[i].innerHTML.length > 2) {
        console.log(elementsWithKanji[i].parentElement);
    }
    else {
        console.log(elementsWithKanji[i]);
    }
//make code for if duplicate of parent element, delete from array

} */


//make it so if it contains rt element then it doesn't do it
