import axios from "axios";

export const seedTransaction = async ( accountId ) => {
    const token = 
        typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    const res = await axios.post(
        "/api/transactions/seed",
        { accountId },
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : ""
            }
        }
    );

    if(!res.data.success){
        throw new Error(res.data.message)
    }

    return res.data;
}

// FUNCTION FOR BULK DELETE
export const bulkDeleteTransactions = async (transactionIds) => {
   const token = 
        typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    const res = await axios.delete(
        "/api/transactions/bulk-delete",
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : ""
            },
            data: {
                transactionIds,
            },
        }
    );

    if(!res.data.success){
        throw new Error(res.data.message)
    }

    return res.data;
}