const express = require('express');
const productoController = require('../../controllers/productos.controller')

const router = express.Router();
router.get('/api/productos', productoController.getProducts);
router.get('/api/productos/:productId',productoController.getProductById);
router.post('/api/productos', productoController.saveProduct);
router.put('/api/productos/:productId', productoController.updateProduct);
router.delete('/api/productos/:productId', productoController.deleteProduct);
module.exports = router;