const userModel = require("../../../DB/models/user.model")
const bcrypt =  require('bcrypt') 

const signUp = async (req, res) => {
    try {
        const { email, password ,userName, picURL } = req.body;
        const findEmail = await userModel.findOne({ email })
        if (findEmail) {
            res.status(400).json({ message: "thie user is already exist" })
        } else {
            const addUser = new userModel({ email, password, userName, picURL });
            const userData = await addUser.save();
            res.status(200).json({ message: 'addedUser', userData })
        }
    } catch (error) {
        res.status(400).json({ message: "server down" })
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findEmail = await userModel.findOne({ email })
        if (findEmail) {
            const hashPassword = await bcrypt.compare(password, findEmail.password); 
            if (hashPassword) {
                res.status(200).json({ message: 'you are login now' })
            } else {
                res.status(400).json({ message: 'you password is wrong' })
            }
        } else {
            res.status(400).json({ message: "this email is not rigester" })
        }
    } catch (error) {
        res.status(400).json({ message: "server down" })
    }
}

module.exports = { signUp, signIn }