const { Router } = require('express');
const path = require('path');
const fs = require('fs');

const homeRouter = Router();

const { itemsProvider } = require('../../services/index');

homeRouter.get('/',(req,res) =>{
    let template = '' ;
    const file$ = fs.createReadStream(path.join(
        __dirname,
        '..',
        '..',
        '..',
        'public',
        'views',
        'index.html'
    ) , {encoding : 'utf-8'});
    
    file$.on('data',chunk => {
        template += chunk;
    });

    file$.on('end',async () => {
        const items = await itemsProvider.getItems();
        const list  = items.map(e => `<li>[${e.date}] ${e.value}</li>` ).join('\n');
        template = template.replace('{%list%}',list)

        res.end(template);
    });

    file$.on('error', err =>{
        console.error(err);

        res.statusCode = 500;
        res.end();
    });

});

homeRouter.get('/index.html',(req,res) =>{
    res.redirect('/');
});

homeRouter.post('/',async(req,res) =>{
    // let body = '';

    // req.on('data',chunk => {
    //     body += chunk;
    // });

    // req.on('end',async () => {
    //     console.log(body);
    //     const item = body.replace('newtask=', '');
        await itemsProvider.setItem({
            value:req.body.newtask,
            date : new Date().toISOString()
        });
        res.redirect('/');
    // });
});

module.exports = homeRouter;