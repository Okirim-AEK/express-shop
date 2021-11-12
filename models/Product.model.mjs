import mongoose from "mongoose";
//String
//Array
//Number
//Boolean
//GeoJson
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required:[true,'title field is required']
    },
    description: {
       type: String,
        required: [true, 'description field is required'],    
    },
    image: {
       type: String,
        required: [true, 'image field is required'],   
    },
    price: {
        type: Number,
        required:[true,'price field is required']
    }
})

const Product = mongoose.model('products', productSchema);

export default Product;