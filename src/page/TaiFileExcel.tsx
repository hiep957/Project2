import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

type Course = {
  c_id: string;
  c_name: string;
  c_creditInfo: string;
  recommendInstructors: string;
  assignedTo: string;
  assignedToEmail: string;
};

const TaiFileExcel = () => {
  const [selectedHocPhanIds, setSelectedHocPhanIds] = useState<string[]>([]);
  const authContext = useContext(AuthContext);
  const [hocPhan, setHocPhan] = useState<Course[]>([]);

  const getHocPhan2 = async () => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      `https://19df-42-113-220-219.ngrok-free.app/api/v1/course?semester=2023.1`,
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

  useEffect(() => {
    getHocPhan2().then((data) => {
      setHocPhan(data);
      console.log(data);
    });
  }, []);

  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedHocPhanIds((prev) => [...prev, id]);
    } else {
      setSelectedHocPhanIds((prev) =>
        prev.filter((hocPhanId) => hocPhanId !== id)
      );
    }
  };

  const downloadExcel = async (query: string) => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      `https://19df-42-113-220-219.ngrok-free.app/api/v1/excel/download/export-to-pdt?courseIds=${query}&semester=2023.1`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'courses.xlsx';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleSubmit = async (selectedHocPhanIds: string[]) => {
    const query = selectedHocPhanIds.join(",");
    console.log(query);
    downloadExcel(query);
  };

  const hocPhanIds = hocPhan.map((item) => item.c_id);

  return (
    <div className="w-4/6">
      <h1>Tải file excel</h1>
      <div className="grid grid-cols-5 gap-4">
        {hocPhanIds.map((id, index) => (
          <div key={index} className="border p-2">
            <input
              type="checkbox"
              onChange={(e) => handleCheckboxChange(id, e.target.checked)}
            />
            {id}
          </div>
        ))}
      </div>
      <button onClick={() => handleSubmit(selectedHocPhanIds)}>
        Tải file excel
      </button>
    </div>
  );
};

export default TaiFileExcel;
