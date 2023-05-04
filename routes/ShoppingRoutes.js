import express from 'express';
import Products from '../models/productsSchema.js';

const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        let products = await Products.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
});

router.post("/newProduct",async(req,res)=>{
    try {
        let newProduct = await new Products({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:req.body.image
        }).save();
        res.status(200).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    } 
})
router.delete("/remove/:id",async(req,res)=>{
    try {
        let productToDelete = await Products.findByIdAndDelete({_id:req.params.id});
        if(!productToDelete){
           return res.status(404).send("Product not found")
        }
        res.status(201).json(productToDelete);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})
export const ShoppingRoutes = router;