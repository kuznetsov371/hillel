const http = require('http');
const express = require('express')
const path = require('path')
const logger = require('./utils/logger');
const controller = require('./controller');
const { runInNewContext } = require('vm');

const PORT = 3000; // 3000 - порт для режима разработки 

const app = express();

app.listen(PORT, () => {
    console.log(`Server is serving on http://localhost:${PORT}`)
});

app.use(express.urlencoded());
app.use(express.json());

app.get('/' , (req,res) =>{
    controller.index(req,res)
})

app.post('/' , (req,res) =>{
    controller.addNewTask(req,res)
})