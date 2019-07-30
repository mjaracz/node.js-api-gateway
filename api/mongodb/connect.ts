const MongoClient = require('mongodb').MongoClient;
const connect = async () =>
  await MongoClient.connect(process.env.mongodbUri, { useNewUrlParser: true });

export default connect;
