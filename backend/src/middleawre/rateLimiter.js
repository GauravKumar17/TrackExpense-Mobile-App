import ratelimiter from "../config/upstash.js";
const rateLimiter = async (req, res, next) => {
    try{
        const { success } = await ratelimiter.limit("userid or ip:"); // you can use user id if you have authentication implemented
        if(!success){
            return res.status(429).json({error: "Too many requests, please try again later."});
        }
        next();
    }catch(err){
        console.log("Rate Limiter Error:", err);
        next(err);
    }
}
export default rateLimiter;