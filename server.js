/* eslint-disable */
var express = require('express');
var path = require('path');

var port = process.env.PORT || 3000;
var app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started port: ${port}`);
  }
});
