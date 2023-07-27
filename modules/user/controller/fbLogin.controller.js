const userModel = require('../../../DB/models/user.model')
const jwt = require("jsonwebtoken")

//api for facebook sign up
const fbSignUp = async (req, res) => {
    try {
        const { facebookId } = req.body;
        const founded = await userModel.findOne({ facebookId })
        console.log(founded);
        if (!founded) {
            req.body.confirmed=true
            const faceLogin = new userModel(req.body)
            const addedUser = await faceLogin.save()
            res.status(201).json({ message: "added user ", addedUser })
        } else {
            res.status(400).json({ message: "user already register " })
        }
    } catch (error) {
        res.status(400).json({ message: "server down" , error})
    }
}

//api for facebook login
const fbLogin = async (req, res) => {
    try {
        const { facebookId } = req.body;
        const founded = await userModel.findOne({facebookId})
        if (!founded) {
            res.status(400).json({ message: "register first" })
        } else {
            const token = jwt.sign({ id: founded._id, userName: founded.userName, picURL: founded.picURL }, process.env.TOKENKEY);
            res.status(200).json({ message: "added user ", token })
        }
    } catch (error) {
        res.status(400).json({ message: "server down" , error})
    }
}

module.exports = { fbSignUp, fbLogin }