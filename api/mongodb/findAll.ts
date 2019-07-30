import connect from './connect';

const findAll = (collectionName: string) => {
  return new Promise((resolve, rejects) => {
    connect()
      .then(client => {
        client
          .db('test')
          .collection(collectionName)
          .find({})
          .toArray()
          .then((res) => {
            resolve(res);
          })
          .catch(err => {
            rejects(err);
            console.warn('[mongodb] Collection Error: ' + err)
          });
      })
      .catch(err => {
        rejects(err);
        console.warn('[mongodb] Connection Error: '+ err);
      })
  })
};

export default findAll;
