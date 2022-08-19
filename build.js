const fs = require("fs");
const Pool = require('pg').Pool
const config = require("./config");


const pool = new Pool({
    host: config.host,
    user: config.user,     
    password: config.password,
    database: config.database, 
    port: 5432,
});


//Добавить ассинхронность
let sql1Result = []
let sql2Result = []

const sql1 = fs.readFileSync(__dirname + '/SQL/public_r1022.sql', 'utf-8')

pool.query(sql1, (error, results) => {
    if (error) {
        throw error
    }
    console.log(results)
})
const sql2 = fs.readFileSync(__dirname + '/SQL/sqlQuery.sql', 'utf-8')

pool.query(sql2, (error, results) => {
    if (error) {
        throw error
    }
    console.log(results)
})