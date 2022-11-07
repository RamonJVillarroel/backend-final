const express = require('express');
const { Server: HttpServer } = require('http');
const envConfig = require('./config');
const routerApi = require('./routers/app.routes');
const PORT = process.env.PORT || 8080;

/* con esto se reemplazaria el swif 
const DATASOURCE_BY_ENV = {
    mongo: require('./models/container/mongo.container'),
    firebase: require('./models/container/}')
};
const datasource = DATASOURCE_BY_ENV(envConfig.DATASOURCE) */
const app = express();
const httpServer = new HttpServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routerApi);


const connectedServer = httpServer.listen(PORT, () => {
    console.log(`servidor activo en ${PORT}`);
});
connectedServer.on('ERROR',
    (error) => {
        console.log(error.mensaje)
    })