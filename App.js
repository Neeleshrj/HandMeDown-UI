import React, { useState } from "react";
import AppLoading from "expo-app-loading";

import useFonts from "./hooks/useFonts";

import Router from "./navigation/router";

import AuthProvider from "./providers/AuthManager";
import EnvProvider from "./providers/EnvManager";

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
    <EnvProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </EnvProvider>
  );
}
