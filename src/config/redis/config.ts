
import { RedisOptions } from 'ioredis';
type RedisConfig = RedisOptions;
const retryStrategy = require("node-redis-retry-strategy");

export default {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  db: process.env.REDIS_DB,
  enableOfflineQueue: false,
  maxRetriesPerRequest: 1, // null for wait forever
  autoResubscribe: true,
  retryStrategy: retryStrategy({
    delay_of_retry_attempts: 60000,
    number_of_retry_attempts: Number.MAX_SAFE_INTEGER, //Number.MAX_SAFE_INTEGER
    wait_time: 100000
  })
} as RedisConfig;