const express = require('express');
const router = express.Router();
const todoService = require('../Services/todo-service');

router.get('/', async (req, res) => {
  try {
    const result = await todoService.getAll();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await todoService.getById(id);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  if (!req.body) {
    return res.status(400).send('content can not be empty');
  }
  if (!req.body.name) {
    return res.status(400).send('name is required');
  }
  if (req.body.complete === undefined || req.body.complete === null) {
    return res.status(400).send('complete is required');
  }
  try {
    const result = await todoService.add(req.body);
    res
      .status(203)
      .json({ message: `post successful. guid is ${result.insertId}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  if (!req.body) {
    return res.status(400).send('content can not be empty');
  }
  console.log(req.params.id, req.body.id);
  if (req.params.id !== req.body.id) {
    return res.status(400).send('ids are not equal');
  }
  if (!req.body.name) {
    return res.status(400).send('name is required');
  }
  if (req.body.complete === undefined || req.body.complete === null) {
    return res.status(400).send('complete is required');
  }
  try {
    const result = await todoService.update(req.body);
    res.json({ message: 'update succesful' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await todoService.remove(id);
    res.json({ message: 'delete successful' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
