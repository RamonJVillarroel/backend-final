const { HTTP_STATUS } = require('../constants/api.constantes');
const {ProductosDao}=require('../models/daos/app.daos');
const {successResponse}=require('../utils/api.utils')
const productosDao = new ProductosDao();


class productoController {

    async getProducts(req, res, next) {
        try {
          const products = await productosDao.getAll()
          const response = successResponse(products)
          res.json(response)
        } catch (err) {
          next(err)
        }
      }
    
      async getProductById(req, res, next) {
        const { id } = req.params
        try {
          const product = await productosDao.getById(id)
          const response = successResponse(product)
          res.json(response)
        } catch (err) {
          next(err)
        }
      }
    
      async saveProduct(req, res, next) {
        try {
          const newProduct = await productosDao.save(req.body)
          const response = successResponse(newProduct)
          res.status(HTTP_STATUS.CREATED).json(response)
        } catch (err) {
          next(err)
        }
      }
    
      async updateProduct(req, res, next) {
        const { id } = req.params
        try {
          const updatedProduct = await productosDao.update(id, req.body)
          const response = successResponse(updatedProduct)
          res.json(response)
        } catch (err) {
          next(err)
        }
      }
    
      async deleteProduct(req, res, next) {
        const { id } = req.params
        try {
          const deletedProduct = await productosDao.delete(id)
          const response = successResponse(deletedProduct)
          res.json(response)
        } catch (err) {
          next(err)
        }
      }
}

module.exports = new productoController();