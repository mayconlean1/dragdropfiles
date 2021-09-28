const express= require('express')
const app = express()
const path = require('path')
const multer = require ('./configMulter')

app.use(express.urlencoded({extended:true}))

app.use('/script.js',(req,res)=>{
    res.sendFile(path.join(__dirname,'/script.js'))
})

app.use('/style.css',(req,res)=>{
    res.sendFile(path.join(__dirname,'/style.css'))
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html') )
})

app.post('/',multer.array('image_file'), (req,res)=>{
    console.log(req.files)
    res.send('OK')
})


app.listen(8080, ()=>{console.log('server up in port'+' 8080')})