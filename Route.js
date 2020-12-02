const express = require("express");

const Product = require("./Product");
const { request } = require("express");

var router = express.Router();


var product_data = [];
var count = 1;
// Home page route.
router.get("/", function (req, res, next) {
  Product.find({}).sort({"createdAt":'desc'})
    .then((data) => {
      res.render("index", { contexts: data, updated: false, message: "" });
    })
    .catch((e) => console.log(e));
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
    let data = await Product.find({});
let message = "Plz fill the form";
    if (req.url == "/add") {
      res.render("index", { message: message, contexts: data, updated: false });
    }else{
console.log("This is edit")
console.log("Boy value edit",req.body)
      res.render("index", { message: message, contexts: req.body, updated: true });
    }
  }
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
      console.log(doc.ok);
    })
    .catch((err) => {
      console.error(err);
    });
  res.redirect("/");
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
