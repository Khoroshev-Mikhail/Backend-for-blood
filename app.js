//Подключаем express
const express = require("express");
const jsonParser = express.json()
const app = express()
const config = require("./config");

//Подключаем postgreSQL
const Pool = require('pg').Pool
const pool = new Pool({
    host: config.host,
    user: config.user,     
    password: config.password,
    database: config.database, 
    port: 5432,
});

//перед выгрузкой удалить!!! для устранения ошибки на локальном сервере
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //указать конкретный домен
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, UPDATE, HEAD, OPTIONS, GET, POST");
    next();
});

app.get('/', (_, res) => {
    res.status(200).send(`<h1>API is working</h1>`)
})

app.get('/get_r1022', (_, res) => {
    const query = "SELECT * FROM r1022;"
    pool.query(query, (error, results) => {
        if (!error) {
            return res.status(200).json(results.rows)
        }
        return res.status(400).send(error.message)
    })  
})
app.get('/getCompanies', (_, res) => {
    const query = "SELECT * FROM minzdrav.mpe1gem;"
    pool.query(query, (error, results) => {
        if (!error) {
            return res.status(200).json(results.rows)
        }
        return res.status(400).send(error.message)
    })
})

app.get('/subjects/:r1022/', jsonParser, (req, res) => {
    const { r1022 } = req.params
    const query = `SELECT * FROM minzdrav.mpe1gem WHERE r1022 = '${r1022}';`
    pool.query(query, (error, results) => {
        if (!error) {
            return res.status(200).json(results.rows)
        }
        return res.status(400).send(error.message)
    })
})


//Добавить компанию
app.post('/addCompany', jsonParser, (req, res) => {
    const {npp, r1022, naim_org, adr_fact, inn, plazma_max, plazma_cena, erm_max, erm_cena, immg_max, immg_cena, alb_max, alb_cena} = req.body
    const query = `
        INSERT INTO "minzdrav"."mpe1gem" 
        ("npp", "r1022", "naim_org", "adr_fact", "inn", "plazma_max", "plazma_cena", "erm_max", "erm_cena", "immg_max", "immg_cena", "alb_max", "alb_cena")
        VALUES 
        ('${npp}', '${r1022}', '${naim_org}', '${adr_fact}', '${inn}', '${Number(plazma_max)}', '${Number(plazma_cena)}', 
        '${Number(erm_max)}', '${Number(erm_cena)}', '${Number(immg_max)}', '${Number(immg_cena)}', '${Number(alb_max)}', '${Number(alb_cena)}');
    `
    pool.query(query, (error, results) => {
        if (!error) {
            return res.status(200).json(results.rows)
        }
        return res.status(400).send(error.message)
    })
})
//Обновить компанию
app.put('/updateCompany', jsonParser, (req, res) => {
    const {id, npp, r1022, naim_org, adr_fact, inn, plazma_max, plazma_cena, erm_max, erm_cena, immg_max, immg_cena, alb_max, alb_cena} = req.body
    const query = `
        UPDATE "minzdrav"."mpe1gem" SET 
        ("npp", "r1022", "naim_org", "adr_fact", "inn", "plazma_max", "plazma_cena", "erm_max", "erm_cena", "immg_max", "immg_cena", "alb_max", "alb_cena")
        =
        ('${npp}', '${r1022}', '${naim_org}', '${adr_fact}', '${inn}', '${plazma_max}', '${plazma_cena}', '${erm_max}', '${erm_cena}', '${immg_max}', '${immg_cena}', '${alb_max}', '${alb_cena}')
        WHERE id = '${id}';
    `
    pool.query(query, (error, results) => {
        if (!error) {
            return res.status(200).json(results.rows)
        }
        return res.status(400).send(error.message)
    })
})

//Удалить компанию
app.delete('/deleteCompany', jsonParser, (req, res) => {
    const { id } = req.body
    const query = `DELETE FROM minzdrav.mpe1gem WHERE id = '${id}';`
    pool.query(query, (error, results) => {
        if (!error) {
            return res.status(200).json(results.rows)
        }
        return res.status(400).send(error.message)
    })
})

app.listen(3001, ()=>{
    console.log('Сервер ожидает запросов...')
})