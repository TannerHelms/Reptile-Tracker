import { createContext } from "react";
import { store } from "../store/store";

export class Api {

  static async makeRequest(uri, method, body) {
    const token = store.getState().auth.token;
    const options = {
      method,
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    }

    if (body) {
      options.body = JSON.stringify(body);
    }
    const res = await fetch(uri, options);
    return res.json();
  }

  static get(uri) {
    return this.makeRequest(uri, "get")
  }

  static post(uri, body) {
    return this.makeRequest(uri, "post", body)
  }

  static put(uri, body) {
    return this.makeRequest(uri, "put", body)
  }

  static del(uri) {
    return this.makeRequest(uri, "del")
  }
}

export default Api;
export const ApiContext = createContext();
