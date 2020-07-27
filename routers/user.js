const express = require('express');
const db = require('../db');
const { md5 } = require('utility');
const router = express.Router();
router.get('/userinfo', async (req, res) => {
    console.log(req.user)//打印结果：{ id: 2, iat: 1595813657, exp: 1595986457 }  token字符串中保存的信息
    let r = await db('select * from user where id=?', req.user.id)
    console.log(r)//打印结果：[RowDataPacket {id: 2,username: 'xigua',password: '25f9e794323b453885f5181f1b624d0b',nickname: null,email: null,user_pic: null}]
    if (r && r.length > 0) {
        res.send({ status: 0, message: '获取用户信息成功', data: r[0] })
    } else {
        res.send({ status: 1, message: '获取用户信息失败' })
    }
})
router.post('/userinfo', async (req, res) => {
    console.log(req.body)
    let r = await db('update user set ? where id=?', [req.body, req.body.id])
    if (r && r.affectedRows > 0) {
        res.send({ status: 0, message: '注册成功', })
    } else {
        res.send({ status: 1, message: '注册失败', })
    }
})
router.post('/updatepwd', async (req, res) => {
    console.log(req.body)
    let oldPwd = md5(req.body.oldPwd)
    let newPwd = md5(req.body.newPwd)
    let r = await db('select * from user where password=? and id=?', [oldPwd, req.user.id])
    if (r && r.length > 0) {
        let r2 = await db('update user set password=? where id=?', [newPwd, req.user.id])
        if (r2 && r2.affectedRows > 0) {
            res.send({ status: 0, message: '重置密码成功' })
        } else {
            res.send({ status: 1, message: '重置密码失败' })
        }
    } else {
        res.send({ status: 1, message: '原密码错误' })
    }
})
router.post('/update/avatar', async (req, res) => {
        let r = await db('update user set user_pic=? where id=?', [req.body.avatar, req.user.id])
        if (r && r.affectedRows > 0) {
            res.send({ status: 0, message: '更换头像成功' })
        } else {
            res.send({ status: 1, message: '更换头像失败' })
        }
})
module.exports = router