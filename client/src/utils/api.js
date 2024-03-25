import { createContext } from "react";
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
    }

    if (body) {
      options.body = JSON.stringify(body);
    }
    const res = await fetch(uri, options);
    if (res.ok) {
      return res.json();
    }
    const error = await res.json();
    throw new Error(error.error);
  }

  get(uri) {
    return this.makeRequest(uri, "get")
  }

  post(uri, body) {
    return this.makeRequest(uri, "post", body)
  }

  put(uri, body) {
    return this.makeRequest(uri, "put", body)
  }

  del(uri) {
    return this.makeRequest(uri, "del")
  }
}

export const ApiContext = createContext();
