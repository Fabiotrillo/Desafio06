import express from 'express';
import {ProductController} from '../controllers/ProductsController.js';

const router = express.Router();



// Obtener todos los productos paginados y filtrados
router.get('/', ProductController.getProducts);

// Obtener un producto por ID
router.get('/:pid', ProductController.getProductById);

// Crear un nuevo producto
router.post('/', ProductController.createProduct );

// Eliminar un producto por ID
router.delete('/:pid',ProductController.deleteProduct);

// Actualizar un producto por ID
router.put('/:pid', ProductController.updateProduct);

export default router;



export { router as ProductRouter }