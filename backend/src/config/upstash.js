import { Redis } from '@upstash/redis'
import { Ratelimit} from "@upstash/ratelimit"
import "dotenv/config";
const ratelimiter = new Ratelimit({
    redis:Redis.fromEnv(), //This tries to load UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from your environment using process.env automatically.
    limiter: Ratelimit.slidingWindow(100, "60 s"), // 100 requests per 60 seconds
})

export default ratelimiter;