const { HTTP_STATUS } = require("../../../constants/api.constantes");
const FirebaseContainer = require("../../container/firebase.container");

const collection = "productos";
class ProductosFirebaseDao extends FirebaseContainer {
    constructor(){
        super(collection)
    }
    
  async save(product) {
    const { name, description, code, imgUrl, price, stock } = product

    if (!name || !description || !code || !imgUrl || !price || !stock) {
      const message = ''
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }
    if (typeof name !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof imgUrl !== 'string' || typeof price !== 'number' || typeof stock !== 'number') {
      const message = ''
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }

    const docRef = this.query.doc()
    return await docRef.set({
      timestamp: new Date().toLocaleString(),
      ...product
    })
  }

  async update(id, product) {
    const { name, description, code, imgUrl, price, stock } = product

    if (!name || !description || !code || !imgUrl || !price || !stock) {
      const message = ''
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }
    if (typeof name !== 'string' || typeof description !== 'string' || typeof code !== 'string' || typeof imgUrl !== 'string' || typeof price !== 'number' || typeof stock !== 'number') {
      const message = ''
      throw new HttpError(HTTP_STATUS.BAD_REQUEST, message)
    }

    const docRef = this.query.doc(id)
    const doc = await docRef.get()
    if (!doc.exists) {
      const message = `${id} `
      throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
    }
    return await docRef.update(product)
  }
}

module.exports = new ProductosFirebaseDao();