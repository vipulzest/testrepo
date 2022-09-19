const express = require('express');
const router = express.Router();
const authorize = require('_middleware/authorize');
const multer = require('multer');
const userService = require('./user.service');
const userValidation = require('./users.validation')
const userController = require('./users.controller')
const Role = require('_helpers/role');
const moment = require('moment');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
        // cb(null, file.originalname)
    }
})

// routes
router.post('/authenticate', userValidation.authenticateSchema, userController.authenticate);
router.post('/refresh-token', userController.refreshToken);
router.post('/revoke-token', authorize(), userValidation.revokeTokenSchema, userController.revokeToken);
router.post('/register', userValidation.registerSchema, userController.register);
router.post('/check_username', userValidation.checkUsernameSchema, userController.checkUsername);
router.post('/verify-email', userValidation.verifyEmailSchema, userController.verifyEmail);
router.post('/forgot-password', userValidation.forgotPasswordSchema, userController.forgotPassword);
router.post('/validate-reset-token', userValidation.validateResetTokenSchema, userController.validateResetToken);
router.post('/reset-password', userValidation.resetPasswordSchema, userController.resetPassword);
router.get('/', authorize(Role.Admin), userController.getAll);
router.get('/get_terms_condition', userController.get_terms_condition);
router.get('/:id', authorize(), userController.getById);
router.post('/', authorize(Role.Admin), userValidation.createSchema, userController.create);
router.put('/:id', authorize(), userValidation.updateSchema, userController.update);
router.delete('/:id', authorize(), userController._delete);
router.post('/upload', multer({ storage }).single('file'), async (req, res, next) => {
    // This needs to be done elsewhere. For this example we do it here.
    const filePath = `${req.file.destination}/${req.file.filename}`
    const payload = {
        file_name: req.file.filename,
        upload_date: moment().format('YYYY-MM-DD HH:MM:SS'),
        slug: filePath,
        user_id: req.body.user_id
    }
    userService.upload_file(payload)
        .then((fileId) => {
            res.json({ fileId: fileId, message: 'Document uploaded successfully' })
        })
        .catch(next);

})


module.exports = router;
