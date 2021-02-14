const express = require('express');
const router = express.Router();

// Controllers
const ItemsController = require('./ItemController');

// Authorization
const verifyToken = require('../Middlewares/verifyToken');

router.get('/', ItemsController.getItems);
router.get('/:id', ItemsController.getItem);
router.post('/', verifyToken, ItemsController.createItem);
router.delete('/:id', verifyToken, ItemsController.deleteItem);
router.patch('/:id', verifyToken, ItemsController.updateItem);


module.exports = router;
