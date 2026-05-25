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
    "/api/accounts",
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
    "/api/accounts/set-default",
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

// API TO GET ACCOUNT DETAILS
export const getAccountDetails = async ( accountId ) => {
  
  const token = 
    typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  const res = await axios.get(
    `/api/accounts/${accountId}`,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      }
    }
  );

  if (!res.data.success) {
    throw new Error(res.data.message || "FAILED TO GET THE ACCOUNT DETAILS!");
  }

  return res.data.account;
}