const  logger  = require("./utils/logger");
const fileSeeker = require("./utils/fileSeeker");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

fileSeeker.MyEventEmitter.addListener('success',payload => {
    logger.info(payload);
});

fileSeeker.MyEventEmitter.addListener('fall',payload =>{
    logger.error("ERROR! "+ payload.target +" is not found in directory: "+payload.dirPath)
});

fileSeeker.seek(argv.fileToFind , __dirname);
fileSeeker.seek(argv.dirToFind , __dirname);
fileSeeker.seek(argv.fakeFile , __dirname);







