import axios from "./api";
import { SERVER_URL } from "../helpers/constants";

const authUrl = `${SERVER_URL}/api/token`;

class TokenService {
  refreshToken() {
    const url = `${authUrl}/refresh`;
    return axios.post(url);
  }

  invalidateToken() {
    const url = `${authUrl}/invalidate`;
    return axios.post(url);
  }
}

export default new TokenService();