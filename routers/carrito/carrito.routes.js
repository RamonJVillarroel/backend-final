const express = require('express');
const {CarritoControler}= require('../../controllers/carrito.controller')
const {obtenerCarrito, agregarCarrito,subirProductoId,eliminaProductosCart,eliminarCarrito}= require('../../controllers/carrito');
const router = express.Router();
router.get('/api/carrito/:carritoId',);
router.post('/api/carrito', agregarCarrito);
router.post('/api/carrito/:carritoId/:productoId',subirProductoId);
router.delete('/api/carrito/:carritoId', eliminarCarrito);
router.delete('/api/carrito/:carritoId/productos/:productoId',eliminaProductosCart);
module.exports = router;