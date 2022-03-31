const chalk = require("chalk");
const fileSeeker = require("./fileSeeker");
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


module.exports = {
    info,
    warn,
    error
};