import axios from "./api";
import { SERVER_URL } from "../helpers/constants";

const sharedUrl = `${SERVER_URL}/shared/`;

class SharedService {
  getShared(link: string): Promise<{ [key: string]: string }> {
    const url = sharedUrl + link;
    return axios.get(url).then(r => r.data.note);
  }
}

export default new SharedService();
