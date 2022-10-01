import { Router } from 'express';
import multer from 'multer';
import ProductsController from './database/controller/productsController';
import ProductService from './database/service/productService';

const service = new ProductService();
const controller = new ProductsController(service);
const multerConfig = multer();

const router = Router();

router.post('/products', multerConfig.single('file'), controller.create);

export { router };
