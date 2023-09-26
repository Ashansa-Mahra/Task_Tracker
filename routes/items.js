const express = require('express');
const router = express.Router();
const ItemModel = require('../models/item');

const itemModel = new ItemModel();

router.post('/items', async (req, res) => {
  const { name, status, description } = req.body;
  try {
    const newItem = await itemModel.createItem(name, status, description);
    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating item');
  }
});

router.get('/items', async (req, res) => {
  try {
    const items = await itemModel.getAllItems();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching items');
  }
});

router.get('/', async (req, res) => {
    try {
      const { status, startDate, endDate } = req.query;
      const metrics = await itemModel.getAllTaskMatricItems(status, startDate, endDate);
      res.json(metrics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

router.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, status, description } = req.body;
  try {
    const updatedItem = await itemModel.updateItem(id, name, status, description);
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating item');
  }
});

router.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await itemModel.deleteItem(id);
    res.send('Item deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting item');
  }
});

module.exports = router;
