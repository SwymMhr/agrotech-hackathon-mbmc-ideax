const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
      producttitle:{
            type:String,
            require:true,
            min:3
      },
      price:{
            type:Number,
            require:true,
      },
      description:{
            type:String,
            required:true,
      },
      category:{
            type:String,
            required:true
      },
      image:{
            type:String,
            required:true
      },
      userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      isAvailable:{
            type:Boolean,
            default:true,
            required:true
      }
},{
      timestamps:true
});


module.exports = mongoose.model('Product',ProductSchema)