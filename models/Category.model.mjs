import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'category name is required'],
    },
  
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

categorySchema.virtual('products', {
    ref: 'products',
    foreignField: 'category',
    localField:'_id'
})

const Category = mongoose.model('categories', categorySchema)



export default Category;