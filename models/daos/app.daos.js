const config = require("../../config");

let ProductosDao;
let CarritoDao;
//let UserDao;

switch (config.DATASOURCE) {
    case 'mongo':
        ProductosDao = require('./productos/productos.mongo.dao');
        CarritoDao = require('./carrito/carrito.mongo.dao');
        // UserDao = require('./usuarios/usuarios.mongo.dao');
        break;
    case 'firebase':
        ProductosDao = require('./productos/productos.firebase.dao');
        CarritoDao = require('./carrito/carrito.firebase.dao')
        // UserDao = require('./usuarios/usuarios.firebase.dao');
        break;
    default:
      throw new Error("pase un valor valido");

}

module.exports = {
    ProductosDao,
    CarritoDao,
}