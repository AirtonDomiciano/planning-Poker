// configuracao inicial
const config = require('iniparser').parseSync('./config.ini'),

    // Poker App specific Variables and requires
    pokerConnection = require('./src/lib/poker-connection'),
    pokerBroadcaster = require('./src/lib/poker-broadcaster-server'),
    pokerUsers = require('./src/lib/poker-users'),
    pokerCards = require('./src/lib/poker-cards')
    pokerEventHandlers = require('./src/lib/poker-event-handlers'),
    pokerBroadcasts = require('./src/lib/poker-broadcasts'),
    
    // HTTP Server
    http = require(config.http.protocol),
    server = require('./src/bootstrap/server');

// This path cannot be completely set in the config
// Also see https://github.com/mashpie/i18n-node/issues/61
config.filesystem.i18n = __dirname + config.filesystem.i18n;

// Create HTTP Server
var websocketServer = server.bootstrap(http, config);

// WebSocket Server
console.log('Creating WebSocket Server');

pokerBroadcaster.init(websocketServer);

websocketServer.on('request', function(request) {
    var connectionHandler = pokerConnection.getNewHandler();
    connectionHandler.init(pokerUsers, pokerCards);
    pokerEventHandlers.registerAllForConnectionHandler(connectionHandler);
    connectionHandler.setConnection(request.accept());

    console.log((new Date()) + ' Connection accepted.');

});

server.run();