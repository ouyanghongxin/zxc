const express = require('express');
const db = require('../db');
const router = express.Router();
router.get('/list',async(req,res) => {
    console.log(req.query)
    let {pagenum,pagesize,state,cate_id} = req.query
    w=``;
    if (state) {
        w += ` and state="${state}" `
    }
    if (cate_id) {
        w += ` and cate_id=${cate_id} `
    }
    let sql = `select a.Id,title,state,pub_date,name cate_name from article a
    join category c on a.cate_id=c.Id where is_delete=0 and author_id=? ${w}
    limit ${(pagenum -1) * pagesize},${pagesize}`//a.Id就是article表的Id属性，必须详细说明是哪个表的Id属性，防止冲突。
    //limit后面的是页数pagenum为1，每页展示的数据pagesize为3条，就是0,3，展示数据第一条到第三条。
    //pagenum为2，即第二页，pagesize为3，就是3,3，展示数据第四条到第六条。
    //pagenum为3，即第三页，pagesize为3，就是6,3，展示数据第七条到第九条。所以，推到出(pagenum - 1) * pagesize,pagesize
    let r = await db(sql,req.user.id)
    let sql2 = `select count(*) total from article a
    join category c on a.cate_id=c.Id where is_delete=0 and author_id=? ${w}`
    let r2 = await db(sql2,req.user.id)
    if (r) {
        res.send({ status: 0, message: '获取文章列表成功', data: r,total:r2[0].total});
    } else {
        res.send({ status: 1, message: '获取文章列表失败' });
    }   
})
module.exports = router
