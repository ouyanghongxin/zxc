const fs = require('fs');
function myRead(filename){
    return new Promise((resolve,reject) => {
        fs.readFile(filename,'utf-8',(err,data) => {
            err ? reject(err):resolve(data.length)
        })
    })
}
myRead('./a.txt').then(
    (r) => {
        console.log(r);
        return myRead('./b.txt') 
    }
).then(
    (r) => {
        console.log(r);
        return myRead('./c.txt')
    }
).then(
    (r) => {
        console.log(r);
    }
).catch(
    (r) => {
        console.log(r);
    }
)