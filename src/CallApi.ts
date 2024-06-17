import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
const URL_BE = "https://7d87-42-113-220-219.ngrok-free.app";
const authContext = useContext(AuthContext);

export type examSessionData = {
  label: string;
  start: string;
  end: string;
};

export const postexamSession = async (data: examSessionData) => {
  if (!authContext) {
    return;
  }
  const { accessToken } = authContext;
  const response = await fetch("https://7d87-42-113-220-219.ngrok-free.app/api/v1/exam-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
