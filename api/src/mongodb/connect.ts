import {MongoClient} from 'mongodb'
import dotenv from 'dotenv';
dotenv.config();
const connect = async () => {
  return MongoClient.connect(process.env.mongodb_URL, { useNewUrlParser: true });
};
export default connect;
