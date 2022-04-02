const chalk = require("chalk");
const fs = require('fs');

function info(...args){
    console.log(chalk.green(...args));
}

function warn(...args){
    console.log(chalk.yellow(...args));
}

function error(...args){
    console.log(chalk.red(...args));
}
function putLogIntoFile(file,data){
    const writeStream = fs.createWriteStream(file,{encoding : 'utf-8' ,flags : 'a+' })

    writeStream.write(`[${new Date().toISOString()}]` + data + '\n' ) 
    writeStream.end();
}

module.exports = {
    info,
    warn,
    error,
    putLogIntoFile
};