//จัดการ routing
const express = require('express') //นำ exprerss เข้ามาทำงาน
const router = express.Router()
// เรียกใช้งานโมเดล
const Product = require('../models/products')

//อัพโหลดไฟล์
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,'./public/images/products') //ตำแหน่งจัดเก็บไฟล์
    },
    filename:function(req,file,cb) {
        cb(null,Date.now()+".jpg")//เปลี่ยนชื.อไฟล์ ป้องกันชื่อซ้ำกัน
    }
})

//เริ่มต้น upload
const upload = multer({
    storage:storage
})
router.get('/',(req,res)=>{
    const product = [
        {name:"NOTEBOOK",price:25500,image:"images/products/product1.png"},
        {name:"เสื้อ",price:800,image:"images/products/product2.png"},
        {name:"หูฟัง",price:1100,image:"images/products/product3.png"}
    ]
    res.render("index",{product:product})
})
router.get('/addform',(req,res)=>{
    res.render("form")
})
router.get('/manage',(req,res)=>{
    res.render("manage")
})
router.post('/insert',upload.single("image"),(req,res)=>{
    let data = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        description: req.body.description
    })
    Product.saveProduct(data,(err)=>{
        if(err)console.log(err)
        res.redirect('/')
    })
})


module.exports = router