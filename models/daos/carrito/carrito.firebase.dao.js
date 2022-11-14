const FirebaseContainer = require("../../container/firebase.container");
const { HTTP_STATUS } = require('../../../constants/api.constantes')
const collection = "carrito";
class CarritoFirebaseDao extends FirebaseContainer {
    constructor() {
        super(collection)
    }
    async getProducts(cartId) {
        const cart = await this.query.getById(cartId)
        return [...cart.products]
    }

    async saveProduct(cartId, prodId) {
        const product = await productsFirebaseDAO.getById(prodId)
        const docRef = this.query.doc(cartId)
        const doc = await docRef.get()
        if (!doc.exists) {
            const message = `${cartId} `
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return await docRef.update({ products: FieldValue.arrayUnion(product) })
    }

    async deleteProduct(cartId, prodId) {
        const product = await productsFirebaseDAO.getById(prodId)
        const docRef = this.query.doc(cartId)
        const doc = await docRef.get()
        if (!doc.exists) {
            const message = ` ${cartId} `
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        return await docRef.update({ products: FieldValue.arrayRemove(product) })
    }
}

module.exports = new CarritoFirebaseDao();