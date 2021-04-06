const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');

//=================================
//             User
//=================================
// 페이지 이동 시 마다 인증된 사람인지 토큰 인증된 사람이면 사용자 정보를 다시 넣어줌
router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {
    // 해당 user 정보 가져오기
    User.findOne({ _id: req.user._id } // auth 미들웨어 -> 쿠키 속 토큰을 이용하여 유저 정보 가져와서 req.user에 저장
        , (err, userInfo) => {
            // 가져온 정보에서 카트에 넣으려는 상품 존재 여부 확인 (있으면 추가+1, 없으면 1)
            let duplicate = false;
            userInfo.cart.forEach(item => {
                if (item.id === req.body.productId) duplicate = true;
            });
            if (duplicate) {
                // 있을 때
                User.findOneAndUpdate(
                    { // 사람을 찾고 그 사람 정보안의 cart에서 상품정보를 찾음
                        _id: req.user._id,
                        "cart.id": req.body.productId
                    },
                    { $inc: { "cart.$.quantity": 1 } }, // 카트의 수량을 1 올림, $: Cart라는 Array안의 quantity 중에서 업데이트할 요소를 식별
                    { new: true }, // 업데이트된 정보를 받아서 클라이언트에 주기 위해서 옵션 설정   
                    (err, userInfo) => {
                        if (err) return res.status(400).send({ success: false, err })
                        res.status(200).send(userInfo.cart)
                    }
                )
            } else {
                // 없을 때
                // 상픔 정보, 아이디, 개수 1, 날짜 정보
                User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        $push: {
                            cart: {
                                id: req.body.productId,
                                quantity: 1,
                                data: Date.now()
                            }
                        }
                    },
                    { new: true }, // 업데이트된 정보를 받아서 클라이언트에 주기 위해서 옵션 설정   
                    (err, userInfo) => {
                        if (err) return res.status(400).send({ success: false, err })
                        res.status(200).send(userInfo.cart)
                    }
                )
            }
        })
});

router.get("/removeFromCart", auth, (req, res) => {
    // user - userData - cart 에서 해당 상품 지우기, user- cartDetail 다시가져오기
    User.findOneAndUpdate({ _id: req.user._id }, { "$pull": { "cart": { "id": req.query.id } } }, { new: true },
        (err, userInfo) => {
            let cart = userInfo.cart;
            let array = cart.map(item => { return item.id });


            // product collection에서 현재 남아있는 상품 정보 가져오기
            Product.find({ _id: { $in: array } })
                .populate('writer')
                .exec((err, productInfo) => {
                    if (err) return res.json({ success: false, err });
                    return res.status(200).json({ productInfo, cart }); // user의 수량과 product 정보 합쳐야해서 두 개 보냄
                });
        });


});

module.exports = router;
