import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { base64 } from "./base64";
import * as XLSX from "xlsx"; // Import xlsx library
import Modal from "../component/Modal";
import { get } from "react-hook-form";
type PhongMay = {
  e_c_id: string;
  e_c_week: string;
  e_c_day: string;
  e_c_date: string;
  e_c_plannedRoom: string;
  e_c_plannedSessionID: string;
  e_c_classId: string;
  courseId: string;
  courseName: string;
  instructorName: string;
};

const DanhSachLopThi = () => {
  const authContext = useContext(AuthContext);
  const [selectedOption, setSelectedOption] = useState("auditorium");
  const [showModal, setShowModal] = useState(false);
  const [phongmay, setPhongMay] = useState<PhongMay[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [editingRecord, setEditingRecord] = useState<PhongMay | null>(null);
  const [editingWeek, setEditingWeek] = useState("");
  const [editingDay, setEditingDay] = useState("");
  const [id, setId] = useState("");
  const [plannedRoom, setPlannedRoom] = useState(""); 
  const URL_BE = import.meta.env.VITE_SERVER_URL || " ";
  // Current page records
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = phongmay.slice(indexOfFirstRecord, indexOfLastRecord);

  const updateExamClass = async (examClassId: string, updateData: any) => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      `${URL_BE}/api/v1/exam-class/${examClassId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updateData),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };
  const updatetoClass = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateExamClass(id, { roomType:"auditorium",plannedRoom:`${plannedRoom}`,plannedSessionID:"1" }).then((data) => {
      console.log(data);
    });
    getDanhSachLopThi(selectedOption).then((data) => setPhongMay(data));
  }
  const updateToTTMT = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateExamClass(id, { roomType: "computer_room" }).then((data) => {
      console.log(data);
    });
    getDanhSachLopThi(selectedOption).then((data) => setPhongMay(data));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const dateEdit = convertDateFormat(editingDay);
    const DayofWeek = getDayOfWeek(editingDay);
    console.log(editingDay);
    console.log(dateEdit);
    console.log(DayofWeek);
    await updateExamClass(id, {
      week: editingWeek,
      day: DayofWeek,
      date: dateEdit,
    }).then((data) => {
      console.log(data);
    });
    getDanhSachLopThi(selectedOption).then((data) => setPhongMay(data));
  };
  const getDanhSachLopThi = async (type: string) => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      `${URL_BE}/api/v1/exam-class?type=${type}`,
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
    getDanhSachLopThi(selectedOption).then((data) => setPhongMay(data));
  }, [selectedOption]);

  const totalPages = Math.ceil(phongmay.length / recordsPerPage);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.addFileToVFS("CustomFont.ttf", base64);
    doc.addFont("CustomFont.ttf", "CustomFont", "normal");
    doc.setFont("CustomFont", "Bold");
    doc.setFontSize(12);
    const tableColumn = [
      "ID",
      "Week",
      "Day",
      "Date",
      "Planned Room",
      "Session ID",
      "Class ID",
      "Course ID",
      "Course Name",
      "Instructor Name",
    ];
    const tableRows: any[][] = [];

    phongmay.forEach((record) => {
      const recordData = [
        record.e_c_id,
        record.e_c_week,
        record.e_c_day,
        record.e_c_date,
        record.e_c_plannedRoom,
        record.e_c_plannedSessionID,
        record.e_c_classId,
        record.courseId,
        record.courseName,
        record.instructorName,
      ];
      tableRows.push(recordData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("danh_sach_lop_thi.pdf");
  };
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new(); // Create a new workbook
    const ws = XLSX.utils.json_to_sheet(phongmay); // Convert data to worksheet

    XLSX.utils.book_append_sheet(wb, ws, "DanhSachLopThi"); // Append the worksheet to the workbook

    // Generate a download link for the workbook
    XLSX.writeFile(wb, "danh_sach_lop_thi.xlsx");
  };
  function convertDateFormat(inputDate: string): string {
    // Tách các phần của chuỗi ngày ban đầu
    const [year, month, day] = inputDate.split("-");

    // Tạo chuỗi ngày mới với định dạng "dd.mm.yyyy"
    const outputDate = `${day}.${month}.${year}`;

    return outputDate;
  }
  function getDayOfWeek(dateString: string): string {
    // Tạo một đối tượng Date từ chuỗi ngày
    const [year, month, day] = dateString.split("-");
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    // Mảng chứa các ngày trong tuần
    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];

    // Lấy chỉ số ngày trong tuần (0 - Chủ Nhật, 1 - Thứ Hai, ...)
    const dayOfWeekIndex = date.getDay();

    // Trả về tên ngày trong tuần
    return daysOfWeek[dayOfWeekIndex];
  }

  return (
    <div className="w-5/6 mx-auto mt-10">
      <div>
        <select
          name=""
          id=""
          className="p-2 text-md border"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="auditorium">Lớp thi giảng đường</option>
          <option value="computer_room">Lớp thi phòng máy</option>
        </select>
      </div>
      <button
        onClick={exportToExcel}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Export to Excel
      </button>
      <button
        onClick={exportToPDF}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Export to PDF
      </button>
      <table
        id="my-table"
        className="min-w-full divide-y divide-gray-200 mt-2 font-sans"
      >
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Week
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Day
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Planned Room
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Session ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Class ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Instructor Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sửa ngày thi
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sửa phòng thi
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRecords.map((record) => (
            <tr key={record.e_c_id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {record.e_c_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.e_c_week}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.e_c_day}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.e_c_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.e_c_plannedRoom}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.e_c_plannedSessionID}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.e_c_classId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.courseId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.courseName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.instructorName}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => {
                    setShowModal(true);
                    setId(record.e_c_id);
                    console.log(id);
                  }}
                >
                  Nhấn để sửa
                </button>
              </td>
              {selectedOption === "computer_room" ? (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <form action="" className="flex flex-row" onSubmit={updatetoClass}>
                    <input
                      type="text"
                      className="w-20"
                      placeholder="phòng thi"
                      onChange={(e) =>setPlannedRoom(e.target.value) }
                    />
                    <button type="submit" onClick={()=>setId(record.e_c_id)}>Sửa</button>
                  </form>
                </td>
              ) : (
                <button
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  onClick={(e) => {
                    setId(record.e_c_id);
                    updateToTTMT(e as React.FormEvent);
                  }}
                >
                  Sửa
                </button>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render page numbers */}
      <div className="flex items-center justify-center mt-4 space-x-2">
        <button
          onClick={() =>
            setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded disabled:opacity-50"
        >
          Trước
        </button>
        <span className="text-sm font-medium">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage(
              currentPage < totalPages ? currentPage + 1 : currentPage
            )
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <form className="flex flex-col" onSubmit={handleUpdate}>
          <label htmlFor="">
            Tuần:
            <input
              className="p-2 rounded border"
              type="text"
              value={editingWeek}
              onChange={(e) => setEditingWeek(e.target.value)}
            />
          </label>
          <label htmlFor="">
            Ngày:
            <input
              className="p-2 rounded border"
              type="date"
              value={editingDay}
              onChange={(e) => setEditingDay(e.target.value)}
            />
          </label>
          <button type="submit">Sửa</button>
        </form>
      </Modal>
    </div>
  );
};

export default DanhSachLopThi;
