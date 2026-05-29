const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {admin} = require('../middleware/adminMiddleware');
const {createdOrder, verifyPayment} = require('../controllers/paymentController'); 
router.post('/',createdOrder);
router.post('/verify',verifyPayment);

module.exports = router;