//const {getAllCarritos}=require('../dataBase/carrito')
const fs = require('fs');
const carrito = JSON.parse(fs.readFileSync('./dataBase/carrito.json', 'utf-8'));//getAllCarritos();
const  products = JSON.parse(fs.readFileSync('./dataBase/data.json', 'utf-8'));
const obtenerCarrito = (req, res) => {
    //obtiene todos los carritos
    const { carritoId } = req.params;
    console.log(carritoId);
    const carto = carrito.find(carto => carto.id === +carritoId);
    if (!carto) {
        return res.status(404).json({ success: false, error: `carrito con id: ${carritoId} no existe` });
    }
    console.log(holis);
    return res.json(carrito.products);
};
const agregarCarrito = (req, res) => {
    //agrega carritos
    let { carritoCOM } = req.body;//configurar postman para que envie texto y pueda funcionar
    if (carritoCOM = 'crear carrito') {
        const newCarrito = {
            id: carrito.length + 1,
            timestamp: Date.now(),
            products,
        };
        carrito.push(newCarrito);
        fs.writeFileSync('./dataBase/carrito.json', JSON.stringify(carrito, null, 2));
        return res.json(newCarrito.id);
    }
};
const subirProductoId = (req, res) => {
    //incorpora productos al carrito por su id de productos
    const { params: { carritoId }, params: {productId } } = req;
    const carritoIndex = carrito.findIndex(carrito => carrito.id === +carritoId);
    const productIndex = products.findIndex(products => products.id === +productId);
    if ( productIndex && carritoIndex< 0) return res.status(404).json({ success: false, error: `en el carrito ${carritoId} el id ${productIndex} no se puede incorporar` });
    const newProduct = {
        ...carrito[carritoIndex],
        products,
    };
    carrito[carritoIndex] = newProduct;
    fs.writeFileSync('./dataBase/carrito.json', JSON.stringify(carrito, null, 2));
    return res.json({ success: true, result: newProduct });
};
const eliminarCarrito = (req, res) => {
    //elimina el carrito creado
    const { carritoId } = req.params;
    const carritoIndex = carrito.findIndex(carrito => carrito.id === +carritoId);
    if (carritoIndex < 0) return res.status(404).json({ success: false, error: `carrito con id: ${carritoId} no existe` });
    carrito.splice(carritoIndex, 1);
    fs.writeFileSync('./dataBase/carrito.json', JSON.stringify(carrito, null, 2));
    return res.json({ success: true, result: 'carrito eliminado' });
};
const eliminaProductosCart = (req, res) => {
    //elimina un producto del carrito por su id de carrito y id de producto
    const { params: { carritoId }, params: {productId } } = req;
    const carritoIndex = carrito.findIndex(carrito => carrito.id === +carritoId);
    const productIndex = products.findIndex(products=> products.id === +productId);
    if (productIndex && carritoIndex < 0) return res.status(404).json({ success: false, error: `en el carrito ${carritoId} el id ${productIndex}` });
    carrito.products.splice(carritoIndex&&productIndex, 1)
    fs.writeFileSync('./dataBase/carrito.json', JSON.stringify(carrito, null, 2));
    return res.json({ success: true, result: 'carrito eliminado' });
};

module.exports = {
    obtenerCarrito,
    agregarCarrito,
    subirProductoId,
    eliminarCarrito,
    eliminaProductosCart,
};