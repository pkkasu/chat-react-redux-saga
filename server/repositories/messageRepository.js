const { BaseRepository } = require('./baseRepository');

class MessageRepository extends BaseRepository {
    constructor() {
        super('messages');
    }
}

exports.MessageRepository = new MessageRepository();