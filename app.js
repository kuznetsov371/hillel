const  logger  = require("./utils/logger");
const fileSeeker = require("./utils/fileSeeker");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;
let time = new Date();

if(!argv.dir || !argv.fileToFind){
    logger.error("ERROR! --dir and --fileToFind are required");
    process.exit(1);
}

fileSeeker.seek(argv.fileToFind , argv.dir);

fileSeeker.MyEventEmitter.addListener('success',target => {
    logger.info('[File Seeker]', target);
    if(argv.verbose){
        fileSeeker.MyEventEmitter.emit('log','Time[UTC]: '+time.getUTCHours()+':'+time.getUTCMinutes()+':'+time.getUTCSeconds()+' Event Name:success; content:'+target+'\n'); 
    }
})
fileSeeker.MyEventEmitter.addListener('fall',err =>{
    logger.error('[File Seeker]',err);
    if(argv.verbose){
        fileSeeker.MyEventEmitter.emit('log','Time[UTC]: '+time.getUTCHours()+':'+time.getUTCMinutes()+':'+time.getUTCSeconds()+'; Event Name:fall; content:'+err+'\n'); 
    }
});



    
