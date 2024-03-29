//จัดการ routing
const express = require('express') //นำ exprerss เข้ามาทำงาน
const router = express.Router() //นำ router เข้ามาทำงาน โดยใช้ express

// เรียกใช้งานโมเดล
const Product = require('../models/products')

//อัพโหลดไฟล์
const multer = require('multer') //นำ multer เข้ามาทำงาน

const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,'./public/images/products') //ตำแหน่งจัดเก็บไฟล์
    },
    filename:function(req,file,cb) {
        cb(null,Date.now()+".jpg")//เปลี่ยนชื่อไฟล์ ป้องกันชื่อซ้ำกัน
    }
})

//เริ่มต้น upload
const upload = multer({
    storage:storage
})

//ออกจากระบบ
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/')
    })
   
})
router.get('/admin',(req,res)=>{
    res.render("admin")
})

//หน้า เพิ่มข้อมูลสินค้า
router.get('/addform',(req,res)=>{
        res.render("form")

})
//หน้า จัดการข้อมูลสินค้า
router.get('/manage',(req,res)=>{
       //แสดงผลข้อมูล
       Product.find().exec((err,doc)=>{
        res.render("manage",{product:doc})
    })
})
//หน้า index
router.get('/',(req,res)=>{
    //แสดงผลข้อมูล
    Product.find().exec((err,doc)=>{
        res.render("index",{product:doc})
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
//เพิ่มproduct
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



//ส่งค่าlogin
router.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 10000 //10 วินาที

    if(username === "admin" && password === "123"){
        //สร้าง session
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = timeExpire 
        res.redirect('manage')
    }else{
        res.render('404')
    }
})


module.exports = router
