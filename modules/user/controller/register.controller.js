const userModel = require("../../../DB/models/user.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const sendEmail = require('../../../common/sendEmail')
const cloudinaryConfig = require('../../../common/cloudinary')
const cloudinary = require("cloudinary").v2;
cloudinaryConfig()
var fs = require('fs');
var path = require('path');

//api for sign up
const signUp = async (req, res) => {
    try {
        const { email } = req.body;
        const findEmail = await userModel.findOne({ email })
        if (findEmail) {
            res.status(400).json({ message: "thie user is already exist" })
        } else {
            if (req.file) {
                let imageURI = req.file.path;
                const { secure_url, public_id } = await cloudinary.uploader.upload(imageURI);
                req.body.picURL = secure_url
                req.body.publicImageId = public_id
                fs.unlinkSync(imageURI);
            }
            req.body.password = bcrypt.hashSync(req.body.password, parseInt(process.env.SALTROUNDS));
            const addUser = new userModel(req.body);
            await addUser.save();
            var userToken = jwt.sign({ email }, process.env.TOKENKEY, { expiresIn: '120s' });
            var refreshToken = jwt.sign({ email }, process.env.TOKENKEY);
            const confirmedUrl = `<a href=${req.protocol}://${req.headers.host}/confirmedUser/${userToken}>press here to confirmed your email</a>`
            sendEmail(email, confirmedUrl)
            res.status(200).json({ message: 'addedUser', userToken, refreshToken })

        }
    } catch (error) {
        res.status(400).json({ message: "server down", error })
    }
}

//api for sign in
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findEmail = await userModel.findOne({ email })
        if (findEmail) {
            if (findEmail.confirmed) {
                const hashPassword = await bcrypt.compare(password, findEmail.password);
                if (hashPassword) {
                    var token = jwt.sign({ id: findEmail._id }, process.env.TOKENKEY);
                    res.status(200).json({ message: 'you are login now', userToken: token })
                } else {
                    res.status(400).json({ message: 'you password is wrong' })
                }
            } else {
                var userToken = jwt.sign({ email: findEmail.email }, process.env.TOKENKEY, { expiresIn: '120s' });
                const confirmedUrl = `<a href=${req.protocol}://${req.headers.host}/confirmedUser/${userToken}>press here to confirmed your email</a>`
                sendEmail(email, confirmedUrl)
                res.status(400).json({ message: 'we send an email to you to confirm your email' })
            }
        } else {
            res.status(400).json({ message: "this email is not rigester" })
        }
    } catch (error) {
        res.status(400).json({ message: "server down", error })
    }
}

//api for insert image or update
const updatedImage = async (req, res) => {
    try {
        if (req.validationErrorImge) {
            res.json({ message: "the image type must be jpeg or png" })
        }
    
        if (req.file) {
            const { userId } = req.params
            let imageURI = req.file.path;
            const { secure_url, public_id } = await cloudinary.uploader.upload(imageURI);
            fs.unlinkSync(imageURI);
            const founded = await userModel.findById({ _id: userId })
            if (!founded) {
                res.status(400).json("invalid user name");
            } else {
    
                if (!founded.publicImageId) {
                    founded.picURL = secure_url
                    founded.publicImageId = public_id
                    const updatedBe = await founded.save()
                    res.status(200).json({ message: "updated", updatedBe });
                } else {
                    await cloudinary.uploader.destroy(founded.publicImageId)
                    founded.picURL = secure_url
                    founded.publicImageId = public_id
                    const updatedAf = await founded.save()
                    res.json({ message: 'updated image', updatedAf });
                }
            }
        } else {
            res.status(400).send("Please upload a valid image");
        }
        
    } catch (error) {
        res.status(400).json({ message: "server down", error })

    }
    
}


module.exports = { signUp, signIn, updatedImage }