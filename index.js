const express = require('express') //นำ exprerss เข้ามาทำงาน
const router = require('./routes/myrouter.js')
const app = express() //เรียกใช้งาน express และเก็บลงในตัวแปร app
app.use(router)

app.listen(8080,()=>{
    console.log("run server port 8080")
})

