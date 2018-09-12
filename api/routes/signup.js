const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signup_controller');
const checkAuth = require('../middleware/auth');

//Posting Data To The DataBase------------------------------------------------------>
router.post('/', signupController.post);

//Getting All Data From The DataBase------------------------------------------------>
router.get('/', checkAuth, signupController.get_all);

//Getting The Unique Data From The DataBase------------------------------------------>
router.get('/:id', checkAuth, signupController.get_unique);

//Deleting Some Data From The DataBase----------------------------------------------->
router.delete('/:id', signupController.delete);

//Updating The Data On The DataBase-------------------------------------------------->
router.patch('/:id', signupController.patch);



module.exports = router;