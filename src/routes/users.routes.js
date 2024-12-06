const express = require('express');
const passport = require('passport');
// const { sendOTP, verifyOTP } = require('../../services/otpSender');
const { userController } = require('../controller/controller_index');
const validate = require('../middleware/validate');
const { userValidation } = require('../validation/validation_index');
const router = express.Router();
const upload = require('../services/upload');

// {
//     "_id": 50,
//     "name": "Devin",
//     "address": "Surat",
//     "mobile_no": "1234567890",
//     "email": "test@gmail.com",
//     "password": "test@123",
//     "role": "user"
// }
router.post('/register',
    upload.single('avatar'),
    // upload.array('photos', 12),
    validate(userValidation.registerUser),
    userController.register
);

router.post('/login',
    userController.login
);

// router.post(
//     '/sendOTP',
//     sendOTP,
//     (req, res, next) => {
//         res.status(200).json({
//             message: 'OTP Send In Your Mobile Number'
//         })
//     }
// );

// router.post(
//     '/verifyOTP',
//     verifyOTP,
//     (req, res, next) => {
//         res.status(200).json({
//             message: 'OTP Verification Successfully'
//         })
//     }
// );

router.post('/generate-new-tokens',
    userController.generateNewTokens
);

router.get('/logout',
    userController.logout
);

router.get('/google',
    passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // console.log(req.session);
        // console.log(req.isAuthenticated());
        res.redirect('http://localhost:3000/api/v1/category/list-category');
    }
);

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: 'http://localhost:3000/api/v1/category/list-category', failureRedirect: '/login' }),
    //   function(req, res) {
    //     // Successful authentication, redirect home.
    //     res.redirect('http://localhost:3000/api/v1/category/list-category');
    //   }
);


router.get('/list-user',
    userController.listUser
);

router.get('/get-user/:userId',
    userController.getUser
);

router.put('/update-user/:userId',
    validate(userValidation.updateUser),
    userController.updateUser
);

router.delete('/delete-user/:userId',
    validate(userValidation.updateUser),
    userController.deleteUser
);

router.get('/search',
    userController.search
);

router.get('/order/:userId',
    userController.order
);

router.get('/review/:userId',
    userController.review
);

router.get('/deactivate',
    userController.deactivate
);

module.exports = router;