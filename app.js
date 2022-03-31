const  logger  = require("./utils/logger");
const fileSeeker = require("./utils/fileSeeker");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

if(!argv.dir || !argv.fileToFind){
    logger.error("ERROR! --dir and --fileToFind are required");
    process.exit(1);
}

fileSeeker.MyEventEmitter.setVerbose(argv.verbose)
fileSeeker.seek(argv.fileToFind , argv.dir);

fileSeeker.MyEventEmitter.addListener('success',target => {
    logger.info('[File Seeker]', target);
})
fileSeeker.MyEventEmitter.addListener('fall',err =>{
    logger.error('[File Seeker]',err);
});



    
