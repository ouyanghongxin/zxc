const express = require('express');
const db = require('../db');
const {md5}  = require('utility');
const jwt = require('jsonwebtoken');
const router = express.Router();
router.post('/login',async(req,res) => {
    let arr = [req.body.username,md5(req.body.password)]
    let r = await db('select * from user where username=? and password=?',arr)
    console.log(r)
    if(r && r.length > 0){
        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer ' + jwt.sign(
                {id:r[0].id},
                'sy109',
                {expiresIn:'2 days'}
                )
            })
    }else {
        res.send({status:1,message:'登录失败',})
    }
})
router.post('/reguser',async(req,res) => {
    let r2 = await db('select * from user where username=?',req.body.username)
    if(r2 && r2.length > 0){
        res.send({status:1,message:'用户名已存在'})
        return;       
    }
    req.body.password = md5(req.body.password)
    console.log(md5)
    let r = await db('insert into user set ?',req.body)
    if(r && r.affectedRows > 0){
        res.send({status:0,message:'注册成功',})
    }else {
        res.send({status:1,message:'注册失败',})
    }      
})
module.exports = router                                                       