const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures")

// Product creation started from here
exports.createProduct = catchAsyncError(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// GETTING ALL PRODUCTS
exports.getAllProducts = catchAsyncError(async (req, res) => {

  const apiFeature = new ApiFeatures(Product.find() , req.query);
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// UPDATE PRODUCT DETAILS BY ADMIN
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(202).json({
    success: true,
    product,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product Not found",
    });
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted succesfully",
  });
});

// Get product Details

exports.getProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not exits", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
