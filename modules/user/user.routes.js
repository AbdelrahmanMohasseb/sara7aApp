const userRouter = require("express").Router();
const {signUp, signIn, updatedImage} = require('./controller/register.controller')
const confirmed = require('./controller/user.confirmed')
const {fbSignUp, fbLogin} = require('./controller/fbLogin.controller')
const valdationHandle = require('../../middleware/validation')
const userSchemaValidation = require('./user.validator')
const upload = require('../../common/handleMulter')

//api for sign up
userRouter.post('/signUp', valdationHandle(userSchemaValidation),upload.single("image"), signUp);
//api for sign in
userRouter.post('/signIn', valdationHandle(userSchemaValidation), signIn);
//api for confirm email
userRouter.get('/confirmedUser/:userToken', confirmed)
//api for facebook sign up
userRouter.post('/fbSignUp', fbSignUp);
//api for facebook login
userRouter.post('/fbLogin', fbLogin);
//api for insert image or update
userRouter.put('/updateImage/:userId', upload.single("image"), updatedImage);




module.exports = userRouter;