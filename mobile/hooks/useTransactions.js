import { useCallback, useState } from "react"
import { Alert } from "react-native";
const API_URL = "https://trackexpense-mobile-app-backend.onrender.com/api"

export const useTransactions = (userId) => {
    const [transactions, setTransactions] = useState([]);
    const[summary,setSummary] = useState({
        income:0,
        expense:0,
        balance:0
    });
    const [isloading, setIsLoading] = useState(true);

    const fetchtransactions = useCallback(async()=>{
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json();
            setTransactions(data);
            
        } catch (error) {
            console.log("Error fetching transactions:", error);
        }
    },[userId])

    const fetchSummary = useCallback(async()=>{
        try {
            const response = await  fetch(`${API_URL}/transactions/summary/${userId}`);
            const data = await response.json();
            setSummary(data);
            
        } catch (error) {
            console.log("Error fetching summary:", error);
        }
    },[userId])

    const loadData = useCallback(async()=>{
        try {
            setIsLoading(true);
            await Promise.all([fetchtransactions(),fetchSummary()]);
        }catch(error) {
            console.log("Error loading data:", error);
        }
        finally{
            setIsLoading(false);
        }
        
    },[fetchtransactions,fetchSummary,userId])

    const deleteTransaction = async(id)=>{
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`,{method: "DELETE"});
            if(!response.ok){
                throw new Error("Failed to delete transaction");
            }
            loadData();
            Alert.alert("Success","Transaction deleted successfully");
        } catch (error) {
            console.log("Error deleting transaction:", error);
            Alert.alert("Error", error.message);
        }
    }

    return {
        transactions,
        summary,
        isloading,
        loadData,
        deleteTransaction
    }
};