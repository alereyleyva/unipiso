const express = require('express');
const router = express.Router();

// Controllers
const UserController = require('./UserController')

router.get('/', UserController.getUsers);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.route('/:id')
    .get(UserController.getUser)
    .delete(UserController.deleteUser)
    .patch(UserController.updateUser)

module.exports = router;
