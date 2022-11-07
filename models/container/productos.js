//const {getAllProductos}=require('../dataBase/productos')
const fs =require('fs')
const {ProductosDao}= require('../daos/app.daos')
const products = JSON.parse(fs.readFileSync('./dataBase/data.json', 'utf-8'));//getAllProductos();

const productoDao = new ProductosDao();


const obtenerProductos=(req, res) => {
    res.send(products);
};
const obtenerProductosId= (req, res) => {
    const { productId } = req.params;
    const product = products.find(product => product.id === +productId);
    if (!product) {
        return res.status(404).json({ success: false, error: `Producto con id: ${productId} no existe` });
    }
    return res.json(product);
};
const subirPoductos = (req, res) => {
    const { name, price,description, image,codigo,stock } = req.body;
    if (!name || !price || !image|| !description|| !codigo|| !stock) {
        return res.status(400).json({ succes: false, error: 'Formato de cuerpo incorrecto' });
    }
    const newProduct = {
        id: products.length + 1,
        timestamp: Date.now(),
        name,
        description,
        price: +price,
        codigo: +codigo,
        stock: +stock,
        image,
    };
    products.push(newProduct);
    fs.writeFileSync('./dataBase/data.json', JSON.stringify(products, null, 2));
    return res.json(newProduct);
};


const actualizarProducto= (req, res) => {
    const { params: { productId }, body: { name, price,description, image,codigo,stock } } = req;
    if (!name || !price || !image|| !description|| !codigo|| !stock) {
        return res.status(400).json({ success: false, error: 'Formato de cuerpo incorrecto' });
    };
    const productIndex = products.findIndex((product) => product.id === +productId);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Producto con id: ${productId} no existe` });
    const newProduct = {
        ...products[productIndex],
        timestamp: Date.now(),
        name,
        description,
        price: +price,
        codigo: +codigo,
        stock: +stock,
        image,
    };
    products[productIndex] = newProduct;
    fs.writeFileSync('./dataBase/data.json', JSON.stringify(products, null, 2));
    return res.json({ success: true, result: newProduct });
};
const eliminarProducto= (req, res) => {
    const { productId } = req.params;
    const productIndex = products.findIndex(product => product.id === +productId);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Producto con id: ${productId} no existe` });
    products.splice(productIndex, 1);
    fs.writeFileSync('./dataBase/data.json', JSON.stringify(products, null, 2));
    return res.json({ success: true, result: 'producto eliminado' });
};
module.exports = {
    obtenerProductos,
    obtenerProductosId,
    subirPoductos,
    actualizarProducto,
    eliminarProducto,
};