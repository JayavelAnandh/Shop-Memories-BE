import express from 'express';
import Products from '../models/productsSchema.js';

const router = express.Router();

router.get("/",async(req,res)=>{
    let params = req.params.id
    try {
            let product = await Products.find({});
            return res.status(200).send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});
router.get("/id/:id",async(req,res)=>{
    try {
        let product = await Products.findOne({_id:req.params.id});
        res.status(200).send(product)
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})
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
router.put("/edit/:id",async(req,res)=>{
    try {
        let productToEdit = await Products.findByIdAndUpdate({_id:req.params.id},{$set:{
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:req.body.image
        }});
        res.status(201).send({message:"Updated Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})
router.delete("/remove/:id",async(req,res)=>{
    try {
        let productToDelete = await Products.findByIdAndDelete({_id:req.params.id});
        if(!productToDelete){
           return res.status(404).send({message:"Product not found"});
        }
        res.status(201).send({message:"SuccessFully Removed"});
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})


export const ShoppingRoutes = router;