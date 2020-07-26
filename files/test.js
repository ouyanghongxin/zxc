const fs = require('fs');
let p = new Promise((resolve,reject) => {
    fs.readFile('./a.txt','utf-8',(err,data) => {
        err ? reject(err):resolve(data.length)
    })
})
p.then(
    (r) => {
        console.log(r);
        return 'hello'
    }
).then(
    (r) => {
        console.log(r);
    }
).then(
    (r) => {
        console.log(r);
    }
).catch(
    (err) => {
        console.log(err);
    }
)