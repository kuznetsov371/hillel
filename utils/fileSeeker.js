const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const EventEmitter = require('events');

const MyEventEmitter = new EventEmitter()

async function seek(target, dirPath){
    const access = promisify(fs.access);
    const readdir = promisify(fs.readdir);

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