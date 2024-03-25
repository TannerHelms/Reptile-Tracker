import { createContext } from "react";
import axios from "axios";
import { store } from "../store/store";

export class Api {
  async makeRequest(uri, method, body) {
    const token = store.getState().token.value;
    const options = {
      method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    };

    if (body) {
      options.data = body;
    }

    try {
      const res = await axios(uri, options);
      return res.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }

  get(uri) {
    return this.makeRequest(uri, "get");
  }

  post(uri, body) {
    return this.makeRequest(uri, "post", body);
  }

  put(uri, body) {
    return this.makeRequest(uri, "put", body);
  }

  del(uri) {
    return this.makeRequest(uri, "delete");
  }
}

export const ApiContext = createContext();
