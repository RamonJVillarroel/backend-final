const fs = require('fs');
const carrito = JSON.parse(fs.readFileSync('./dataBase/carrito.json', 'utf-8'));
const products = JSON.parse(fs.readFileSync('./dataBase/data.json', 'utf-8'));
const obtenerCarrito = (req, res) => {
    //obtiene todos los produtos por id de carrito
    const { carritoId } = req.params;
    const carto = carrito.find(carto => carto.id === +carritoId);
    if (!carto) {
        return res.status(404).json({ success: false, error: `carrito con id: ${carritoId} no existe` });
    }
    return res.json(carto.products);
};
const agregarCarrito = (req, res) => {
    //agrega carritos
    const { name, price, description, image, codigo, stock } = req.body;
    if (!name || !price || !image || !description || !codigo || !stock) {
        return res.status(400).json({ succes: false, error: 'Formato de cuerpo incorrecto' });
    }
    const newCarrito = {
        id: carrito.length + 1,
        timestamp: Date.now(),
        products: [{
            id: products.length + 1,
            name,
            description,
            price: +price,
            codigo: +codigo,
            stock: +stock,
            image
        }]
    };
    carrito.push(newCarrito);
    fs.writeFileSync('./dataBase/carrito.json', JSON.stringify(carrito, null, 2));
    return res.json(newCarrito.id);
};
const subirProductoId = (req, res) => {
    //incorpora productos al carrito ya creado
    const carritoId = req.params.carritoId;
    const productoId = req.params.productoId;
    const carritoIndex = carrito.findIndex((cart) => cart.id === +carritoId);
    const productIndex = products.findIndex((product) => product.id === +productoId);
    if (carritoIndex && productIndex < 0) return res.status(404).json({ success: false, error: `carrito con id: ${carritoId} no existe` });
    const newProducto = {
        ...carrito[carritoIndex],
        ...products[productIndex],
    };
    carrito.push(newProducto);
    fs.writeFileSync('./dataBase/carrito.json', JSON.stringify(carrito, null, 2));
    return res.json(carrito);
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
    const carritoId = req.params.carritoId;
    const productoId = req.params.productoId;
    const carritoIndex = carrito.findIndex(carrito => carrito.id === +carritoId);
    const productIndex = products.findIndex(products => products.id === +productoId);
    if (productIndex && carritoIndex < 0) return res.status(404).json({ success: false, error: `en el carrito ${carritoId} el id ${productIndex} no existe` });
    let index = carrito.findIndex((carr) => carr.products.id == +productoId);
    carrito.splice(index, 1)
    fs.writeFileSync('./dataBase/carrito.json', JSON.stringify(carrito, null, 2));
    return res.json({ success: true, result: 'producto eliminado' });
};

module.exports = {
    obtenerCarrito,
    agregarCarrito,
    subirProductoId,
    eliminarCarrito,
    eliminaProductosCart,
};