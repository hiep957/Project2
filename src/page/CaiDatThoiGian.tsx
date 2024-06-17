import { useState } from "react";

const dataKipthi = [
  { label: "Kíp 1", start: "7h30", end: "9h30" },
  { label: "Kíp 2", start: "9h30", end: "11h30" },
  { label: "Kíp 3", start: "13h30", end: "15h30" },
  { label: "Kíp 4", start: "15h30", end: "17h30" },
];

const CaiDatThoiGian = () => {
  const [tenKip, setTenKip] = useState("");
  const [thoiGianBatDau, setThoiGianBatDau] = useState("");
  const [thoiGianKetThuc, setThoiGianKetThuc] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission here
    console.log({ tenKip, thoiGianBatDau, thoiGianKetThuc });
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
            value={tenKip}
            onChange={(e) => setTenKip(e.target.value)}
            className="rounded p-2"
          />
        </label>
        <label>
          Thời gian bắt đầu:
          <input
            type="time"
            value={thoiGianBatDau}
            onChange={(e) => setThoiGianBatDau(e.target.value)}
          />
        </label>
        <label>
          Thời gian kết thúc:
          <input
            type="time"
            value={thoiGianKetThuc}
            onChange={(e) => setThoiGianKetThuc(e.target.value)}
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
