const { Schema}=require('mongoose');
const MongoContainer = require('../../container/mongo.container');

const collection = "productos";
const productoSchema = new Schema({
    name:{type:String},
    description: {type:String},
    price: {type:Number},
    codigo: {type:String},
    stock: {type:Number},
    image: {type:String}
})
class ProductosMongo extends MongoContainer{
    constructor(){
        super(collection, productoSchema)
    }
}
module.exports = ProductosMongo;