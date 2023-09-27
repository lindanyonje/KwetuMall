import express from 'express';
import multer from 'multer';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';

const router = express.Router();

const upload = multer({dest: 'uploads'});
const uploadProductImage = upload.fields([
  {name: 'image', maxcount: 1}
])

//getting all products
router.get('/products', getProducts);
// getting one product
router.get('/products/:id', getProduct);
//creating one product
router.post('/products/create',uploadProductImage, createProduct);
//updating product
router.post('/products/update/:id',uploadProductImage, updateProduct);
// deleting product
router.post('/products/delete/:id', deleteProduct);

export default router;
