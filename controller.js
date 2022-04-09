const fs = require('fs');
const logger = require('./utils/logger')

const index = (req, res) =>{
    
    let params = {
        list : ''
    }

    const dataReadStream = fs.createReadStream('./tasks.txt',{encoding:'utf-8'})
    dataReadStream.on('data', chunk =>{
        params.list += chunk
    })
    
    const file$ = fs.createReadStream('./index.html' , {encoding : 'utf-8'});
    let template = '' ;  

    file$.on('data',chunk => {
        template += chunk;
    });

    file$.on('end',() => {
        template = Object
        .keys(params)
        .reduce((result,key) => result.replace(new RegExp(`\{\%${key}\%\}`,'g') ,params[key]),template);

        res.end(template);
    });

    file$.on('error', err =>{
        console.error(err);

        res.statusCode = 500;
        res.end();
    })
}

const addNewTask = (req,res) =>{
    dataWriteStream = fs.createWriteStream('./tasks.txt',{encoding : 'utf-8' ,flags : 'a+' })
    dataWriteStream.write(`<li>[${new Date().toISOString()}] ` + req.body.newtask + '</li>\n')
    dataWriteStream.end(logger.info("Task added successfully"))
    res.redirect('/')
}



module.exports = {
    index,
    addNewTask
}