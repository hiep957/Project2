import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

const authContext = useContext(AuthContext);

const URL_BE = process.env.SERVER || "";
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
  const response = await fetch(`${URL_BE}/api/v1/exam-session`, {
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

// export const profileGiaoVu = async()=> {
//   if (!authContext) {
//     return;
//   }
//   const { accessToken } = authContext;
//   const response = await fetch("https://19df-42-113-220-219.ngrok-free.app/api/v1/academic-affair/profile", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "ngrok-skip-browser-warning": "true",
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   return response.json();
// }