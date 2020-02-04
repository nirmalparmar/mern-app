const express = require('express');
const router = express.Router({mergeParams:true});
const {createMessage, getMessage, getAllMessage, deleteMessage, getMessagesofUser} = require('../handler/message');
const {loginRequired, ensureCorrectUser} = require('../middleware/auth');

//POST- /api/user/:id/message
router.route('/:id/message').post(loginRequired, ensureCorrectUser, createMessage);

// GET- api/message/:message_id
// DELETE- api/message/:message_id
router.route('/:message_id')
.get(getMessage)
.delete(deleteMessage);

//GET- api/all/messages
router.route('/all/messages').get(getAllMessage);

//GET- api/user/:id/messages
router.route('/:id/messages').get(getMessagesofUser);
module.exports = router;