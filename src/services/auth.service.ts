import axios from "./api";
import { SERVER_URL } from "../helpers/constants";
import {} from '@/store'
import { PayloadCredentials } from "@/helpers/types";

const authUrl = `${SERVER_URL}/api/auth`;

class AuthService {
  login({ login, password }: PayloadCredentials) {
    const url = `${authUrl}/login`;
    return axios.post(url, { login, password });
  }

  logout() {
    const url = `${authUrl}/logout`;
    return axios.post(url);
  }

  register({ login, password }: PayloadCredentials) {
    const url = `${authUrl}/register`;
    return axios.post(url, { login, password });
  }

}

export default new AuthService();