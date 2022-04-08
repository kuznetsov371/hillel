const http = require('http');
const fs = require('fs');
const logger = require('./utils/logger');

const PORT = 3000; // 3000 - порт для режима разработки 
const server = http.createServer();

server.on('request',(req,res) =>{                       //req - readable stream ; res - writable stream;
    
    logger.putLogIntoFile('./requests.log',`http://localhost:${PORT}` + req.url);

    if(req.url == '/'){
        fs.createReadStream('./index.html').pipe(res);
    }else if(req.url == '/favicon.ico'){
        fs.createReadStream('./favicon.ico').pipe(res);     //санчала читаем,затем оправляем в поток
    }else{
        res.destroy();
    }
}) 

server.listen(PORT ,() =>{
    console.log(`Server is serving on http://localhost:${PORT}`)
} );
