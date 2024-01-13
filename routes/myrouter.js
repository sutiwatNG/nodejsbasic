//จัดการ routing
const express = require('express') //นำ exprerss เข้ามาทำงาน
const router = express.Router()
const path = require('path')

router.get("/",(req,res)=>{         //ระบุ path  เริ่มต้น
    res.status(200)
    res.type('text/html')
    res.sendFile(path.join(__dirname,'../webpage/index.html'))
})

router.get("/product/:id",(req,res)=>{
    const productid = req.params.id //กำหนดพารามิเตอร์ id
    if (productid ==='1') {
        res.sendFile(path.join(__dirname,'../webpage/product1.html'))
    }else if (productid ==='2') {
        res.sendFile(path.join(__dirname,'../webpage/product2.html'))
    }else if (productid ==='3') {
        res.sendFile(path.join(__dirname,'../webpage/product3.html'))
    }else{
        res.redirect('/')
    }
})

module.exports = router