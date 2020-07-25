const { Router } = require('express');
const MessageService = require('../services/messageService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createMessageValid, updateMessageValid } = require('../middlewares/message.validation.middleware');

const router = Router();

router.post('/', createMessageValid, (req, res, next) => {
  const data = req.body;
  try {
    const message = MessageService.createMessage(data);
    if (!message) {
      throw ({
        message: "The same message already exist",
        status: 400
      })
    }
    res.data = message
  } catch (err) {
    res.err = err
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/', (req, res, next) => {
  try {
    const messages = MessageService.getAllMessages();
    if (!messages) {
      throw ({
        message: "Nothig was found",
        status: 404
      })
    }
    res.data = messages;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware)

router.get('/:id', (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const message = MessageService.search({
      id
    });
    if (!message) {
      throw ({
        message: "Nothig was found",
        status: 404
      })
    }
    res.data = message;
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware)

router.delete('/:id', (req, res, next) => {
  const {
    id
  } = req.params;
  try {
    const message = MessageService.deleteMessage(id);
    if (!message) {
      throw ({
        message: "Could not delete message",
        status: 404
      })
    }
    res.data = "message was deleted"
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware)

router.put('/:id', updateMessageValid, (req, res, next) => {
  const {
    id
  } = req.params;
  const data = req.body;
  try {
    const message = MessageService.updateMessage(id, data);
    if (!message) {
      throw ({
        message: "message was not updated",
        status: 404
      })
    }
    res.data = message
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware)

module.exports = router;