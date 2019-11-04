const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../auth/check-auth');

const controllerProducts = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error("Unexcepted file format: " + file.mimetype));
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/', controllerProducts.get_products);

router.get('/:productId', controllerProducts.get_product);

router.post('/', checkAuth, upload.single('productImage'), controllerProducts.create_product);

router.patch('/:productId', checkAuth, controllerProducts.update_product);

router.delete('/:productId', checkAuth, controllerProducts.delete_product);

module.exports = router;
