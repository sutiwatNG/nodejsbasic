const express = require('express') //นำ exprerss เข้ามาทำงาน
const path = require('path') //นำ path เข้ามาทำงาน
const cookieParser = require('cookie-parser') //นำ cookie-parser เข้ามาทำงาน
const session = require('express-session') //นำ express-session เข้ามาทำงาน
const router = require('./routes/myrouter') //นำไฟล์ myrouter เข้ามาทำงาน
const { constants } = require('buffer')
const app = express() //เรียกใช้งาน express และเก็บลงในตัวแปร app

app.set('views',path.join(__dirname,'views')) //set การ join ไฟล์กับโฟลเดอร์ view 
app.set('view engine','ejs') //set ให้ใช้งานกับไไฟล์ .ejs เพราะเราไม่ได้ใช้ html 
app.use(express.urlencoded({extended:false})) //แปลง url encode เป็น opject
app.use(cookieParser()) //เรียกใช้งาน cookie parser 
app.use(session({secret:"mysession",resave:false,saveUninitialized:false})) //เรียกใช้งาน session 
app.use(router) //เรียกใช้งาน router (myrouter)
app.use(express.static(path.join(__dirname,'public')))  // เรียกใช้งาน static file เช่น ไฟล์รูปภาพ

app.listen(8080,()=>{
    console.log("run server port 8080")
})

