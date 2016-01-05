#Wikipedia Convergence

still work in progress..

A friend of mine told me about this interesting observation about Wikipedia pages. If we start from any wikipedia page and follow the first link that appears in the contents of that page we will eventually reach the "Philosophy" page of wikipedia. If a link has been already visited in the process we ignore that link and go to the immediate next link in the contents of the page.

For eg. If we start from the Literature page of Wikipedia, we get the following series of pages...<br>
1. Literature: https://en.wikipedia.org/wiki/Literature<br>
2. Culture: https://en.wikipedia.org/wiki/Culture#Etymology<br>
3. Edward Burnett Tylor: https://en.wikipedia.org/wiki/Edward_Burnett_Tylor<br>
4. Anthropologist: https://en.wikipedia.org/wiki/Anthropologist<br>
5. Knowledge: https://en.wikipedia.org/wiki/Knowledge<br>
6. Awareness: https://en.wikipedia.org/wiki/Awareness<br>
7. Consciousness: https://en.wikipedia.org/wiki/Consciousness<br>
8. Quality: https://en.wikipedia.org/wiki/Quality_(philosophy)<br>
9. <b>Philosophy</b>: https://en.wikipedia.org/wiki/Philosophy<br>

We will always eventually reach the Philosophy page.

Given a particular wikipedia page, this small application automatically navigates through all the wikipedia pages according to the method given above till it reaches the Philosophy page. 

I know this application is quite useless but I wanted to practice coding in node.js and this seemed like a perfect mini-project i could work on!

<b>Server</b>: [node.js](https://github.com/nodejs/node)<br>
<b>HTML Parsing</b>: [cheerio](https://github.com/cheeriojs/cheerio)
