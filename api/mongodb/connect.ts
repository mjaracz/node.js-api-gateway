const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://test:UPksk8WbN3UQSsYp@cluster0-kx74d.mongodb.net/test?retryWrites=true&w=majority';
const connect = async () =>
  await MongoClient.connect(uri, { useNewUrlParser: true });

export default connect;
