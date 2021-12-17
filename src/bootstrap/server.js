var WebSocketServer = require('websocket').server,
    express = require('./express.js');
    
bootstrapServer = function() {};

bootstrapServer.getInstance = function() {
    if (bootstrapServer.__instance == null) {
        bootstrapServer.__instance = new bootstrapServer();
    }
    
    return bootstrapServer.__instance;
};

bootstrapServer.__instance = null;

bootstrapServer.prototype.httpServer = null;
bootstrapServer.prototype.websocketServer = null;
bootstrapServer.prototype.expressApp = null;
bootstrapServer.prototype.config = {};

bootstrapServer.prototype.bootstrap = function(http, config) {
    this.config = config;
    
    this.createExpressApp();
    this.createHttpServer();
    this.createWebsocketServer();
    
    return this.websocketServer;
};

bootstrapServer.prototype.createExpressApp = function() {
    this.expressApp = express.bootstrap(this.config);
};

bootstrapServer.prototype.createHttpServer = function() {
    this.httpServer = http.createServer(this.expressApp);
};

bootstrapServer.prototype.createWebsocketServer = function() {
    this.websocketServer = new WebSocketServer({
        httpServer: this.httpServer,
        autoAcceptConnections: false
    });
};

bootstrapServer.prototype.run = function() {
    var server = this;
    this.httpServer.listen(this.config.http.port, function() {
        console.log('HTTP Server running with config:');
        console.log(server.config.http);
    });
};

module.exports = bootstrapServer.getInstance();