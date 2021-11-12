import express from 'express';

import { createProduct,getProducts } from '../controllers/products.controller.mjs';

const route = express.Router();

route.post('/products', createProduct)
route.get('/products', getProducts)


export default route;