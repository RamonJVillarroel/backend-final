const dotenv = require('dotenv')//para ejecutar variables de ambiente a la hora de correre el servidor, recordar siempre instalar
dotenv.config();
module.exports ={
    DB_PASSWORD: process.env.DB_PASSWORD,
    DATASOURCE: process.env.DATASOURCE
}