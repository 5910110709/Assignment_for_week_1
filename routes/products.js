const express = require('express');
const router = express.Router();

// Models
const productModel = require('../models/product');

// Get products

router.get('/', async (req, res) => {
  try {
    const products = await productModel.find({});
    res.send(products);
  } catch (error) {
    console.log(error);
  }
});
// Get products By Id
router.get('/:id', async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) return res.status(404).send({ message: 'Product not found' });

    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

// Create products
router.post('/', async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

// Update products
router.put('/:id', async (req, res) => {
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

// Delete products
router.delete('/:id', async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
