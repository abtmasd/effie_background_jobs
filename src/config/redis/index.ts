import redis from 'ioredis';
import redisConfig from './config';
import { initToken } from "../../auth/token/";

const redisClient = new redis(redisConfig);

//console.log("configuração  redis: ", redisConfig);
redisClient.on('connect', () => {
  console.log('APP --> Redis connect');
});
redisClient.on('ready', () => {
  console.log('APP --> Redis ready');
  initToken();
});
redisClient.on('reconnecting', () => {
  console.log('APP --> Redis reconnecting');
});
redisClient.on('error', (err : Error) => {
  console.log('APP --> Redis error', err.message);
});
redisClient.on('end', () => {
  console.log('APP --> Redis end');
});

export {redisClient};