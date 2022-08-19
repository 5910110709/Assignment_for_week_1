const express = require('express');
const router = express.Router();

// Model

const orderModel = require('../models/order');
const productModel = require('../models/product');

// Get orders
router.get('/', async (req, res) => {
  try {

    const orders = await orderModel.aggregate([
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'products'
        }
      }
    ]);

    res.send(orders);
  } catch (error) {
    console.log(error);
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    const order = await orderModel.create({
      ...req.body,
      total: req.body.products.length
    });

    // update quantity of  products

    let updateQuery = [];
    req.body.products.forEach((id) => {
      updateQuery.push(
        productModel.findByIdAndUpdate(id, { $inc: { quantity: -1 } })
      );
    });

    await Promise.all(updateQuery);

    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

// Get order by id
router.get('/:id', async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (!order) return res.status(404).send('Order not found');

    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

// Update order
router.get('/:id', async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.params.id, req.body);
    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

// Delete order
router.get('/:id', async (req, res) => {
  try {
    await orderModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
