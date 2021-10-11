import mongoose from 'mongoose';
import {config} from './config/config';


export const connectDb = () => {
  const MongoDbUri = `mongodb://${config.db.host}/${config.db.name}`;
  return mongoose.connect(MongoDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
