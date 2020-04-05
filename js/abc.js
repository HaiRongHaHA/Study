let t = 3;
let arr = [0, t];
let i = 1,
    val = 0,
    s = 0;
while (arr.length !== 0) {
    val = arr.shift();
    if (val == t) {
        arr.push(t);
        i++;
        continue;
    }
    if (val + i == t || val - i == t) {
        s = i;
        break;
    } else {
        arr.push(val + i);
        arr.push(val - i);
    }
}
console.log(s);
