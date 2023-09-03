const PDFMerger = require('pdf-merger-js');


const mergePdfs=async (p1,p2) => {
    var merger = new PDFMerger();
    await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
    await merger.add(p2); // merge only page 2
    
    let d=new Date().getTime();
    await merger.save(`public/${d}.pdf`);
    const mergedPdfBuffer = await merger.saveAsBuffer();
    return d;
}

module.exports = {mergePdfs};



