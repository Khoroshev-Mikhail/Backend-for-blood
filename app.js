const express = require("express");
const fs = require("fs");
const jsonParser = express.json()
const app = express()
const { Client } = require('pg')
const client = new Client()
await client.connect()

//перед выгрузкой удалить!!!
//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //указать конкретный домен
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.send(`<h1>API is working</h1>`)
})

app.post('/getData', jsonParser, (req, res) => {
    if(!req.body.id){
        return res.sendStatus(400)
    }
})

app.listen(3001, ()=>{
    console.log('Сервер ожидает запросов...')
})