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
        type:String,
        required:true,
    },
    image:{
        type:String,
    }
})
const Products = mongoose.model("product",productsSchema);
export default Products;