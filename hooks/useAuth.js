import React, { useContext } from "react";

import { AuthContext } from "../providers/AuthManager";

export default function useAuth() {
  return useContext(AuthContext);
}
