const PDFDocument = require('pdfkit');
const fs = require('fs');
const QRCode = require('qrcode')


// create a new PDF document
const doc = new PDFDocument({
    size: 'A5',
    layout: 'portrait',
    margin: 0
});


// pipe the document to a file
doc.pipe(fs.createWriteStream('output.pdf'));

// add the logo
doc.image('assets/al_burhan_logo.png', 347.295, 1.823, {width: 70.6, height: 70.6})


// add horizontal line beneath the logo
doc.moveTo(0, 75)
  .lineTo(419.6, 75)
  .lineWidth(0.5)
  .stroke();

// adding all rectangles
doc.rect(14.717, 89.625, 390.750, 15.750)
  .stroke();

doc.rect(14.717, 119.717, 143.067, 60.567)
  .stroke();

doc.rect(14.717, 194.563, 143.373, 72.123)
  .stroke();

doc.rect(14.717, 285.317, 142.265, 67.152)
  .stroke();

doc.rect(14.717, 464.675, 105.650, 90.650)
  .stroke();

doc.rect(14.717, 569.629, 390.743, 15.743)
  .stroke();

doc.rect(172.153, 119.717, 233.384, 90.694)
  .stroke();

// creating table
doc.rect(172.153, 232.058, 233.384, 323.384)
  .stroke();

doc.moveTo(172.153, 258.101)
  .lineTo(405, 258.101)
  .lineWidth(0.5)
  .stroke();

doc.moveTo(172.153, 528.369)
  .lineTo(405, 528.369)
  .lineWidth(0.5)
  .stroke();

doc.moveTo(232.065, 232.500)
  .lineTo(232.065, 555.05)
  .lineWidth(0.5)
  .stroke();

doc.moveTo(367.083, 232.500)
  .lineTo(367.083, 528.72)
  .lineWidth(0.5)
  .stroke();

// add content to the PDF

doc.registerFont('urdu font', 'assets/Nastaleeq.ttf');

doc.font('urdu font')
.fontSize(30)
.text("انسٹیٹیوٹ البرہان", 172.075, 18.056)

doc.font('Times-Roman')
.fontSize(12)
.text('Receipt generated on: 12/01/2023 15:30 by Zarar Ahmed', 73.203, 92.924)

doc.font('Times-Roman')
.fontSize(12)
.text('This is a computer generated receipt, therefore no signature is required', 26.561, 572.475)


// generate and add the qr code
const qrCodeData = "https://alburhan.org";
const imagePath = 'assets/qrcode.png'

QRCode.toFile(imagePath, qrCodeData, {
    color: {
      dark: '#000000',  // Black dots
      light: '#0000' // Transparent background
    }
  }, function (err) {
    if (err) throw err
  })
doc.image(imagePath, 15.000, 464.063, {width: 105.000, height: 91.875})


// finalize the PDF and end the stream

doc.end();
