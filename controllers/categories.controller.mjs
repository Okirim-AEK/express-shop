import Category from "../models/Category.model.mjs";
import CatchAsync from "../exceptions/CatchAsync.mjs";
import AppResponse from "../responses/AppResponse.mjs";

export const createCategory=CatchAsync(async (req, res,next) => {
        //req.body={name:'Tennis'}
    const name = req.body;
    const category = new Category(name);
    //save category into database
    await category.save();
    //send a response
    res.status(201).send({
        data:category
    })
})

export const getCategories = CatchAsync(async (req, res, next) => {
    // get all categories from database
    const categories = await Category.find().populate('products');
    //send response
    res.status(200).send({
        data: categories
    })
})

export const getCategory = CatchAsync(async (req, res, next)=>{
    //{req.params={name:'Tennis'}}
    const { name } = req.params;

    const category = await Category.findOne({ name }).select('name -_id');
   
    res.status(200).send(AppResponse(200,category))

})
export const removeCategory = CatchAsync(async (req, res, next)=>{
    //{req.params:{id:'dsadasdas'}}
   res.status(204).send(AppResponse(204))
})

export const updateCategory = CatchAsync(async (req, res, next) => {
     //{req.params={id:'2323dsd343'}}
    const { id } = req.params;
    
    const category = await Category.findByIdAndUpdate(id, { ...req.body }, { new: true });
    
    res.status(202).send(AppResponse(202,category))
})
