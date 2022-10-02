const mongoose = require('mongoose');
const productsModel= new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: String,
      ref: 'Category',
      required: true,
    },
    quantity: {
      type: Number,
    },
    
    photo: {
      data: Buffer,
      contentType: String,
    },
    stars:{
      type: [Number]
    },
    lat:{
      type:Number
    },
    lng:{
      type:Number
    },
    one:{
      type:Number
    },
    two:{
      type:Number
    },
    three:{
      type:Number
    },
    four:{
      type:Number
    },
    five:{
      type:Number
    }
   
  },
  { timestamps: true }
);

module.exports = mongoose.model('product', productsModel);
