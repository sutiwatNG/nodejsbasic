const express = require('express') //นำ exprerss เข้ามาทำงาน
const path = require('path')
const cookieParser = require('cookie-parser')
const router = require('./routes/myrouter')
const { constants } = require('buffer')
const app = express() //เรียกใช้งาน express และเก็บลงในตัวแปร app

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(router)
app.use(express.static(path.join(__dirname,'public')))

app.listen(8080,()=>{
    console.log("run server port 8080")
})

