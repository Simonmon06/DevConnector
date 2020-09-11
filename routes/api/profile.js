//profiles fetching, adding, updating etc.

const express = require('express');
const router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public no need token
router.get('/',(req,res)=>res.send('Profile route'));


module.exports = router;