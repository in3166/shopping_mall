const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
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


module.exports = router;
