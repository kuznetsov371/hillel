const app = require('./app/index')

const PORT = 3000; // 3000 - порт для режима разработки 


app.listen(PORT, () => {
    console.log(`Server is serving on http://localhost:${PORT}`)
});