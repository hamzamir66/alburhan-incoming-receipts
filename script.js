const PDFDocument = require('pdfkit');
const fs = require('fs');

// create a new PDF document
const doc = new PDFDocument({
    size: 'A5',
    layout: 'portrait'
});


// pipe the document to a file
doc.pipe(fs.createWriteStream('output.pdf'));

// add content to the PDF
doc.font('Helvetica-Bold').text('Hello World!', 100, 100);
doc.rect(50, 50, 300, 300).stroke();

// finalize the PDF and end the stream
doc.end();
