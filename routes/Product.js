const router = require("express").Router();
const Product = require("../models/Product"); // Product model

const response = require("../utils/ResponseHandlers"); // response handler

// add a new product

router.post('/add', async(req,res)=>{
      try{
            const {producttitle,price,description,category,image,userId} = req.body;
            if(!producttitle || !price || !description || !category || !image || !userId){
                  response(res, 400, "All fields are required", null);
            }

            const product = new Product({
                  name:req.body.name,
                  price:req.body.price,
                  description:req.body.description,
                  category:req.body.category,
                  image:req.body.image,
                  userId:req.body.userId
            });
            const savedProduct = await product.save();
            response(res, 200, "Product Added successfully", savedProduct);
      }catch(err){
            response(res, 500, err.message, null);
      }
});

// get all products
router.get('/all', async(req,res)=>{
      try{
            const products = await Product.find({isAvailable:true});
            response(res, 200, "All products", products);
      }catch(err){
            response(res, 500, err.message, null);
      }
});

// get product by productId
router.get('/productId/:id', async(req,res)=>{
      try{
            const productId = req.params.id;
            const product = await Product.findById({_id:productId});
            response(res, 200, "Product Fetched!!!", product);
      }catch(err){
            response(res, 500, err.message, null);
      }
});

// get product by userId
router.get('/userId/:id', async(req,res)=>{
      try{
            const userId = req.params.id;
            const product = await Product.find({userId:userId});
            response(res, 200, "Product", product);
      }catch(err){
            response(res, 500, err.message, null);
      }
});


// update product by productId
router.put('/update/:id', async(req,res)=>{
      try{
            const productId = req.params.id;
            const product = await Product.findByIdAndUpdate
            ({_id:productId},{
                  producttitle:req.body.producttitle,
                  price:req.body.price,
                  description:req.body.description,
                  category:req.body.category,
                  image:req.body.image
            });
            response(res, 200, "Product updated successfully", product);
      }catch(err){
            response(res, 500, err.message, null);
      }
});

// update product availability by productId
router.put('/availability/:id', async(req,res)=>{
      try{
            const productId = req.params.id;
            const product = await Product.findByIdAndUpdate({_id:productId},{isAvailable:req.body.isAvailable});
            response(res, 200, "Product Availability Updated Successfully", product);
      }catch(error){
            response(res, 500, error.message, null);
      }
});
// delete product by productId
router.delete('/delete/:id', async(req,res)=>{
      try{
            const productId = req.params.id
            const product = await Product.findByIdAndDelete({_id:productId});
            response(res, 200, "Product Deleted Successfully!!!", product);

      }catch(error){
            response(res, 500, error.message, null);
      }
});



module.exports = router;