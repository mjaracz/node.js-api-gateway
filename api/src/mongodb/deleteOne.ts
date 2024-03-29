import connect from './connect';

async function deleteOne(collectionName: string, id: number) {
  return new Promise((resolve, rejects) => {
    connect()
      .then(client => {
        client
          .db('test')
          .collection(collectionName)
          .deleteOne({id: id})
          .then(res => resolve(res))
          .catch(err => {
            rejects(err);
            console.warn('[mongodb] Collection Error: ' + err)
          })
      })
      .catch(err => {
        rejects(err);
        console.warn('[mongodb] connection error: ' + err)
      })

  })
}

export default deleteOne;
