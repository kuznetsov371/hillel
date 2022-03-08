const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const MyEventEmitter = new EventEmitter()

function seek(target, dirPath){
    
    fs.readdir(dirPath, (err, data) => {
            if (err) process.exit(1);
            result = null;
            data.forEach(element => {
                if(element == target){
                   result = path.join(dirPath,target)
                }
            });
            if(result){
                MyEventEmitter.emit('success',result);
            }
            else{
                MyEventEmitter.emit('fall',{target,dirPath});
            }
        });
        debugger;
}


module.exports = {
    seek,
    MyEventEmitter
};