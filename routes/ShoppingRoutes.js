import express from "express";
import Cart from "../models/cartItems.js";
import Products from "../models/productsSchema.js";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let product = await Products.find({});
    return res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
router.get("/id/:id", async (req, res) => {
  try {
    let product = await Products.findOne({ _id: req.params.id });
    res.status(200).send(product);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
router.post("/newProduct", async (req, res) => {
  try {
    let newProduct = await new Products({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
    }).save();
    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
router.put("/edit/:id", async (req, res) => {
  try {
    let productToEdit = await Products.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          image: req.body.image,
        },
      }
    );
    res.status(201).send({ message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
router.delete("/remove/:id", async (req, res) => {
  try {
    let productToDelete = await Products.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!productToDelete) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(201).send({ message: "SuccessFully Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.post("/addToCart", async (req, res) => {
  try {
    let cartItem = await new Cart({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
    }).save();
    let removeFromStore = await Products.findByIdAndDelete({_id:req.body._id});
    res.status(200).send({message:"Product Added To Cart!"});
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
router.get("/cartItems",async(req,res)=>{
    try {
        let cartItems = await Cart.find({});
        res.status(200).send(cartItems);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})
router.post("/removeFromCart",async(req,res)=>{
    try {
        let addToStore = await new Products({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
        }).save();
        let removeFromCart = await Cart.findByIdAndDelete({_id:req.body._id});
        res.status(201).send({message:"Successfully removed from cart"});
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});
router.put("/purchase",async(req,res)=>{
    try {
        let user = await User.findOne({gmail:req.body.gmail});
        let newPurchase ={
            product_name:req.body.product_name,
            date:currentTime()
        }
    
        let purchase = await User.findOneAndUpdate({gmail:req.body.gmail},
            {purchaseHistory:[].concat(newPurchase,user.purchaseHistory),address:{
              fullName:req.body.fullName,
              contact:req.body.contact,
              address1:req.body.address1,
              address2:req.body.address2,
              city:req.body.city,
              state:req.body.state,
              country:req.body.country,
              pinCode:req.body.pinCode
            }});
        let deleteCart = await Cart.deleteMany({});
        res.status(200).send(purchase);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})

router.get("/address/:gmail",async(req,res)=>{
  try {
    let address = await User.findOne({gmail:req.params.gmail});
    res.status(200).send(address.address);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
})
function currentTime() {
    var isoDateString = new Date().toISOString();
    return isoDateString;
  }
export const ShoppingRoutes = router;
