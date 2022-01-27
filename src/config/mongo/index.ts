import mongoose from 'mongoose';
//import { Schema, model, connect } from 'mongoose';

var MONGODB_CONNECTION_STRING =  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}?authSource=admin&readPreference=primary&poolSize=20&w=majority`
//console.log('>>>> mongo string: ', MONGODB_CONNECTION_STRING);
async function connect() { 
    mongoose.connect(MONGODB_CONNECTION_STRING, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, err => {
        if (err) {
            console.log('🚀 Mongodb connection ❌');
        } else {
            console.log('🚀 Mongodb connection ✔️');
        }
    })
}

export default connect;


/*
//ROCKETSEAT
interface MongoConfig {
  host: string;
  port: number;
  username?: string;
  password?: string;
  database: string;
}

export default {
  host: process.env.MONGO_URL || 'localhost',
  port: process.env.MONGO_PORT || 27017,
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASS,
  database: process.env.MONGO_DB,
} as MongoConfig;
*/
