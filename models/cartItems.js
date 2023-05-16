import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
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
const Cart = mongoose.model("cart",cartSchema);
export default Cart;