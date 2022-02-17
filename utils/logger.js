const chalk = require("chalk");

function info(...args){
    debugger;
    return console.log(chalk["green"](...args));
}

function warn(...args){
    debugger;
    return console.log(chalk["yellow"](...args));
}

function error(...args){
    debugger;
    return console.log(chalk["red"](...args));
}

module.exports = {
    info,
    warn,
    error
};