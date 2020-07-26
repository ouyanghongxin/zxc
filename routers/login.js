const express = require('express');
const router = express.Router();
router.post('/login',(req,res) => {
    res.send('真好看')       
})
module.exports = router