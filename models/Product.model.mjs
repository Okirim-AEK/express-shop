import mongoose from "mongoose";
import slugify from "slugify";
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
    slug: {
        type: String
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
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref:'categories'
    },
    createdAt: {
        type: Date,
        default:Date.now()
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
   })
//virtual field

productSchema.virtual('id').get(function () {
    return  this._id
})
productSchema.virtual('createdAtHumanReadable').get(function () {
    const date = new Date(this.createdAt);
    return date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();//prints expected format.
})
productSchema.pre('save', function (next) {
    this.slug = slugify(this.title,'-')
    next();
})
//pre
productSchema.pre(/^find/, function (next) {
    this.populate({
        path: "category",
        select:"name"
    })
    next()
})
//post


const Product = mongoose.model('products', productSchema);

export default Product;