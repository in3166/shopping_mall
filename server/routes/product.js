const express = require('express');
const router = express.Router();
const { Product } = require("../models/Product");
const multer = require('multer');
// multer
var storage = multer.diskStorage({
    // 파일이 서버에 저장되는 위치
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    // 저장될 파일명
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})
var upload = multer({ storage: storage }).single('file');
//----------------

router.post("/image", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        res.status(200).json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename });
    })
});

router.post("/", (req, res) => {
    // DB에 넣기
    const product = new Product(req.body);
    product.save(err => {
        if (err) {
            return res.status(400).json({ success: false, err })
        }
        res.status(200).json({ success: true });
    });
});

router.post("/products", (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    // product collection 모든 정보 가져오기
    Product.find()
        .populate('writer')
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if (err) {
                return res.status(400).json({ success: false, err })
            }
            res.status(200).json({ success: true, productInfo, postSize: productInfo.length });
        });
});


module.exports = router;
