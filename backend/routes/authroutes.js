const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getUsers} = require('../controllers/authController');
const {admin} = require('../middleware/adminMiddleware');
const {protect} = require('../middleware/authMiddleware');    

router.post('/register',registerUser);

router.post('/login',loginUser);
router.get('/users',protect,admin,getUsers); 

module.exports = router;