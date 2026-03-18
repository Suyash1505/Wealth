import axios from "axios";

// API TO CREATE ACCOUNT
export const createAccount = async (data) => {

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const res = await axios.post(
    "/api/accounts/create",
    data,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      }
    }
  );

  if (!res.data.success) {
    throw new Error(res.data.message || "ACCOUNT CREATION FAILED!");
  }

  return res.data;
};


// API TO GET USER ACCOUNTS
export const getUserAccount = async () => {

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const res = await axios.get(
    "http://localhost:3000/api/accounts",
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      }
    }
  );

  if (!res.data.success) {
    throw new Error(res.data.message || "ACCOUNT FETCHING FAILED!");
  }

  return res.data.accounts;
};

// API SET DEFALUT ACCOUNT
export const setDefaultAccount = async ( accountId ) => {

  const token = 
    typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  const res = await axios.put(
    "http://localhost:3000/api/accounts/set-default",
    { accountId },
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      }
    }
  );

  if (!res.data.success) {
    throw new Error(res.data.message || "DEFAULT ACCOUNT SETTING FAILED!");
  }

  return res.data;
}
