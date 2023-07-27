const mongoose = require('mongoose') 
// message schema 
const messageSchema = new mongoose.Schema({
    message:{
        type:String,
        requierd:[true, 'the message is required']
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'user',
        requierd:[true, 'createdBy is required']
    },
    createdTo:{
        type: mongoose.Types.ObjectId,
        ref:'user',
        requierd:[true, 'createdTo is required']
    }
})

const messageModel = mongoose.model('message', messageSchema)

module.exports = messageModel