import {Redis} from 'ioredis'

const redisClient = ()=>{
    if(process.env.REDIS_URL) {
        console.log('redis Connected')
        return process.env.REDIS_URL
    }
    throw new Error("Redis is not connected")
}
export const redis = new Redis(redisClient());
