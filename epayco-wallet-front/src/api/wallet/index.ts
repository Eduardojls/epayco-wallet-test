import axios from "axios";

const API_BASE_URL = "http://localhost:3001";
const API = "wallet";

export interface Funds {
  documentNumber: string;
  phone: string;
  amount: number;
}

export interface ConfirmPurchase {
  token: string;
  sessionId: string;
}

export const addFunds = async (body: Funds) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${API}/funds/add`, body);
    return response.data;
  } catch (error) {
    throw new Error("Error adding funds: " + error.message);
  }
};

export const registerPurchase = async (body: Funds) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API}/purchase/register`,
      body
    );
    return response.data;
  } catch (error) {
    throw new Error("Error registering purchase: " + error.message);
  }
};

export const confirmPurchase = async (body: ConfirmPurchase) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${API}/purchase/confirm`,
      body
    );
    return response.data;
  } catch (error) {
    throw new Error("Error registering purchase: " + error.message);
  }
};

export const checkBalance = async (documentNumber: string, phone: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/${API}/funds/check?documentNumber=${documentNumber}&phone=${phone}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Error registering purchase: " + error.message);
  }
};
