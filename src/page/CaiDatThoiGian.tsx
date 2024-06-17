import { useContext, useEffect, useState } from "react";
import { examSessionData, postexamSession } from "../CallApi";
import { AuthContext } from "../contexts/AuthContext";

const dataKipthi = [
  { label: "Kíp 1", start: "7h30", end: "9h30" },
  { label: "Kíp 2", start: "9h30", end: "11h30" },
  { label: "Kíp 3", start: "13h30", end: "15h30" },
  { label: "Kíp 4", start: "15h30", end: "17h30" },
];

const CaiDatThoiGian = () => {
  const authContext = useContext(AuthContext);
  const [label, setLabel] = useState("");
  const [start1, setStart1] = useState("");
  const [end1, setEnd1] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    const start = start1.replace(":", "h");
    const end = end1.replace(":", "h");
    postexamSession({ label, start, end });
    getExamSession().then((data) => {
      console.log(data);
    })
    // console.log({ label, start, end });
  };

  const getExamSession = async () => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      "https://7d87-42-113-220-219.ngrok-free.app/api/v1/exam-session",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const postexamSession = async (data: any) => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      "https://7d87-42-113-220-219.ngrok-free.app/api/v1/exam-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  return (
    <div className="flex flex-row justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-1/3 p-4 bg-slate-200"
      >
        <div>Bạn có thể thêm kíp thi chung tại đây</div>
        <label>
          Tên kíp:
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="rounded p-2"
          />
        </label>
        <label>
          Thời gian bắt đầu:
          <input
            type="time"
            value={start1}
            onChange={(e) => setStart1(e.target.value)}
          />
        </label>
        <label>
          Thời gian kết thúc:
          <input
            type="time"
            value={end1}
            onChange={(e) => setEnd1(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-200 flex justify-center text-xl"
        >
          Submit
        </button>
      </form>

      <div className="ml-10 flex flex-col bg-slate-200 p-2 rounded">
        <div className="flex justify-center">Đây là danh sách các kíp thi</div>
        {dataKipthi.map((item) => {
          return (
            <div className="flex flex-row">
              <div className="p-2 ">{item.label}</div>
              <div className="p-2 ml-4">Bắt đầu từ {item.start}</div>
              <div className="p-2 ml-4">Đến {item.end}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CaiDatThoiGian;
