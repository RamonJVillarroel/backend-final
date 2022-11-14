const config = require('../config')
const firebaseconfig = require('./firebase/firebase.config.json')

module.exports ={
    mongodb :{
    url:`mongodb+srv://ecommerce:${config.DB_PASSWORD}@ecommerce.vnr307k.mongodb.net/prueba?retryWrites=true&w=majority`
    },
    firebase:{
      credenciales: firebaseconfig
    }
}