const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class ExtEventEmmiter extends EventEmitter{
    constructor(options){
        super(options);
        this._verbose = false;
    }

    setVerbose(value){
        this._verbose = value;
    }

    putLogsToFile(event,...payload){
        fs.writeFile('./events.log',`[${new Date().toISOString()}][${event}] ${payload}\n`,{ flag:'a+'}, err =>{
            console.error(err);
        })
    }

    emit(event, ...args){
        this._verbose && this.putLogsToFile(event,...args)
        return super.emit(event,...args);
    }
}

const MyEventEmitter = new ExtEventEmmiter()

async function seek(target, dirPath){
    const access = fs.promises.access;
    const readdir = fs.promises.readdir;

    try{
        await access(dirPath);
        const data = await readdir(dirPath);
        if(data.includes(target)){
            MyEventEmitter.emit('success',path.join(dirPath,target));
        }
        else{
            MyEventEmitter.emit('fall',new Error(`File doesn't exist`))
        }
    }catch(err){
        MyEventEmitter.emit('fall',err)
    }
}

module.exports = {
    seek,
    MyEventEmitter
};