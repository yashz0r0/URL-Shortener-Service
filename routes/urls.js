const express = require('express');
const router= express.Router();
const auth= require('../middleware/auth');
const { shortenUrl }= require('../controllers/urlController');



/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 * @access  Public
 */

router.post('/shorten', auth,shortenUrl);

module.exports= router;