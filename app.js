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
app.get('/getCompanies', (req, res) => {
    const query = "SELECT * FROM minzdrav.mpe1gem;"
    pool.query(query, (error, results) => {
    if (error) {
        throw error
    }
    res.status(200).json(results.rows)
    })
})

app.post('/getCompanyBySubject', jsonParser, (req, res) => {
    const { r1022 } = req.body
    const query = `SELECT * FROM minzdrav.mpe1gem WHERE r1022 = '${r1022}';`
    pool.query(query, (error, results) => {
    if (error) {
        throw error
    }
    res.status(200).json(results.rows)
    })
})

app.post('/setCompany', jsonParser, (req, res) => {
    const {npp, r1022, naim_org, adr_fact, inn, plazma_max, plazma_cena, erm_max, erm_cena, immg_max, immg_cena, alb_max, alb_cena} = req.body
    const query = `
        INSERT INTO "minzdrav"."mpe1gem" 
        ("npp", "r1022", "naim_org", "adr_fact", "inn", "plazma_max", "plazma_cena", "erm_max", "erm_cena", "immg_max", "immg_cena", "alb_max", "alb_cena")
        VALUES 
        ('${npp}', '${r1022}', '${naim_org}', '${adr_fact}', '${inn}', '${plazma_max}', '${plazma_cena}', '${erm_max}', '${erm_cena}', '${immg_max}', '${immg_cena}', '${alb_max}', '${alb_cena}');
    `
    pool.query(query, (error, results) => {
    if (error) {
        throw error
    }
    res.status(200).json(results.rows)
    })
})
app.post('/updateCompany', jsonParser, (req, res) => {
    const {id, npp, r1022, naim_org, adr_fact, inn, plazma_max, plazma_cena, erm_max, erm_cena, immg_max, immg_cena, alb_max, alb_cena} = req.body
    const query = `
        UPDATE "minzdrav"."mpe1gem" 
        ("npp", "r1022", "naim_org", "adr_fact", "inn", "plazma_max", "plazma_cena", "erm_max", "erm_cena", "immg_max", "immg_cena", "alb_max", "alb_cena")
        =
        ('${npp}', '${r1022}', '${naim_org}', '${adr_fact}', '${inn}', '${plazma_max}', '${plazma_cena}', '${erm_max}', '${erm_cena}', '${immg_max}', '${immg_cena}', '${alb_max}', '${alb_cena}');
        WHERE id = '${id}'
    `
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