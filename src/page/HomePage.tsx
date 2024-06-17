import { useContext, useEffect, useState } from "react";
import EventSoict from "../component/EventSoict";
// import ExamStudent, { examData } from "../component/ExamStudent";
// import SearchBar from "../component/SearchBar";
import Swiper1 from "../component/Swiper";
import { AuthContext } from "../contexts/AuthContext";

// type infoStudent = {
//   studentId: string;
//   studyGroup: string;
//   studyGroupId: string;
//   numbOrder: number;
//   examId: string;
//   NgayThi: string;
//   PhongThi: string;
//   courseId: string;
//   name: string;
//   studentName: string;
//   groupName: string;
//   email: string;
//   classId: string;
//   section: string;
//   note: string;
//   termId: string;
//   GiangVien: string;
// };

// const itemSearch = ["MSSV", "Lớp", "Mã học phần"];
export type examData = {
  examId: string;
  week: string;
  day: string;
  date: string;
  classId: string;
  courseId: string;
  courseName: string;
  studyGroup: string;
  numbOrder: number;
  room: string;
  sessionId: string;
  type: string;
};

export type infoStudent = {
  id: string;
  name: string;
  groupName: string;
  email: string;
};
const HomePage = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return;
  }
  const { accessToken } = authContext;
  const [scheduleData, setScheduleData] = useState<examData[] | undefined>([]);
  const [studentData, setStudentData] = useState<infoStudent | undefined>();
  console.log(accessToken);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://7d87-42-113-220-219.ngrok-free.app/api/v1/exam-class/student-schedule",
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              semester: "2023.1",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: examData[] = await response.json();
        setScheduleData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://7d87-42-113-220-219.ngrok-free.app/api/v1/student",
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: infoStudent = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(studentData);
  console.log(scheduleData);
  return (
    <div className="border-b">
      <div className="mb-4">
        1 số hình ảnh đẹp
        <Swiper1></Swiper1>
      </div>
      <div className="flex gap-x-5 mt-2 border-t ">
        <div className=" flex flex-col  w-1/6  ">
          <div className=" p-2 mb-3 border-b">
            <span className="flex items-center justify-center bg-blue-100 rounded p-2 ">
              Danh sách lựa chọn tìm kiếm
            </span>
          </div>
          <div className=" items-center justify-center bg-slate-200 p-4 gap-y-5 rounded h-32 ">
            <div className="flex items-center mb-4">
              <input
                id="country-option-1"
                type="radio"
                name="countries"
                value="USA"
                className="h-4 w-4 border-gray-300 focus:ring-2
              focus:ring-blue-300"
                aria-labelledby="country-option-1"
                aria-describedby="country-option-1"
              />
              <label className="text-sm font-medium text-gray-900 ml-2 block">
                United States
              </label>
            </div>
          </div>
        </div>

        <div className=" flex flex-col items-center bg-white gap-y-4 w-4/6 border-l border-r ">
          <div className="  border-b w-full">
            <span className="flex items-center justify-center  p-2 ">
              <div className="bg-blue-100 p-2 rounded">Tra cứu lịch thi</div>
            </span>
          </div>

          {/* <SearchBar></SearchBar> */}

          <div>
            <span>Bạn có {scheduleData?.length} lớp thi</span>
          </div>

          <div className="flex gap-x-10">
            <div className="bg-gray-300 p-4 rounded-md text-sm flex flex-col space-y-2 self-start ">
              <div className="text-xl">Thông tin sinh viên</div>
              <div>Họ và tên: {studentData?.name}</div>
              <div>MSSV: {studentData?.id}</div>
              <div>Lớp: {studentData?.groupName}</div>
              <div>Email: {studentData?.email}</div>
            </div>
            <div className="flex flex-col space-y-4">
              {/* <ExamStudent data={scheduleData} ></ExamStudent> */}

              {scheduleData &&
                scheduleData.map((data) => (
                  <div className="flex flex-row bg-gray-300 gap-x-2 p-4 rounded-md items-center  w-[500px]">
                    <div className="text-sm flex flex-col gap-y-2 mr-6 ml-3 w-1/2">
                      <div>{data.classId}</div>
                      <div>{data.courseId}</div>
                      <div>{data.courseName}</div>
                      <div>{data.date}</div>
                      <div>{data.day}</div>
                    </div>
                    <div className="text-sm flex flex-col gap-y-2 w-1/2">
                      <div>{data.room}</div>
                      <div>{data.sessionId}</div>
                      <div>{data.studyGroup}</div>
                      <div>{data.week}</div>
                      <div>{data.type}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="w-1/6">
          <div className=" p-2 mb-3 border-b">
            <span className="flex items-center justify-center bg-blue-100 rounded p-2  ">
              Danh sách lựa chọn tìm kiếm
            </span>
          </div>
          <EventSoict></EventSoict>
        </div>
      </div>
      xin chào
    </div>
  );
};

export default HomePage;
