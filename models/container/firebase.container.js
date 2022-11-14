const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore')
const { HTTP_STATUS } = require('../../constants/api.constantes')
const dbconfig = require('../../dataBase/db.config')
const { HttpError } = require('../../utils/api.utils');
admin.initializeApp({
    credential: admin.credential.cert(dbconfig.firebase.credenciales),
})
class FirebaseContainer {
    constructor(collection) {
        const db = getFirestore();
        this.query = db.collection(collection);
    }
    static async disconnect() {
        await admin.app().delete()
      }
    async getAlll() {
        const docRef = await this.query.get();
        const documents = docRef.docs;
        return documents.map(
            document => {
                return {
                    id: document.id,
                    ...document.data()
                }
            }
        )
    }
    async getById(id) {
        const docRef = this.query.get(id);
        if (!docRef) {
            const message = `${id} no esta registrado`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        const document = await docRef.get();
        return document.data();
    }
    async save(item) {
        const docRef = this.query.doc();
        return await docRef.set(item);
    }
    async upDate(id, item) {
        const docRef = this.query.doc(id);
        if (!docRef) {
            const message = `${id} no esta registrado`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return await docRef.update(item);
    }
    async delete(id) {
        const docRef = this.query.doc(id);
        return await docRef.delete();
    }


}
module.exports = FirebaseContainer;