const tokenize = require('chinese-tokenizer').loadFile('./cedict_ts.u8')

console.log(JSON.stringify(tokenize('滚滚长江东逝水，浪花淘尽英雄。是非成败转头空。青山依旧在，几度夕阳红。白发渔樵江渚上，惯看秋月春风。一壶浊酒喜相逢。古今多少事，都付笑谈中。'), null, '  '));
console.log('test traditional chinese');
