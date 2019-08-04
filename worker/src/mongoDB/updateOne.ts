import connect from './connect';
import {IStory} from "../types";

const updateOne = async (collectionName: string, id: number, body: IStory) => {
  await connect()
    .then(client => {
      client
        .db('test')
        .collection(collectionName)
        .updateOne({id: id}, body)
        .catch(err => {
          console.warn('[mongodb] Collection Error: ' + err)
        })
    })
    .catch(err => {
      console.warn('[mongodb] Internal Server Error: ' + err)
    })
};

export default updateOne;
