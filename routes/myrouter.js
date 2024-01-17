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
//ออกจากระบบ
router.get('/logout',(req,res)=>{
    res.clearCookie('username')
    res.clearCookie('password')
    res.clearCookie('login')
    res.redirect('/')
})
//หน้า index
router.get('/',(req,res)=>{
    //แสดงผลข้อมูล
    Product.find().exec((err,doc)=>{
        res.render("index",{product:doc})
    })
})
router.get('/admin',(req,res)=>{
    res.render("admin")
})

//หน้า เพิ่มข้อมูลสินค้า
router.get('/addform',(req,res)=>{
    if (req.cookies.login) {
        res.render("form")
    }else{
        res.render("admin")
    }
})
//หน้า จัดการข้อมูลสินค้า
router.get('/manage',(req,res)=>{
       //แสดงผลข้อมูล
       Product.find().exec((err,doc)=>{
        res.render("manage",{product:doc})
    })
})
//หน้า สินค้า
router.get('/:id',(req,res)=>{
        const product_id = req.params.id
        Product.findOne({_id:product_id}).exec((err,doc)=>{
            if(err)console.log(err)
            res.render("product",{product:doc})
        })
       
})
// ลบข้อมูล
router.get('/delete/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id,
        {useFindAndModify:false}).exec(err=>{
            if(err)console.log(err)
            res.redirect('/manage')
        })
})

// แก้ไขข้อมูล
router.post('/edit',(req,res)=>{
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        //นำข้อมูลเดิมมาทำการแก้ไข
        res.render("edit",{product:doc})
    })

})
// อัพเดทข้อมูล
router.post('/update',(req,res)=>{
    const update_id = req.body.update_id
    let data = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    }
    Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec(err=>{
        if(err)console.log(err)
        res.redirect('/manage')
    })

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



router.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 10000 //10 วินาที

    if(username === "admin" && password === "123"){
        //สร้าง cookie
        res.cookie('username',username,{maxAge:timeExpire})
        res.cookie('password',password,{maxAge:timeExpire})
        res.cookie('login',true,{maxAge:timeExpire}) // ถ้าเป็นจริง จะ login เข้าสู่ระบบได้
        res.redirect('manage')
    }else{
        res.render('404')
    }
})


module.exports = router