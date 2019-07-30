import connect from './connect';
import {IStory} from '../types';

const insertOne = (collectionName: string, jsonData: {body: IStory}) => {
 connect()
   .then(client => {
      const {body} = jsonData;
      client
        .db('test')
        .collection(collectionName)
        .insertOne(body)
        .catch(err => console.warn('[mongodb] Collection error: ' + err))
    })
    .catch(err => {
      console.warn('[mongodb] Internal DB error connection  ' + err)
    });
};

export default insertOne;
