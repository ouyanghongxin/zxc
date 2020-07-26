module.exports = (sql,values=null) => {
    const mysql = require('mysql')
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'zxcvg'
    });
    return new Promise((resolve,reject) => {
        conn.connect();
        conn.query(sql,values,(err,result) => {
            err ? reject(err):resolve(result)
        });
        conn.end()
    }).catch(e => {
        console.log(e)
    })
}