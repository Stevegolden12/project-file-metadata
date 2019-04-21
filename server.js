'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer')
const shortid = require('shortid')

//change the filename to something more user friendly
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + shortid.generate());
  }
});

var upload = multer({ storage: storage })


// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
  res.json({ greetings: "Hello, API" });
});

//File upload route
app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  //req.file.filename = shortid.generate;
  const kbSize = Math.floor(req.file.size / 1000);
  res.send("The file is saved as: " + req.file.filename + " and size is " + kbSize + " KB.")
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
