const express = require("express");

const Product = require("./Product");
const { request } = require("express");

var router = express.Router();


var product_data = [];
var count = 1;
// Home page route.
router.get("/",async function (req, res, next) {
  let data= await Product.find({}).sort({"createdAt":'desc'})
    ;
      res.render("index", { contexts:trunchvalue(data) , updated: false, message: "" });
   
});




async function validatedata(req, res, next) {
  if (
    req.body.Product_name != "" &&
    req.body.Rating != "" &&
    req.body.Categary != "" &&
    req.body.Description != ""
  ) {
    next();
  } else {
    let data = await Product.find({}).sort({"createdAt":'desc'});
    console.log("Value of data ",data)
    data=trunchvalue(data)
let message = "Please fill all the field ";
    if (req.url == "/add") {
      res.render("index", { message: message, contexts: data, updated: false });
    }else{
console.log("This is edit")
console.log("Boy value edit",req.body)
      res.render("index", { message: message, contexts: req.body, updated: true });
    }
  }
}

function trunchvalue(data){
for( let i=0;i<data.length;i++){
   data[i]['Description']=(data[i].Description.length > 25) ? data[i].Description.substr(0, 25-1) + ' ...' : data[i].Description;
}
return data
}
router.post("/add", validatedata, async function (req, res, next) {
  let product = new Product({
    Product_name: req.body.Product_name,
    Rating: req.body.Rating,
    Categary: req.body.Categary,
    Description: req.body.Description,
  });
  product
    .save()
    .then((doc) => {
      res.redirect("/");
      console.log(doc);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/delete/:id", async function (req, res, next) {
  Product.deleteOne({ _id: req.params.id })
    .then((doc) => {
      console.log(doc);
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
  
});
router.post("/edit/", validatedata, async function (req, res, next) {
  console.log("body key",req.body.id)
  Product.updateOne(
    { _id: req.body.id },
    {
      Product_name: req.body.Product_name,
      Rating: req.body.Rating,
      Categary: req.body.Categary,
      Description: req.body.Description,
    }
  )
    .then((doc) => {
      console.log(doc.ok);
      res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
    });
});

router.get("/edit/:id", function (req, res, next) {
  Product.findById({ _id: req.params.id })
    .then((data) => {
      console.log(data);
      res.render("index", { contexts: data, message: "", updated: true });
    })
    .catch((err) => {
      console.error(err);
    });
});

// About page route.

module.exports = router;
