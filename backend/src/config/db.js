import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config();

export const sql = neon(process.env.DATABASE_URL);

export default async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id varchar(255) NOT NULL,
            title varchar(255) NOT NULL,
            amount float NOT NULL,
            category varchar(255) NOT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )`;
        console.log("Table created successfully");

}catch(err){
    console.log("Error creating table:", err);
    process.exit(1); //status code 1 means failure , 0 means success

    }
}
