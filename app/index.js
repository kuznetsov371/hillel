const express = require('express');
const bodyParser = require('body-parser');
const home = require('./api/home/controller');

const app = express();

app.use(bodyParser()); 

app.use('/',home);

module.exports = app;