import express from 'express';
import ProductManager from '../dao/managersDB/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

// Obtener todos los productos paginados y filtrados
router.get('/', async (req, res) => {
    const { limit, page, sort, category, availability, query } = req.query;

    const products = await productManager.getProducts(limit, page, sort, category, availability, query);
    
    res.send({
        status: "success",
        products: products
    });
   
});

// Obtener un producto por ID
router.get('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const result = await productManager.getProductByID(productId);
    res.json(result);
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { title, description, price, code, stock, category, thumbnail } = req.body;
    const result = await productManager.createProduct(title, description, price, code, stock, category, thumbnail);
    res.json(result);
});

// Eliminar un producto por ID
router.delete('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const result = await productManager.deleteProductByID(productId);
    res.json(result);
});

// Actualizar un producto por ID
router.put('/:pid', async (req, res) => {
    const productId = req.params.pid;
    const updatedProductData = req.body;
    const result = await productManager.upgradeProduct({ id: productId, ...updatedProductData });
    res.json(result);
});

export default router;



export { router as ProductRouter }