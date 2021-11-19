import Product from '../models/Product.model.mjs';
import AppResponse from "../responses/AppResponse.mjs";
import CatchAsync from "../exceptions/CatchAsync.mjs";
import AppError from "../exceptions/AppError.mjs";
import validator from 'validator';
export const getProducts = CatchAsync(async (req, res, next) => {
    //body=>req.body
    //params=>req.params
    //query=>req.query
     
    //get all query params
    const { sort, page, select, limit } = req.query;
      //1.selected fields
    let selectedFields = '';
    if (select) {
        //price,description,...=> price description
       selectedFields= select.split(',').join(' ');
    }
    //sorted fields
    let sortedBy = '';
    if (sort) {
        sortedBy=sort.split(',').join(' ');
    }

    //filer
    ///products?select=title,price&page=6&price[lte]=3000&sort=-price
    //res: price[lte]=300

    const excludedFields = ['sort', 'page', 'select', 'limit'];
    const reqQueryObj={...req.query}
    excludedFields.forEach(el => delete reqQueryObj[el]);//price[lte]=3000
    const filterStr = JSON.stringify(reqQueryObj).replace(/\b(lt|gt|lte|gte)\b/, (el => '$' + el));//price[$lte]=3000
    const filterObj=JSON.parse(filterStr)
    //pagination 
    if (page) {
        if(!validator.isInt(page)){
              next(new AppError('page field should be a number',400))
        }
    }
     if (limit) {
        if(!validator.isInt(limit)){
              next(new AppError('limit field should be a number',400))
        }
    }
    let take = 100
    let pageNumber = 1;
    if (limit) {
         take = limit;
    }
    if (page) {
        pageNumber = page;
    }
  
    const skip =( pageNumber - 1) * take;
      
    const products = await Product.find(filterObj)
        .select(selectedFields)
        .sort(sortedBy)
        .skip(skip)
        .limit(take)
        // .populate({
        //     path: 'category',
        //     select:'name'
        // })
    res.status(200).send(AppResponse(200,products))
 })


export const createProduct = CatchAsync(async (req, res, next) => {
    const product = req.body;

    let newProduct = new Product(product);

    await newProduct.save();

    res.status(201).send(AppResponse(201,newProduct))
})