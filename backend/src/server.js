import express from "express";
import dotenv from "dotenv";
dotenv.config();
import rateLimiter from "./middleawre/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import initDB from "./config/db.js";
import job from "./config/cron.js";

if(process.env.NODE_ENV === "production"){
    job.start();
}

const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use("/api/transactions",transactionsRoute);

const PORT = process.env.PORT || 5001;

app.get("/api/health", (req, res) => {
    res.status(200).json({status: "OK"});
});

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Error initializing database:", err);
});