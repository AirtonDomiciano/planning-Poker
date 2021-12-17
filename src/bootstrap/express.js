// O conceito de internacionalização ou i18n (que, por vezes, também é chamado de "Localização") 
// consiste no desenvolvimento e/ou adaptação de um produto para o idioma de um ou mais países. 
// O acrônimo "i18n" origina-se do inglês "internationalization", onde 18 é o número de letras entre o primeiro "i" e o último "n
const i18n =  require('i18n')
// Express.js é um framework para Node.js que fornece recursos mínimos para construção de servidores web.
const express = require('express')

bootStrapExpress = function() {}; 

bootStrapExpress.prototype.config = {}
bootStrapExpress.prototype.app = null;

bootStrapExpress.prototype.bootstrap = function(config) {
    this.config = config

    this.configureI18n();
    this.createApp();
    this.configureRoutes();

    return this.app;
}

// Configura a linguagem 
bootStrapExpress.prototype.configureI18n = function() {
    i18n.configure({
        locales: ['pt', 'en'],
        defaultLocale: this.config.locale.default,
        directory: this.config.filesystem.i18n,
        updateFiles: false
    });
};
bootStrapExpress.prototype.createApp = function() {
    var app = this.app = express();
    this.app.use(express.static(__dirname + this.config.filesystem.public_files));
    this.app.set('views', __dirname + this.config.filesystem.view_files);
    this.app.engine('html', require('ejs').renderFile);
    this.app.set(app.use(i18n.init))
};

bootStrapExpress.prototype.configureRoutes = function() {
    var server = this;
    this.app.get('/', function(req, res) {
        res.render(
            'index.html',
            {
                web: server.config.http,
                cards: server.config.cards
            }
        );
        res.end();
    });
}

module.exports = new bootStrapExpress();