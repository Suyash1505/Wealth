import axios from "axios";

// GET CURRENT BUDGET
export const getCurrentBudget = async () => {

    const token =
        typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    const res = await axios.get(
        "/api/budget",
        {
            headers: {
                Authorization:
                    token
                    ? `Bearer ${token}`
                    : ""
            }
        }
    );

    if(!res.data.success){
        throw new Error(res.data.message);
    }

    return res.data;
};

// UPDATE BUDGET
export const updateBudget = async (amount) => {

    const token =
        typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    const res = await axios.post(
        "/api/budget",
        { amount },
        {
            headers: {
                Authorization:
                    token
                    ? `Bearer ${token}`
                    : ""
            }
        }
    );

    if(!res.data.success){
        throw new Error(res.data.message);
    }

    return res.data;
};