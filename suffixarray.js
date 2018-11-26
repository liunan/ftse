/**
 * 后辍数组，每个字后面跟的字
 * 
 * 读入2
 */

const idx = require('./outidx/2-gram.idx');

const dict = idx.dict;

const characterTable = {};


const keywords = Object.keys(dict);

/**
 * 统计全文共使用的字符数 以及每个字符在分词中的引用数
 * 三国演义 示例文件中共使用了3670个汉字
 */
if(false)
{
keywords.forEach(element => {
    for(let c of element)
    {
        if(!characterTable[c])
            characterTable[c] = 0;
        ++characterTable[c];
    }
});

console.log(JSON.stringify(characterTable));
console.log(Object.keys(characterTable).length);
}

/**
 * 计算每个字的后辍字符
 */
if(true)
{
    keywords.forEach(element => {
        let c0 = element[0];
        let c1 = element[1];
        //console.log(element);
        if(!characterTable[c0])
            characterTable[c0]={};
        
        characterTable[c0][c1] = dict[element].length/2;// RefCount
    });
    
    // 将 characterTable 按照文字后面跟随的数量按降序排列

    let characters = Object.keys(characterTable);
    let sortedCharacters = characters.sort( (left,right)=>{
        return Object.keys(characterTable[right]).length - Object.keys(characterTable[left]).length;
    });

    /*
    for(let i = 0;i<10;++i)
    {
        console.log(sortedCharacters[i]);//字符
        console.log( JSON.stringify(characterTable[sortedCharacters[i]]) )//字符对应的后辍内容
    }
    */
    //console.log(JSON.stringify(characterTable));
    console.log('character count '+Object.keys(characterTable).length);

    console.log(process.argv);
    if(process.argv.length>2 )
    {
        // 输出指定字符的索引
        console.log(process.argv[2]);

        let suffixs = Object.keys(characterTable[process.argv[2]]);

        // 按照出现频率，降序排列，得到单个字的后续排列
        let sortedSuffix = suffixs.sort((left,right)=>{
            return characterTable[process.argv[2]][right] - characterTable[process.argv[2]][left];
        })
        console.log(JSON.stringify(characterTable[process.argv[2]]) );
        console.log(JSON.stringify(sortedSuffix) );
    }
}