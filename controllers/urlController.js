const validUri= require('valid-url');
const Url= require('../models/url');
/**
 * @desc    This function will be responsible for creating a new short URL.
 *          It will handle the business logic of validating the long URL,
 *          checking for its existence, generating a short code, and saving
 *          it to the database.
 * @route   POST /api/shorten
 * @access  Public
 */

const shortenUrl = async (req, res) => {

    let { longUrl } = req.body;

    if (typeof longUrl !== 'string') {
        return res.status(400).json({
            success: false,
            message: 'longUrl must be a string',
        });
    }

    longUrl = longUrl.trim();
  
    if (!longUrl) {
        return res.status(400).json({ success: false, message: 'Please provide a long URL' });
    }

    if (!validUri.isUri(longUrl)) {
        return res.status(400).json({ success: false, error: 'Invalid URL format provided' });
    }

   try{
    let url= await Url.findOne({ longUrl:longUrl });

    if(url){
        return res.status(200).json({success:true, data:url});
    }

    const nanoid= await import('nanoid');
    const urlCode= nanoid.nanoid(4);
    const shortUrl= `${process.env.BASE_URL}/${urlCode}`;

     url =await Url.create({
        longUrl,
        shortUrl,
        urlCode,
     });
     res.status(201).json({ success: true, data: url });
   }catch(error){
    console.error('Database Error:', error);
    res.status(500).json({ success: false, error: 'Server error' });
   }
};



module.exports= {
    shortenUrl,
};