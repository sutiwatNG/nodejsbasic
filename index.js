const http = require('http') //กำหนดตัวแปร http
const fs = require("fs")
const url = require('url')

const indexpage = fs.readFileSync(`${__dirname}/webpage/index.html`)
const productpage = fs.readFileSync(`${__dirname}/webpage/product1.html`)
const server = http.createServer((req,res)=>{ //กำหนดตัวแปร server 
    
    const {pathname,query} = url.parse(req.url,true)
    if (pathname==="/") {
        res.end(indexpage) //จบการทำงาน
    }else if(pathname==="/product"){
        if (query.id === "1") {
            res.end(productpage)
        }
    }else{
        res.writeHead(404)
        res.end("<h1>NOT Found</h1>")
    }
                     
})

server.listen(8080,'localhost',()=>{
    console.log("start server in port 8080")
})  //ระบุport