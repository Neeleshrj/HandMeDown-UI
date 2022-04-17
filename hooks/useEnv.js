import React, { useContext } from "react";

import { EnvContext } from "../providers/EnvManager";

export default function useEnv() {
  return useContext(EnvContext);
}