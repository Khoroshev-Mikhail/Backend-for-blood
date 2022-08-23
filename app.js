//Подключаем express
const express = require("express");
const jsonParser = express.json()
const app = express()

//Подключаем postgreSQL
const config = require("./config");
const Pool = require('pg').Pool
const pool = new Pool({
    host: config.host,
    user: config.user,     
    password: config.password,
    database: config.database, 
    port: 5432,
});

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    next();
});


//Функция для проверки валидности входящих данных компании
function isValidCompany(company){
    const {npp, r1022, naim_org, adr_fact, inn, plazma_max, plazma_cena, erm_max, erm_cena, immg_max, immg_cena, alb_max, alb_cena} = company
    
    const regExp_r1022 = /^[0-9]{1,11}$/;
    const regExp_text = /^[a-zа-я0-9\s_\.,!\?\'\"]+$/i;
    const regExp_inn = /^[0-9]{12}$/;
    const regExp_numeric_17_6 = /^[0-9]{1,17}[.,]?[0-9]{0,6}$/;
    
    if(typeof npp !== 'number') {
        return false
    }
    if(! regExp_r1022.test(r1022)){
        return false
    }
    if(! regExp_text.test(naim_org)){
        return false
    }
    if(! regExp_text.test(adr_fact)){
        return false
    }
    if(! regExp_inn.test(inn)){
        return false
    }
    if(! regExp_numeric_17_6.test(plazma_max)){
        return false
    }
    if(! regExp_numeric_17_6.test(plazma_cena)){
        return false
    }
    if(! regExp_numeric_17_6.test(erm_max)){
        return false
    }
    if(! regExp_numeric_17_6.test(erm_cena)){
        return false
    }
    if(! regExp_numeric_17_6.test(immg_max)){
        return false
    }
    if(! regExp_numeric_17_6.test(immg_cena)){
        return false
    }
    if(! regExp_numeric_17_6.test(alb_max)){
        return false
    }
    if(! regExp_numeric_17_6.test(alb_cena)){
        return false
    }
    return true
}

app.get('/', (error, res) => {
    return res.status(200).send(`<h1>API is working</h1>`)
})

app.get('/subjects', (_, res) => {
    const query = "SELECT * FROM r1022;"
    pool.query(query, (error, results) => {
        if (!error) {
            return res.status(200).json(results.rows)
        }
        return res.status(400).send(error.message)
    })  
})

app.get('/companies/subjects/:r1022/', jsonParser, (req, res) => {
    const { r1022 } = req.params
    if(! /[0-9]{1,11}/.test(r1022)){
        return res.status(400).send('Неправильный код субъекта РФ')
    }
    const query = `SELECT * FROM minzdrav.mpe1gem WHERE r1022 = '${r1022}';`
    pool.query(query, (error, results) => {
        if (!error) {
            return res.status(200).json(results.rows)
        }
        return res.status(400).send(error.message)
    })
})

app.post('/addCompany', jsonParser, (req, res) => {
    if(! isValidCompany(req.body)){
        return res.status(400).send('Неправильно заполнены данные компании!')
    }
    const {npp, r1022, naim_org, adr_fact, inn, plazma_max, plazma_cena, erm_max, erm_cena, immg_max, immg_cena, alb_max, alb_cena} = req.body
    const query = `
        INSERT INTO "minzdrav"."mpe1gem" 
        ("npp", "r1022", "naim_org", "adr_fact", "inn", "plazma_max", "plazma_cena", "erm_max", "erm_cena", "immg_max", "immg_cena", "alb_max", "alb_cena")
        VALUES 
        ('${npp}', '${r1022}', '${naim_org}', '${adr_fact}', '${inn}', '${plazma_max}', '${plazma_cena}', 
        '${erm_max}', '${erm_cena}', '${immg_max}', '${immg_cena}', '${alb_max}', '${alb_cena}');
    `
    pool.query(query, (error, results) => {
        if (!error) {
            return res.status(200).json(results.rows)
        }
        return res.status(400).send(error.message)
    })
})

app.put('/updateCompany', jsonParser, (req, res) => {
    const {id, npp, r1022, naim_org, adr_fact, inn, plazma_max, plazma_cena, erm_max, erm_cena, immg_max, immg_cena, alb_max, alb_cena} = req.body
    if(! isValidCompany(req.body) || typeof id !== 'number'){
        return res.status(400).send('Неправильно заполнены данные компании или неверно указан id!')
    }
    const query = `
        UPDATE "minzdrav"."mpe1gem" SET 
        ("npp", "r1022", "naim_org", "adr_fact", "inn", "plazma_max", "plazma_cena", "erm_max", "erm_cena", "immg_max", "immg_cena", "alb_max", "alb_cena")
        =
        ('${npp}', '${r1022}', '${naim_org}', '${adr_fact}', '${inn}', '${plazma_max}', '${plazma_cena}', '${erm_max}', '${erm_cena}', '${immg_max}', '${immg_cena}', '${alb_max}', '${alb_cena}')
        WHERE id = '${id}';
    `
    pool.query(query, (error, results) => {
        if(results.rowCount === 0){
            return res.status(404).send('Несуществущий id компании!')
        }
        if (!error) {
            return res.status(200).json(results.rows)
        }
        return res.status(400).send(error.message)
    })
})

app.delete('/deleteCompany', jsonParser, (req, res) => {
    const { id } = req.body
    if( typeof id !== 'number'){
        return res.status(400).send('Не верно указан id!')
    }
    const query = `DELETE FROM minzdrav.mpe1gem WHERE id = '${id}';`
    pool.query(query, (error, results) => {
        if(results.rowCount === 0){
            return res.status(404).send('Несуществущий id компании!')
        }
        if (!error) {
            return res.status(200).json(results.rows)
        }
        return res.status(400).send(error.message)
    })
})

app.use(function(error, req, res, next) {
    if(error){
        return res.status(500).send('Something is broke')
    }
    next()
});

app.listen(3001, ()=>{
    console.log('Сервер ожидает запросов...')
})