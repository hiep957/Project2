import React, { createContext, useState } from "react";

// Define the shape of the context
interface AuthContextType {
  accessToken: string | null;
  role: string | null;
  setAccessToken: (token: string | null) => void;
  setRole: (role: string | null) => void;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Create a provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string|null >("");
  const [role, setRole] = useState<string|null>("");

  return (
    <AuthContext.Provider
      value={{ accessToken, role, setAccessToken, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
