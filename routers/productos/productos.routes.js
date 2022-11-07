const express = require('express');

//onst {obtenerProductos, eliminarProducto,obtenerProductosId,actualizarProducto,subirPoductos}= require('../../controllers/productos')
const router = express.Router();
router.get('/api/productos', productoController.getProductos );
router.get('/api/productos/:productId',obtenerProductosId);
router.post('/api/productos', subirPoductos);
router.put('/api/productos/:productId', actualizarProducto);
router.delete('/api/productos/:productId', eliminarProducto);
module.exports = router;