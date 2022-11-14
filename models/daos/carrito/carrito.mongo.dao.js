const { Schema } = require('mongoose');
const MongoContainer = require('../../container/mongo.container');


const collection = "carrito";
const CarritoSchema = new Schema({
    timestamp: Date.now(),
    productos: {
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        codigo: { type: String },
        stock: { type: Number },
        image: { type: String }
    }
})
class CarritoMongo extends MongoContainer {
    constructor() {
        super(collection, CarritoSchema)
    }
}
module.exports = new CarritoMongo();