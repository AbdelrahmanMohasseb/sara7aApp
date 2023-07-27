const messageModel = require('../../../DB/models/message.model');
const userModel = require('../../../DB/models/user.model')

// api for add messages 
const addMessage = async (req, res) =>{
    try {
        const { createdToId } = req.params;
    const foundedUser = await userModel.findById(createdToId)
    if(foundedUser){
        req.body.createdBy = req.userData._id
        req.body.createdTo = createdToId
        const addedMessage = new messageModel(req.body);
        const message = await addedMessage.save()
        res.json({message: 'message added' , message})
    }else{
        res.status(400).json({message: 'this user is not defind'})
    }
    } catch (error) {
        res.status(400).json({ message: "server down", error }) 
    }
    
}
// api for get all messages 

const getUserMessage = async (req, res) =>{
    try {
        const userMessage = await messageModel.find({createdTo: req.userData._id}).select('message')
        res.status(400).json({message: userMessage})
        
    } catch (error) {
        res.status(400).json({ message: "server down", error }) 

    }
  

}

module.exports = {addMessage, getUserMessage}