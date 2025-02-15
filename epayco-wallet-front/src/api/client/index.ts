import axios from "axios";

const API_BASE_URL = "http://localhost:3001";
const API = "client";

export interface RegisterClient {
  documentNumber: string;
  phone: string;
  name: string;
  email: string;
}

export const registerClient = async (client: RegisterClient) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${API}`, client);
    return response.data;
  } catch (error) {
    throw new Error("Error registering client: " + error.message);
  }
};
