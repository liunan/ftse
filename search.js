const idx = require('./outidx/2-gram.idx');

const dict = idx.dict;

const TOPN = 30;
let keywords = Object.keys(dict);


// 按照出现次数降序排除 备选key
let keySorted = keywords.sort((left, right) => {
    return dict[right].length - dict[left].length;
})

/*
for (let idx = 0; idx < TOPN; ++idx) {
    
    if (dict[keySorted[idx]].length == 2)//已经不重复了，提前结束
        break;
    console.log(idx + `(${dict[keySorted[idx]].length / 2}): ` + keySorted[idx]);// +'@'+dict[keySorted[idx]].toString());   
}*/


/**
 * 合并多个结果，将满足所有条件的行返回
 * 
 * TODO: 如果没有满足条件的所有行，则需要返回次优结果
 * @param {*} candiates 
 */
function filterCandiates(candiates) {
    //首先将备选集合，根据集合长度升序排列
    const RMASK = (1<<candiates.length)-1;
    /*使用字典方式，key为行数(文档id),value 为 备选索引位移后的或值，
    可以通过判定结果是否都满足，来确定该行是不是目标行。
    
    如两个关键字的结果 value=11 表示满足，10,01表示仅有第一个词元或第二个词元的情况
    mask = (1<<candiates.length)-1
    */
    let mergedLines = {};
    candiates.forEach( (element,eleIdx) => {
        //console.log(JSON.stringify(element));  
        const mask = 1<<eleIdx;
        for(let idx = 0;idx<element.length;idx+=2)
        {
            if(!mergedLines[element[idx]])
                mergedLines[element[idx]] = 0;

            mergedLines[element[idx]]|=mask;//登记词元在文档中的引用
        }      

    });

    //console.log(JSON.stringify(mergedLines));
    //javascript object property filter by value

    Object.keys(mergedLines).forEach(key => {
        if (mergedLines[key]!=RMASK) delete mergedLines[key];
      });
    //console.log('---filtered lines------------------------------');
    //console.log(JSON.stringify(mergedLines));

    return mergedLines;
}

function search(query) {
    
    let grams = query.split(' ');
    let candiates =[];
    for (let keyword of grams) {
        console.log(`q:${keyword}`);
        if (dict[keyword]) {
            //console.log(`${keyword} (${dict[keyword].length})`);
            candiates.push(dict[keyword]);
            //结果在行中的分布情况
            if (false) {
                let lineInfo = {};
                const keyIdxDat = dict[keyword];
                for (let idx = 0; idx < dict[keyword].length; idx += 2) {
                    const lineNo = keyIdxDat[idx];
                    if (!lineInfo[lineNo])
                        lineInfo[lineNo] = 0;
                    ++lineInfo[lineNo];
                }

                console.log('line info');
                console.log(lineInfo);
            }

        }
        else {
            console.log(`没有检索到 ${keyword} 相关结果`)
        }
    }

    const result = filterCandiates(candiates);

    console.log(`共搜索到 ${Object.keys(result).length} 结果`);
    console.log(`${Object.keys(result)}`);
}

//检索命令行第二个参数
search(process.argv[2]);
