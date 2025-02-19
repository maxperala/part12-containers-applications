import axios from "axios";

const baseURL = "http://localhost:8080/api/login";

const login = async (username, password) => {
  console.log(username, password);

  try {
    const resp = await axios.post(baseURL, { username, password });
    return { user: resp.data };
  } catch (e) {
    console.log(e);
    return { error: e.response.data.error };
  }
};

export default { login };
