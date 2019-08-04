import connection from './connect';

connection.on('connect', () => console.log(' [AMQP] CONNECTED!'));
connection.on('disconnect', (err) => console.log(' [AMQP] DISCONNECTED' + err.stack));

const channelWrapper = connection.createChannel({ 
  json: true,
  setup: channel => channel.assertExchange('json_exchange', 'topic')
});

function sendMessageToQueue(routingKey, data) {
  channelWrapper.publish('json_exchange', routingKey, data)
    .then(() => {
      console.log('[AMQP] Message sent')
    })
    .catch(err => {
      console.log('[AMQP] Message Was Rejected ' + err.stack);
      channelWrapper.close();
      connection.close();
    })
};

export default sendMessageToQueue;