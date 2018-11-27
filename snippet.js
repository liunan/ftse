/**
 * 取出文档行中与检索相关的片段
 */
const idx = require('./outidx/2-gram.idx');
const lines = require('./outidx/sanguo_lines.js').lines;
const dict = idx.dict;


 function getSnippet(keyword)
 {
    if(dict[keyword])
    {
        let end = dict[keyword][1]+10;
        let snippet = lines[dict[keyword][0]];//.slice(dict[keyword][1],end>lines[dict[keyword][0]].length?lines[dict[keyword][0]].length:end);

        return snippet;
    }
    return null;
 }

 console.log(getSnippet(process.argv[2]));