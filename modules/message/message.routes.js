const messageRouter = require('express').Router();
const {addMessage, getUserMessage} = require('./controller/message.controller')
const auth = require('../../middleware/auth')
// api for add messages 
messageRouter.post('/addMessage/:createdToId',auth(),addMessage)
// api for get all messages 
messageRouter.get('/getUserMessage',auth(),getUserMessage)


module.exports = messageRouter

