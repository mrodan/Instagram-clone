import cloudinary from 'cloudinary'
import config from '../config/config.js';

cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.API_key,
    api_secret: config.cloudinary.API_secret
});

export default cloudinary;