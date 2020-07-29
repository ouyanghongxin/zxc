const express = require('express');
const db = require('../db');
const router = express.Router();
router.get('/cates',async(req,res) => {
    let r = await db('select * from category')
    console.log(r)
    if (r) {
        res.send({ status: 0, message: '获取分类列表成功', data: r });
    } else {
        res.send({ status: 1, message: '获取分类列表失败' });
    }    
})
//添加数据
router.post('/addcates',async(req,res) => {
    console.log(req.body)
    let r = await db('insert into category set?',req.body)
    console.log(r)
    if(r && r.affectedRows > 0){
        res.send({status:0,message:'获取成功',})
    }else {
        res.send({status:1,message:'获取失败',})
    }    
})
router.post('/updatecate',async(req,res) => {
    let sql = 'update category set ? where Id=?'
    let r = await db(sql,[req.body,req.body.Id])
    console.log(r)
    if(r && r.affectedRows > 0){
        res.send({status:0,message:'更新成功',})
    }else {
        res.send({status:1,message:'更新失败',})
    }    
})
router.get('/deletecate/:id',async(req,res) => {
    let id = req.params.id
    let sql = 'delete from category where Id=?';
    let r = await db(sql,id)
    console.log(r)
    if(r && r.affectedRows > 0){
        res.send({status:0,message:'删除成功',})
    }else {
        res.send({status:1,message:'删除失败',})
    }    
})
module.exports = router