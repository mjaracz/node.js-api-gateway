const MongoClient = require('mongodb').MongoClient;
import dotenv from 'dotenv';
dotenv.config();

const connect = async () => {
  return MongoClient.connect(process.env.mongodb_URL, { useNewUrlParser: true });
};
export default connect;
