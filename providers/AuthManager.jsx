import { useState, useEffect, createContext, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import useEnv from "../hooks/useEnv";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  //   const { baseURL } = useEnv();
  const init = useRef(true);

  async function getTokenFromAsyncStorage() {
    try {
      const res = await AsyncStorage.getItem("token");
      setLoading(false);
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async function getUserIdFromAsyncStorage() {
    try {
      const res = await AsyncStorage.getItem("userId");
      setLoading(false);
      return res;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async function storeInfoInAsyncStorage(t, i) {
    try {
      await AsyncStorage.setItem("token", t);
      await AsyncStorage.setItem("userId", i);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async function logout() {
    try {
      setToken(null);
      setUserId(null);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async function verifyToken() {
    try {
      setLoading(true);
      const t = await getTokenFromAsyncStorage();
      const i = await getUserIdFromAsyncStorage();
      if (t && i) {
        await axios.get("http://172.20.10.2:3002/api/auth/verify", {
          headers: {
            authorization: t,
          },
        });
        await storeInfoInAsyncStorage(t, i);
        init.current = false;
        setToken(t);
        setUserId(i);
        setLoading(false);
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
    if (!init.current) setLoading(false);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token: token,
        userId: userId,
        loading,
        setToken,
        setUserId,
        storeInfoInAsyncStorage,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
