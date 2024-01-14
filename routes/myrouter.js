//จัดการ routing
const express = require('express') //นำ exprerss เข้ามาทำงาน
const router = express.Router()

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
router.get('/404',(req,res)=>{
    res.render("404")
})
router.get('/product',(req,res)=>{
    res.render("product")
})


module.exports = router