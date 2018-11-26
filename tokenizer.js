console.log('tokenizer parse');

let inputLines = [];//输入内容,可以不保留

let dict = {};

let N_GRAM = 2;
let TOPN = 30;
let scannedString = '';
//let inputTxt = './sample/xyj.txt';
let inputTxt = 'd:/threekingdom.txt';


//const fs = require('fs');
//console.log( fs.readFileSync('./sample/c1.txt','utf-8'));

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(inputTxt, { encoding: 'utf-8' })
});



// 是否为分隔符
function isDelimeter(c) {
    switch (c) {
        case '，':
        case ' ':
        case ' ':
        case '。':
        case '“':
        case '”':
        case '《':
        case '》':
        case '；':
        case '：':
        case '、':
        case '‘':
        case '’':
        case '！':
        case '?':
        case '？':
        case '!':
        case ',':
        case '.':
            return true;
    }
    return false;
}

// 首先逐行读入需要检查的内容
lineReader.on('line', function (line) {
    if (line != '')
        //console.log('empty line scanned!');
    {
        inputLines.push(line);
        //console.log(`${inputLines.length}:${line}`);
        for (let c in line) {
            //console.log(c + ' ');
            // TODO: 判断是否为切分符，再决定是否清空当前内容

            if (isDelimeter(line[c])) {
                scannedString = '';
            } else {
                scannedString += line[c];

                if (scannedString.length == N_GRAM) {
                    if (!dict[scannedString])//如果当前key 没有存储，为其分配一个空的集合
                        dict[scannedString] = [];

                    dict[scannedString].push(inputLines.length, c +1 - N_GRAM);//增加当前的行、列号

                    scannedString = scannedString.substr(1);
                }
            }

        }

        //console.log('--------------------');
    }
});


// 处理结束，输出结果
lineReader.on('close', () => {

    //console.log(dict);
    let keywords = Object.keys(dict);
   
    // 按照出现次数降序排除 备选key
    let keySorted = keywords.sort( (left, right)=>{
        return dict[right].length - dict[left].length;
    })

    for (let idx = 0;idx<TOPN;++idx) {
        if(dict[keySorted[idx]].length==2)//已经不重复了，提前结束
            break;
        console.log(idx + `(${dict[keySorted[idx]].length/2}): `+keySorted[idx]);// +'@'+dict[keySorted[idx]].toString());   
    }

    //总数量
    console.log( N_GRAM+'-gram keyword count ' + keywords.length);

    // 将处理的索引结果输出，写入到输出的 js文件内容中，另起文件实验检索功能

    const fs = require('fs');
    fs.writeFileSync('./outidx/2-gram.idx','exports.dict = '+JSON.stringify(dict));
})
