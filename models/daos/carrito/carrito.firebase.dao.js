const FirebaseContainer = require("../../container/firebase.container");

const collection = "carrito";
class CarritoFirebaseDao extends FirebaseContainer {
    constructor(){
        super(collection)
    }
}

module.exports = CarritoFirebaseDao;