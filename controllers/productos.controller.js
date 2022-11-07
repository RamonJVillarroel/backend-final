const { HTTP_STATUS } = require('../constants/api.constantes');
const {ProductosDao}=require('../models/daos/app.daos');
const {successResponse}=require('../utils/api.utils')
const productosDao = new ProductosDao();
class productoController {

    async getProductos(req,res,next){
        try {
            const productos = await productosDao.getAll();
            const response = successResponse(productos);
            res.status(HTTP_STATUS.OK).json(response)
        } catch (error) {
            
            next(error)
        }
    }
}

module.exports = productoController;