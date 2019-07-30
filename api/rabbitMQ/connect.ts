import amqp from 'amqp-connection-manager'
const connection = amqp.connect([process.env.MqCloud]);

export default connection;
