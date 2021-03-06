// 求 Bob Allen 总分、英语分、语文分
let arrayData = [
    {
        name: "Bob",
        score: 10,
        type: "Chinese",
    },
    {
        name: "Allen",
        score: 35,
        type: "English",
    },
    {
        name: "Bob",
        score: 40,
        type: "English",
    },
    {
        name: "Allen",
        score: 15,
        type: "Chinese",
    },
    {
        name: "Bob",
        score: 40,
        type: "Chinese",
    },
    {
        name: "Allen",
        score: 15,
        type: "Chinese",
    },
];

function resetData(arr, field, total) {
    let hash = new Map();
    arr.map((item, index) => {
        let getSame = hash.get(item.name);
        if (getSame) {
            let fieldStr = `${item[`${field}`]}`,
                getField = getSame[`${fieldStr}`] || 0;
            getSame[`${fieldStr}`] = getField + item.score;
            getSame[`${total}`] += item.score;
            return false;
        }
        let obj = {
            name: item.name,
            [`${total}`]: item.score,
            [`${item[`${field}`]}`]: item.score,
        };
        hash.set(item.name, obj);
    });
    console.log([...hash.values()], "hash");
}

resetData(arrayData, "type", "score");
/*  {
    name: '小明',
    allscore: 100,
    Chinesescore: 40,
    Englishscore: 60
},
{
    name: '小菲',
    allscore: 100,
    Chinesescore: 40,
    Englishscore: 60
}  */
