const express = require('express');
const router= express.Router();
const { redirectToUrl } = require('../controllers/urlController');


/**
 * @route   GET /:code
 * @desc    Redirect to the long/original URL
 * @access  Public
 */

router.get('/:code', redirectToUrl);

    

module.exports=router;