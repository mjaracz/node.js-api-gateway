"use strict";
exports.__esModule = true;
var connect_1 = require("./connect");
connect_1["default"].on('connect', function () { return console.log(' [AMQP] CONNECTED!'); });
connect_1["default"].on('disconnect', function (err) { return console.log(' [AMQP] DISCONNECTED' + err.stack); });
var channelWrapper = connect_1["default"].createChannel({
    json: true,
    setup: function (channel) { return channel.assertExchange('json_exchange', 'topic'); }
});
function sendMessageToQueue(routingKey, data) {
    channelWrapper.publish('json_exchange', routingKey, data)
        .then(function () {
        console.log('[AMQP] Message sent');
    })["catch"](function (err) {
        console.log('[AMQP] Message Was Rejected ' + err.stack);
        channelWrapper.close();
        connect_1["default"].close();
    });
}
;
exports["default"] = sendMessageToQueue;
