const express = require('express');
const router = express.Router();

const userModel = require('../models/user');

// Get users
router.get('/', async (req, res) => {
  try {
    const user = await userModel.find({});
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

// Get user By id
router.get('/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) return res.status(404).send({ message: 'User not found.' });

    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

// Create User
router.post('/', async (req, res) => {
  try {
    const user = await userModel.create(req.body);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.send({ message: 'Delete user successfully' });
  } catch (error) {
    console.log(error);
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false
    });

    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
