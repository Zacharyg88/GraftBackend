const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

//Routes
router.get('/users/:id', UserController.getUserById)
router.get('/users/', UserController.emailIsTaken)
router.post('/users', UserController.createUser)