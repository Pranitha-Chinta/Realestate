
const express = require('express');
const router = express.Router();
const userController = require('./user');
const propertyController = require('./property');
const authMiddleware = require('./user');

// User routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Property routes
router.post('/properties', authMiddleware, propertyController.createProperty);
router.get('/properties', propertyController.getProperties);
router.get('/properties/mine', authMiddleware, propertyController.getSellerProperties);
router.put('/properties/:id', authMiddleware, propertyController.updateProperty);
router.delete('/properties/:id', authMiddleware, propertyController.deleteProperty);
router.post('/properties/:id/interest', authMiddleware, propertyController.markInterest);

module.exports = router;

