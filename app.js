//Подключаем express
const express = require("express");
const jsonParser = express.json()
const app = express()

//Подключаем postgreSQL
const Pool = require('pg').Pool
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',     
    password: '12345',
    database: 'avecoder', 
    port: 5432,
});

//перед выгрузкой удалить!!! для устранения ошибки на локальном сервере
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //указать конкретный домен
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send(`<h1>API is working</h1>`)
})

app.get('/get_r1022', (req, res) => {
    const query = "SELECT * FROM r1022;"
    pool.query(query, (error, results) => {
    if (error) {
        throw error
    }
    res.status(200).json(results.rows)
    })
})


app.listen(3001, ()=>{
    console.log('Сервер ожидает запросов...')
})