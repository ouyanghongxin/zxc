const express = require('express');
const router = express.Router();
router.post('/user',(req,res) => {
    res.send('真好看')       
})
module.exports = router