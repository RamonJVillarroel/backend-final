const express = require('express');
const carritoController = require('../../controllers/carrito.controller');
const router = express.Router();
router.get('/api/carrito/:carritoId', carritoController.getProducts);//asi se deberia ver al momento de gtomar algo de los controladores
router.post('/api/carrito', carritoController.createCart);
router.post('/api/carrito/:carritoId/:productoId',carritoController.saveProduct);
router.delete('/api/carrito/:carritoId',carritoController.deleteCart);
router.delete('/api/carrito/:carritoId/productos/:productoId',carritoController.deleteProduct);
module.exports = router;