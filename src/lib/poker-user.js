// funciona com o listeners
// Quando o objeto EventEmitter emite um evento, todas as funções anexadas a esse evento específico são chamadas de forma síncrona. Quaisquer valores retornados pelos ouvintes chamados são ignorados e descartados.
const EventEmitter = require('events').EventEmitter;
// Crypto-js é uma biblioteca JavaScript fornecida para obter AES em JavaScript sem a ajuda de qualquer outra linguagem como Java, C #. Aqui, vamos aprender como criptografar e descriptografar as strings de dados usando crypto-js. Incluir biblioteca crypto-js no arquivo HTML
const crypto = require('crypto');
// Para que serve o Util? Fornece as classes necessárias para criar um miniaplicativo e as classes que um miniaplicativo usa para se comunicar com seu contexto de miniaplicativo.
const  util = require('util');

const pokerUser = function (name, role) {
    this.name = name;
    this.role = role;

    this._createId();
    this.on('id-created', function (userId) {
        this.id = userId;
        this.emit('created', this, this);
    }, this)
};
util.inherits(pokerUser, EventEmitter);


pokerUser.prototype.id = null;
pokerUser.prototype.name = null;
pokerUser.prototype.role = null;

pokerUser.create = function(userDetails) {
    return new pokerUser(userDetails.name, userDetails.role);
};

pokerUser.prototype._createId = function() {
    var me = this;

    // Create random id for user
    var sha1sum = crypto.createHash('sha1');
    crypto.randomBytes(256, function(exception, buffer) {
        if (exception) throw exception;
        sha1sum.update(buffer);
        me.emit('id-created', sha1sum.digest('hex'), me);
    });
};

module.exports = pokerUser;