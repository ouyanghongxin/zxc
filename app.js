const express = require('express');
const app = express();
app.listen(3006, () => console.log('启动了'));
app.use( express.urlencoded({extended: false}) );
let loginRouter = require('./routers/login')
app.use('/api',loginRouter)
let categoryRouter = require('./routers/category')
app.use('/my/article',categoryRouter)