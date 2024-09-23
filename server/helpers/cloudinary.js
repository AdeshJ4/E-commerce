const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dytygoezb',
  api_key: '231659229484471',
  api_secret: 'nwEd0Q2gYQWuL3IAL7PKM4D7jhA'
}) 


const storage = new multer.memoryStorage();


async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto'
  });

  return result;
}


const upload = multer({storage});

module.exports = {upload, imageUploadUtil}