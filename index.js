//1.2
const aList = [
    {
        name: 'John'
    }
]
const copyDeep = arrayOrObject => {
    try {
        return JSON.parse(JSON.stringify(arrayOrObject))
    } catch (error) {
        return arrayOrObject
    }
}
let warnCopyList = [
    ...aList
]
let bList = copyDeep(aList)
warnCopyList[0].name = 'John D'
bList[0].name = 'Pakorn'
console.log(aList)
console.log(warnCopyList)
console.log(bList)

//1.3
// First Class Function คือ Function ที่ไม่มีข้อจำกัด จะแก้ไข หรือจะ ref ไปอีกตัวแปรก็ได้

const logFunc = function(str) {
    console.log(str)
}

const loopFunc = (a) => {
    //just break
    if (a <= 0) return
    logFunc(a)
    loopFunc(--a)
}

const countDown = loopFunc
countDown(5)

//2
const app = require('./src/app');
const debug = require('debug')('example:server');

const port = process.env.PORT || 3000;

app.listen(port, () =>
    debug(`Express server listening on port ${port}`)
);
