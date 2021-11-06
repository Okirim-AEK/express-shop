import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required:[true,'category name is required']
    }
})

const Category = mongoose.model('categories', categorySchema)

export default Category;