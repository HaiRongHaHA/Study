/* 
    // 数组根据length相同的分类
    let strLen = ['apple','banana','aasss','op','me','p']
    var obj = {}
    strLen.forEach(function (elem) {
        var array = obj[elem.length]||[];
        array.push(elem)
        obj[elem.length] = array
    })
    console.log('b',obj)

    //按照age大小从大到小排序，如果age相同，则按id大小从小到大排序
    var jsonArr = [
        {id:48,name:'jony',age:18},
        {id:22,name:'jony',age:13},
        {id:45,name:'jony',age:15},
        {id:77,name:'jony',age:14},
        {id:56,name:'jony',age:13},
        {id:89,name:'jony',age:18},
        {id:34,name:'jony',age:14},
    ]
    jsonArr.sort( function(curr,next) {
        return !!(next.age - curr.age) ? next.age- curr.age : curr.id-next.id;
    });
    console.log(jsonArr)

    let var  const各会输出什么
    for(var i =0; i<3;i++){
        setTimeout(()=>{
            console.log('i',i)
        },1000)
    }
    // let 输出0,1,2 let只在块级作用域下生效
    // var 输出3个3 由于变量 i 直接暴露在全局作用域内，当调用 console.log 函数开始输出时，这是循环已经结束，所以会输出10个10。
    // const会报错，因为它是个常量，常量是不可改变的
    // 用es5的方法使它按顺序输出（闭包）
    for(var i =0; i<3;i++)
    {
        (function(e){
            setTimeout(()=>{
            console.log('i',e)
        },1000)
        }(i))
    }

    //判断两个对象相等
    function eq(a,b){
        // typeof null 的结果为 object ，这里做判断，是为了让有 null 的情况尽早退出函数
        if (a == null || b == null) return false;
        if (a === b) return a !== 0 || 1 / a === 1 / b; //+0 and -0
        if (a !== a) return b !== b;    //NaN and NaN
        // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
        var type = typeof a;
        if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
        // 更复杂的对象使用 deepEq 函数进行深度比较
        return deepEq(a, b);
    }
    console.log(eq(0,-0))   //false
    console.log(NaN === NaN)    //false
    console.log(eq(NaN,NaN))   //true
    console.log(eq())   //true
*/

/* 
    // 排序合并为字符串，数的最大值
    let arr = [19, 4, 60, 193]; // 60419319
    let arr2 = [7, 75, 787, 789]; // 78757
    function getRemainder(num) {
        while (num > 10) {
            num = num / 10;
        }
        return num;
    }

    function getMaxNum(arr) {
        let obj = {};
        arr.map((item) => {
            obj[item] = getRemainder(item);
        });
        const keys = Object.keys(obj);
        keys.sort(function (a, b) {
            return obj[b] - obj[a];
        });
        return keys.join("");
    }
    console.log(getMaxNum(arr));
    console.log(getMaxNum(arr2));
*/
