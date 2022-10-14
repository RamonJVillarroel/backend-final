const express =require('express');
const {Server: HttpServer } = require('http');
const routerApi = require('./routers/app.routes');
const PORT = process.env.PORT || 8080;

const app =express();
const httpServer = new HttpServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routerApi);
const connectedServer = httpServer.listen(PORT,()=> {
   console.log(`servidor activo en ${PORT}`);
});
connectedServer.on('ERROR',
(error)=>{
    console.log(error.mensaje)
})