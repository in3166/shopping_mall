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
    let term = req.body.searchTerm;

    let findArgs = {};
    for (let key in req.body.filters) {
        // key: continents or price
        if (req.body.filters[key].length > 0) {

            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0], // greater than equal 크거나 같고
                    $lte: req.body.filters[key][1] // less than equal
                }
            } else {
                findArgs[key] = req.body.filters[key];
                //console.log(req.body.filters[key])
                // console.log(findArgs) //continents: [2]
            }
        }
    }

    if (term) {
        Product.find(findArgs)
            .find({ $text: { $search: term } }) // docs.mongodb.com/muanual/reference/operator/query/text
            .populate('writer')
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) {
                    return res.status(400).json({ success: false, err })
                }
                // console.log(productInfo.length)
                res.status(200).json({ success: true, productInfo, postSize: productInfo.length });
            });
    } else {
        //console.log("skip: ", skip, " / limit: ", limit, " / findArgs: ", findArgs)
        // product collection 모든 정보 가져오기
        Product.find(findArgs)
            .populate('writer')
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) {
                    return res.status(400).json({ success: false, err })
                }
                res.status(200).json({ success: true, productInfo, postSize: productInfo.length });
            });
    }
});

router.get(`/products_by_id`, (req, res) => {
    // productid로 디비에서 정보 가져오기
    // 쿼리로 가져오기
    let type = req.query.type;
    let productIds = req.query.id;

    if (type === 'array') {
        let ids = req.query.id.split(','); // id=123,345 => ids=[123, 345]
        productIds = ids;
    }

    Product.find({ _id: { $in: productIds } }) // 배열 여러개 넣어줄 때 $in
        .populate('wirter')
        .exec((err, product) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(product);
        })
});

module.exports = router;
