const http = require('http') //กำหนดตัวแปร http
const fs = require("fs")

const indexpage = fs.readFileSync(`${__dirname}/webpage/index.html`)

const server = http.createServer(function(req,res){ //กำหนดตัวแปร server 
    
    const pathname = req.url
    console.log("url =",pathname)
    if (pathname==="/" || pathname==="/home") {
        res.end(indexpage) //จบการทำงาน
    }else if(pathname==="/gg"){
        res.end("<h1>Hello GG</h1>")
    }else{
        res.writeHead(404)
        res.end("<h1>NOT Found</h1>")
    }
                     
})

server.listen(8080,'localhost',()=>{
    console.log("start server in port 8080")
})  //ระบุport