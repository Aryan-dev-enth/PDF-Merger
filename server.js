const express=require('express');
const app=express();
const path=require('path');
const port=3000;
const multer  = require('multer')
const upload = multer({ dest: 'uploads' })
const PDFMerger = require('pdf-merger-js');
const { mergePdfs } = require('./mergePDFS');
const {deleteFilesInFolder}=require('./deleteFolder');

app.use('/static', express.static('public'))

var merger = new PDFMerger();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"templates/index.html"));
    deleteFilesInFolder('uploads');
    deleteFilesInFolder('public')
})

app.post('/merge', upload.array('pdfs'), async (req, res, next)=>{
    
   if(req.files.length===2){
    console.log(req.files);
    let d= await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    await res.redirect(`http://localhost:3000/static/${d}.pdf`)
   }
   else
   {
    res.redirect(`http://localhost:3000`)
    
   }
})

app.listen(port,()=>{
    console.log(`Example app running on http://localhost:${port}`)
})