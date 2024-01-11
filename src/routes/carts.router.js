import { Router } from "express";
import CartManager from "../dao/managersDB/CartManager.js";

const router = Router();
const managerCart = new CartManager();

// Obtener todos los carritos
router.get('/', async (req, res) => {
    try {
        const carts = await managerCart.getCarts();
        res.json({
            status: "Success",
            data: carts
        });
    } catch (error) {
        console.error('Error al obtener carritos:', error.message);
        res.status(500).json({
            status: "Error",
            message: 'Error al obtener carritos'
        });
    }
});

// Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const { products, quantity } = req.body;
        
        // Validar que se proporcionen los datos necesarios
        if (!products || !quantity) {
            return res.status(400).json({
                status: 'Error',
                message: 'Faltan datos obligatorios (products y quantity).',
            });
        }

        // Crear un nuevo carrito
        const cart = await managerCart.newCart([{ products, quantity: 1 }]);
        // Respondemos con los detalles del carrito recién creado
        res.status(201).json({
            status: 'Success',
            message: 'Carrito creado exitosamente.',
            cart,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Error',
            message: 'Error interno del servidor.',
        });
    }
});

// Obtener productos de un carrito por ID
router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;

    try {
        const cart = await managerCart.getCartByID(cid);
        res.json({
            status: "Success",
            data: cart
        });
    } catch (error) {
        console.error('Error al obtener productos del carrito:', error.message);
        res.status(500).json({
            status: "Error",
            message: 'Error al obtener productos del carrito'
        });
    }
});

// Agregar producto a un carrito
router.post('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;

    try {
        await managerCart.addProductToCart(cid, pid, quantity);
        res.json({
            status: "Success",
            message: 'Producto agregado a la lista de compras'
        });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error.message);
        res.status(500).json({
            status: "Error",
            message: 'Error al agregar producto al carrito'
        });
    }
});

// Eliminar carrito
router.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;

    try {
        const response = await managerCart.removeAllProductsFromCart(cid);
        res.json(response);
    } catch (error) {
        console.error('Error al eliminar carrito:', error.message);
        res.status(500).json({
            status: "Error",
            message: 'Error al eliminar carrito'
        });
    }
});

// Eliminar producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    try {
        const response = await managerCart.removeProductFromCart(cid, pid);
        res.json(response);
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error.message);
        res.status(500).json({
            status: "Error",
            message: 'Error al eliminar producto del carrito'
        });
    }
});

export { router as CartRouter };