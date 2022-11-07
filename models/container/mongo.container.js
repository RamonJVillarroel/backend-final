const mongoose = require('mongoose');
const { HTTP_STATUS } = require('../../constants/api.constantes')
const dbconfig = require('../../dataBase/db.config')
const { HttpError } = require('../../utils/api.utils');

class MongoContainer {
    constructor(collection, schema){
        this.model = mongoose.model(collection, schema);
    }
    static async connect(){
        await mongoose.connect(dbconfig.mongodb.url);
    }
    static async disconnect(){
        await mongoose.disconnect();
    }
    async getAlll (){
        try {
            const documentos = await this.model.find().lean();
            return documentos;
            
        } catch (error) {
            console.log(error);
        }
    }
    async getById (id){
     const documento = await this.model.findOne({_id: id},{__v:0});
     if (!documento) {
        const message = `${id} no esta registrado`;
        throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
      }
     return documento;
    }
    async save(item){
        const newDocumento = new this.model(item);
        return await newDocumento.save();
    }
    async upDate(id, item){
        const updatedocumento = await this.model.updateOne(
            {_id:id},
            {$set:{...item}}
        );
        if (!updatedocumento.matchedCount) {
            const message = `${id} no esta registrado`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
          }
        return updatedocumento;
    }
    async delete(id){
        return await this.model.deleteOne({_id:id});
    }
}
module.exports={
    MongoContainer
}