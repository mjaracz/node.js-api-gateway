import insertOne from './mongoDB/insertOne';
import connection from './rabbitMQ/connect';
import updateOne from './mongoDB/updateOne';

import {IStory} from './types'

const onNewMessage = reqBody => {
  const jsonData: {body: IStory} = JSON.parse(Buffer.from(reqBody.content).toString());
  insertOne('documents', jsonData);
  channelWrapper.ack(reqBody);
};

const onUpdateMessage = async reqBody => {
  const data = JSON.parse(Buffer.from(reqBody.content).toString());
  const body: IStory = data.body;
  const id: number = data.id;
  await updateOne('documents', id, body);
  await channelWrapper.ack(reqBody)
};


const channelWrapper = connection.createChannel({
  json: true,
  setup: channel => {
    Promise.all([
      channel.prefetch(1),
      channel.assertExchange('json_exchange', 'topic'),
      channel.assertQueue('post_stories', {exclusive: true, autoDelete: false}),
      channel.assertQueue('put_stories', {exclusive: true, autoDelete: false}),
      channel.bindQueue('post_stories', 'json_exchange', 'new.json.stories'),
      channel.bindQueue('put_stories', 'json_exchange', 'update.json.stories'),
      channel.consume('post_stories', onNewMessage),
      channel.consume('put_stories', onUpdateMessage)
    ])
      .catch(err => {
        console.warn(' [AMQP] Channel Error: ' + err)
      });
  }
});

channelWrapper
  .waitForConnect()
  .then(() => {
    console.log('[AMQP] Listening for messages')
  });
