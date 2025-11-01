import { sql } from "../config/db.js";


export async function getTransactionsByUserId(req, res){
    try{
        const {user_id} = req.params;

        const transactions = await sql` SELECT * FROM transactions WHERE user_id = ${user_id} ORDER BY date DESC`;
        res.status(201).json(transactions);

    }catch(err){
        console.log("Error in /api/transactions/:user_id", err);
        res.status(500).json({error: "Internal Server Error"});
    }
} 

export async function createTransaction(req, res){
        try{
            const {title,amount,category,user_id} = req.body;
            if(!title || amount===undefined || !category || !user_id){
                return res.status(400).json({error: "Please provide all required fields"});
            }
            const transaction = await sql`INSERT INTO transactions (title,amount,category,user_id) 
            VALUES (${title},${amount},${category},${user_id})
            RETURNING *
            `;
            res.status(201).json(transaction[0]);
    
        }catch(err){
            console.log("Error in /api/transactions:", err);
            res.status(500).json({error: "Internal Server Error"});
        }
}

export async function deleteTransaction(req, res){
        try{
            const {id} =req.params;
    
            if(isNaN(parseInt(id))){
                return res.status(400).json({error: "Invalid transaction ID"});
            }
    
            const result =  await sql` DELETE FROM transactions WHERE id= ${id} RETURNING *`;
            
            if(result.length ===0){
                return res.status(404).json({error: "Transaction not found"});
            }
    
            res.status(200).json({message: "Transaction deleted successfully"});
    
    
        }catch(err){
            console.log("Error deleting the transaction", err);
            res.status(500).json({error: "Internal Server Error"});
        }
        
}

export async function getTransactionSummary(req, res){
    try{
        const {user_id}  = req.params;
        const balanceResult = await sql `SELECT COALESCE(SUM(amount),0) AS balance FROM transactions WHERE user_id=${user_id}`;
        const incomeResult = await sql `SELECT COALESCE(SUM(amount),0) AS income FROM transactions WHERE user_id=${user_id} AND amount > 0`;
        const expenseResult = await sql `SELECT COALESCE(SUM(amount),0) AS expense FROM transactions WHERE user_id=${user_id} AND amount < 0`;
        

        res.status(200).json({
            balance: balanceResult[0].balance, //postgress always returns rows as an array even if there is only one row
            income: incomeResult[0].income,
            expense: expenseResult[0].expense
        })
    }catch(err){
        console.log("Error in /api/transactions/summary/:user_id", err);
        res.status(500).json({error: "Internal Server Error"});
    }
}