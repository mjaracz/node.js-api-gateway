import connect from "./connect";
import {IStory} from "../types";

const insertMany = (collectionName: string, docs: IStory[]) => {
  connect()
    .then(client => {
      const collection = client.db('test').collection(collectionName);
      collection
        .insertMany(docs)
        .catch(err => console.warn(' [mongodb] Internal DB error ' + err))
    })
    .catch(err => {
      console.warn(' [mongodb] Internal DB error connection: ' + err)
    })
};

export default insertMany;
