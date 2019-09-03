import connect from './connect';

const findUser = (collectionName: string, username: string) => {
  return new Promise((resolve, reject) => {
    connect()
      .then(client => {
        const userCollection = client.db('test').collection(collectionName);
        const user = userCollection.find({username: username});
        if(user) resolve(user);
      })
      .catch(err => reject(err))
  })
};

export default findUser;
