import mongoose from "mongoose";

const productsSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
    }
})
const Products = mongoose.model("product",productsSchema);
export default Products;