require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = (req, res) => {
  const fileStr = req.body.data;
  cloudinary.uploader.upload(fileStr, {
    upload_preset: 'ml_default',
  })
    .then((img) => {
      res.status(200).send(img);
    })
    .catch((err) => { console.log(err); });
};

module.exports = { upload };
