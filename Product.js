const mongoose = require('mongoose');
require('dotenv').config()
console.log("Value",process.env.USER_NAME)
mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.PASS_WORD}@cluster0.h1s3r.mongodb.net/Main?retryWrites=true&w=majority`, {useNewUrlParser: true,useUnifiedTopology: true});
let Product= new mongoose.Schema({
    Product_name: String,
    Rating:Number,
    Categary:String,
    Description:String,
  },{timestamps:true}
  )
module.exports=mongoose.model('Product', Product)
  