import connect from './connect';

const findById = (collectionName: string, id: number) => {
  return new Promise((response, rejects) => {
    connect()
      .then(client => {
        const cursor = client.db('test').collection(collectionName).find({id: id});

        cursor.hasNext().then(isDocuments => {
          if(isDocuments)
            cursor
              .toArray()
              .then(arr => {
                response(arr)
              })
              .catch(err => {
                rejects(err);
                console.warn('[mongodb] Collection Error ' + err)
              });
          else
            throw new Error('ID without rang')
        })
          .catch(err => {
            rejects(err);
            console.warn('[mongodb] Documents ' + err)
          });
      })
  })
};

export default findById;
