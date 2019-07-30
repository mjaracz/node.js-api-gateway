import amqp from 'amqp-connection-manager';
const connection = amqp.connect([process.env.cloudAMQP]);

export default connection;
