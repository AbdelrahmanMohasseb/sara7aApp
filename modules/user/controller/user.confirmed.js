var jwt = require('jsonwebtoken');
const userModel = require("../../../DB/models/user.model");


//api for confirm email
const confirmed = async (req, res) => {
    const { userToken } = req.params
    jwt.verify(userToken, process.env.TOKENKEY, async function (err, decode) {
        if (decode) {
            const { email } = decode.email
            const findUser = await userModel.findOne(email)
            if (findUser) {
                if (findUser.confirmed) {
                    res.status(400).json({ message: 'this user is already confirmed' })
                } else {
                    findUser.confirmed = true;
                    const updatedUser = await findUser.save()
                    res.json({ message: 'user is confirmed', updatedUser })
                }
            } else {
                res.status(400).json({ message: 'this user is not rigester' })
            }
        } else {
            res.status(400).json({ message: err.message })
        }
    });
}

module.exports = confirmed