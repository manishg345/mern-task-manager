import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

function App() {
  //{"name":"Munish","email":"munish.kumar@goconvey.com","password":"urgentJob@2025#"}
  const [token, setToken] = useState(null);
  const login = async () => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email: "munish.kumar@goconvey.com",
      password: "urgentJob@2025#",
    });
    setToken(response.data.token);
  };
  return (
    <div>
      {!token ? (
        <button onClick={login}>Login</button>
      ) : (
        <h3>Logged In! Token: {token}</h3>
      )}
    </div>
  );
}

export default App;
