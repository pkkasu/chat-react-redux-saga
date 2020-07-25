const { MessageRepository } = require('../repositories/messageRepository');

class MessageService {
    search(search) {
        const item = MessageRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }
    createMessage(message) {
        return MessageRepository.create(message)
    }
    getAllMessages() {
        const items = MessageRepository.getAll()
        if (items.length === 0) {
            return null
        }
        return items
    }

    deleteMessage(id) {
        const item = this.search({id})
        if (!item) {
            return null
        }
        return MessageRepository.delete(id)
    }

    updateMessage(id, message) {
        const item = this.search({id})
        if (!item) {
            return null
        }
        return MessageRepository.update(id, message)
    }
}

module.exports = new MessageService();