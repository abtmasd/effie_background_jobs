// config.js
import * as dotenv from'dotenv';
import path from'path';

console.log( `⚙️  dotEnvConfig ENV ${process.env.NODE_ENV}`);

dotenv.config({
  path: path.resolve(__dirname, process.env.NODE_ENV + ".env"),
});

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 3000
}
