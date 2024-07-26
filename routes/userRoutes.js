const express = require('express');
const { getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = new express.Router();

router.get('/', auth('manager'), getAllUsers);
router.put('/:id', auth('manager'), updateUser);
router.delete('/:id', auth('manager'), deleteUser);

module.exports = router;
