const express = require('express');
const app = express();
app.listen(3006, () => console.log('启动了'));
const expressJWT = require('express-jwt');
app.use(expressJWT({
    secret:'sy109',
    algorithms:['HS256']}
).unless({path:/^\/api/}))
app.use( express.urlencoded({extended: false}) );
let loginRouter = require('./routers/login')
app.use('/api',loginRouter)
let categoryRouter = require('./routers/category')
app.use('/my/article',categoryRouter)
let user = require('./routers/user')
app.use('/my',user)
app.use((err,req,res,next) => {
    if(err.name = 'UnauthorizedEorror'){
        res.status(401).send({status:1,message:'身份认证失败'})
    }
})