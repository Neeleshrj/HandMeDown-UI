import { useState, useEffect, createContext, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import useEnv from "../hooks/useEnv";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { baseURL } = useEnv();
  const init = useRef(true);

  async function getInfo() {
    try {
      let res = await AsyncStorage.multiGet(["token", "userId"]);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async function storeInfo(t, i) {
    const token = ["token", t];
    const userId = ["userId", i];
    try {
      await AsyncStorage.multiSet([token, userId]);
    } catch (e) {
      console.log(e);
    }
  }

  async function logout() {
    try {
      setToken(null);
      setUserId(null);
      await AsyncStorage.multiRemove(["token","userId"]);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async function verifyToken() {
    try {
      setLoading(true);
      const x = await getInfo();
      console.log(x);
      if (x[0][1] !== null) {
        await axios
          .post(baseURL + "/api/auth/verifyToken", {
            token: x[0][1],
          })
          .then(async () => {
            storeInfo(x[0][1], x[1][1]);
            init.current = false;
            setToken(x[0][1]);
            setUserId(x[1][1]);
            setLoading(false);
          })
          .catch((e) => console.log(e));
      } else {
        init.current = false;
        setToken(null);
        setUserId(null);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      setToken(null);
      setUserId(null);
    }
  }

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    // if (!init.current) setLoading(false);
    verifyToken()
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token: token,
        userId: userId,
        loading,
        setToken,
        setUserId,
        getInfo,
        storeInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
