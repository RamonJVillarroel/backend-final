const express = require('express');
const {obtenerCarrito, agregarCarrito,subirProductoId,eliminaProductosCart,eliminarCarrito}= require('../../controllers/carrito');
const router = express.Router();
router.get('/api/carrito', obtenerCarrito);
router.post('/api/carrito', agregarCarrito);
router.post('/api/carrito/:id/:id_producto',subirProductoId);
router.delete('/api/carrito/:carritoId', eliminarCarrito);
router.delete('/api/carrito/:id/productos/:id_producto',eliminaProductosCart);
module.exports = router;