import express from 'express';
import Product from '../models/Product.model.mjs';
import AppResponse from "../responses/AppResponse.mjs";
import CatchAsync from "../exceptions/CatchAsync.mjs";

const route = express.Router();

route.post('/products', CatchAsync(async(req, res, next) => {
    const product = req.body;

    let newProduct = new Product(product);

    await Product.save(newProduct);

    res.status(201).send(AppResponse(201,newProduct))
}))


export default route;