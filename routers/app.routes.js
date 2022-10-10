const express = require('express')
const productosRoutes = require('./productos/productos.routes');
const carritoRoutes = require('./carrito/carrito.routes');
const router = express.Router();
router.use('/carrito',carritoRoutes);
router.use('/productos',productosRoutes);
module.exports= router;