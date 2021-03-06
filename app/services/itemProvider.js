const fs = require('fs');
const path = require('path');

class ItemDataProvider{
    constructor(){
        this._cache = null;
        this._dataFilePath = path.join(__dirname, '..','..','data','items.json');
    }

    async getItems(){
        if(this._cache) return this._cache;
        try{
            fs.accessSync(this._dataFilePath);
        }catch{
            this._cache = [];
            return this._cache;
        }
        const file$ = fs.createReadStream(
            this._dataFilePath,
            {encoding: 'utf-8'} 
        );

        const data = await new Promise((res,rej) =>{
            let result = '';
            file$.on('data', data =>{
                result += data;
            });

            file$.on('end', () =>{
                res(result);
            });

            file$.on('error', rej);
        });
        this._cache = JSON.parse(data);
        return this._cache;
    }

    async setItem(item){
        if(!this._cache){
            this._cache = await this.getItems();
        }
        console.log(item);
        this._cache.push(item);
        const file$ = fs.createWriteStream(
            this._dataFilePath,
            {encoding: 'utf-8'}
        );

        file$.end(JSON.stringify(this._cache));

        return this._cache;
    }
}

const itemsProvider = new ItemDataProvider();

module.exports = itemsProvider;