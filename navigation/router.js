import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import useAuth from "../hooks/useAuth";

import AuthStackNavigator from "./AuthStackNav";
import AppTabNav from "./AppTabNav";

import Loading from "../screens/Loading";

export default function Router() {
  const AuthContext = useAuth();

  return (
    <NavigationContainer>
      {AuthContext.loading ? (
        <Loading />
      ) : AuthContext.token === null && AuthContext.userId === null? (
        <AuthStackNavigator />
      ) : (
        <AppTabNav />
      )}
    </NavigationContainer>
  );
}
