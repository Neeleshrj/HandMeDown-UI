import React, { useState } from "react";
import AppLoading from "expo-app-loading";

import useFonts from "./hooks/useFonts";

import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";

export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  
  const PreLoad = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={PreLoad}
        onFinish={() => SetIsReady(true)}
        onError={() => console.log("Error loading fonts!")}
      />
    );
  }

  return (
    <Register />
  );
}