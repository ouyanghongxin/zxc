const fs = require('fs');
function myRead(filename){
    return new Promise((resolve,reject) => {
        fs.readFile(filename,'utf-8',(err,data) => {
            err ? reject(err):resolve(data.length)//异步代码
        })
    }).catch(
        (r) => {
            console.log(r);
        }
    )
}
async function zxc () {
 let r1 = await myRead('./a.txt')
 let r2 = await myRead('./d.txt')  
 let r3 = await myRead('./c.txt')
 console.log(r1)
 console.log(r2)
 console.log(r3)
}
zxc();