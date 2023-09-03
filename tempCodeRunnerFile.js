const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const multer = require('multer')
const upload = multer({ dest: 'uploads' })
const PDFMerger = require('pdf-merger-js');
const { mergePdfs } = require('./mergePDFS');

app.use('/static', express.static('public'))

var merger = new PDFMerger();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"));
})

app.post('/merge', upload.array('pdfs', 10), async (req, res, next) => {
    console.log(req.files);
    let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    await res.redirect(`http://localhost:3000/static/${d}.pdf`)
}
    
})

app.listen(port, () => {
    console.log(`Example app running on http://localhost:${port}`)
})