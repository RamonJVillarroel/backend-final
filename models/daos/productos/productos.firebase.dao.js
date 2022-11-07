const FirebaseContainer = require("../../container/firebase.container");

const collection = "productos";
class ProductosFirebaseDao extends FirebaseContainer {
    constructor(){
        super(collection)
    }
}

module.exports = ProductosFirebaseDao;