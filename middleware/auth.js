const jwt = require('jsonwebtoken');
const userModel = require('../DB/models/user.model')
// authrization func to check if user is registered or not 
const auth = () => {
    return async (req, res, next) => {
        try {
            const { authrization } = req.headers;
            if (authrization) {
                if (authrization.startsWith(process.env.SECRETKEYTOKEN)) {
                    const userToken = authrization.split(process.env.SECRETKEYTOKEN)[1]
                    const { id } = jwt.verify(userToken, process.env.TOKENKEY)
                    const userFounded = await userModel.findById(id)
                    if (userFounded) {
                        if (userFounded.confirmed) {
                            req.userData = userFounded
                            next()
                        } else {
                            res.status(400).json({ message: 'this email is not confirmed' })
                        }
                    } else {
                        res.status(400).json({ message: 'this email is not rigester' })
                    }
                } else {
                    res.status(400).json({ message: 'secret key is wrong' })
                }
            } else {
                res.status(400).json({ message: 'token is not found' })
            }
        } catch (error) {
            res.status(400).json({ message: "server down", error })
        }
    }
}

module.exports = auth