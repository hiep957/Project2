import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Modal from "../component/Modal";
import { get } from "react-hook-form";
type Course = {
  c_id: string;
  c_name: string;
  c_creditInfo: string;
  recommendInstructors: string;
  assignedTo: string;
  assignedToEmail: string;
  totalScheduled: string;
  totalStudent: string;
};

type Teacher = {
  id: string;
  email: string;
  name: string;
};

const HocPhan = () => {
  const authContext = useContext(AuthContext);
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [courseData2, setCourseData2] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [showModal, setShowModal] = useState(false);
  const [recommendedTeachers, setRecommendedTeachers] = useState<string[]>([]);
  const [teacherArray, setTeacherArray] = useState<Teacher[]>([]);
  // const [teacherId, setTeacherId] = useState<string | null>(null);

  const phanquyenGiaoVu = async (teacherId: string, id: string) => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      "https://19df-42-113-220-219.ngrok-free.app/api/v1/instructor/permission?semester=2023.1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ instructorId: teacherId, courseId: id }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const handlePhanQuyen = async(teacherId: string, id: string) => {
    await phanquyenGiaoVu(teacherId, id).then((data) => console.log(data));
    await getHocPhan2().then((data) => setCourseData2(data));
    await getHocPhan().then((data) => setCourseData(data));
  };

  const getGiangVien = async () => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      `https://19df-42-113-220-219.ngrok-free.app/api/v1/instructor`,
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
    getGiangVien()
      .then((data) => {
        setTeacherArray(data);
      })
      .then(() => console.log(teacherArray));
  }, []);

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
    getHocPhan2().then((data) => setCourseData2(data));
  }, []);
  const getHocPhan = async () => {
    if (!authContext) {
      return;
    }
    const { accessToken } = authContext;
    const response = await fetch(
      `https://19df-42-113-220-219.ngrok-free.app/api/v1/course/permission?semester=2023.1&page=${currentPage}&limit=${itemsPerPage}`,
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
    getHocPhan().then((data) => {
      setCourseData(data);
    });
  }, [currentPage]); // Run only when currentPage changes

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const getTeacherIdByName = (name: string) => {
    const teacher = teacherArray.find(
      (teacher) => teacher.name.toLowerCase() === name.toLowerCase()
    );
    return teacher ? teacher.id : null;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courseData.slice(indexOfFirstItem, indexOfLastItem);
  const handleTeacherAssignClick = (course: Course) => {
    // Assuming recommendInstructors is a comma-separated string of teacher names
    const teachers = course.recommendInstructors.split(", ");
    setRecommendedTeachers(teachers);
    setShowModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Học Phần</h1>
      <table className="w-full border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Mã Học Phần</th>
            <th className="border p-2">Tên Học Phần</th>
            <th className="border p-2">Số Tín Chỉ</th>
            <th className="border p-2">Giảng Viên đề xuất</th>
            <th className="border p-2">Giao cho giáo viên</th>
            <th className="border p-2">Email giáo viên</th>
          </tr>
        </thead>
        <tbody>
          {currentCourses.map((course) => (
            <tr
              key={course.c_id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setSelectedCourse(course);
                setId(course.c_id);
              }}
            >
              <td className="border p-2">{course.c_id}</td>
              <td className="border p-2">{course.c_name}</td>
              <td className="border p-2">{course.c_creditInfo}</td>
              <td className="border p-2">{course.recommendInstructors}</td>
              <td
                className="border p-2"
                onClick={() => handleTeacherAssignClick(course)}
              >
                {course.assignedToEmail === "null"
                  ? "Chưa giao"
                  : course.assignedTo}
              </td>
              <td className="border p-2">{course.assignedToEmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCourse && id && (
        <div className="border border-gray-200 p-4 mt-4">
          <h2 className="text-lg font-bold mb-2">Thông Tin Học Phần</h2>
          <p>
            <span className="font-semibold">Mã Học Phần:</span>{" "}
            {courseData2.find((course) => course.c_id === id)?.c_id}
          </p>
          <p>
            <span className="font-semibold">Tên Học Phần:</span>{" "}
            {selectedCourse.c_name}
          </p>
          <p>
            <span className="font-semibold">Số Tín Chỉ:</span>{" "}
            {selectedCourse.c_creditInfo}
          </p>
          <p>
            <span className="font-semibold">Giảng Viên Gợi Ý:</span>{" "}
            {selectedCourse.recommendInstructors}
          </p>
          <p>
            <span className="font-semibold">Giao cho giáo viên:</span>{" "}
            {selectedCourse.assignedTo}
          </p>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            {selectedCourse.assignedToEmail}
          </p>
          <p>
            <span className="font-semibold">Số sv đã xếp lịch:</span>{" "}
            {courseData2.find((course) => course.c_id === id)?.totalScheduled}
          </p>
          <p>
            <span className="font-semibold">Số sv:</span>{" "}
            {courseData2.find((course) => course.c_id === id)?.totalStudent}
          </p>
        </div>
      )}
      {/* Pagination controls */}
      <div className="mt-4">
        <button
          className={`px-4 py-2 bg-gray-200 rounded-md mr-2 ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-300"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`px-4 py-2 bg-gray-200 rounded-md ${
            currentCourses.length < itemsPerPage
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-300"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentCourses.length < itemsPerPage}
        >
          Next
        </button>
      </div>

      <div className="mt-5">Cập nhật giáo viên</div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        Chọn giáo viên để giao xếp lịch thi
        {recommendedTeachers.map((teacher, index) => (
          <div
            key={index}
            onClick={() => {
              const teacherId = getTeacherIdByName(teacher);
              console.log(`Selected teacher ID: ${teacherId}`);

              console.log(teacherId, id);
              if (teacherId && id) {
                handlePhanQuyen(teacherId, id);
              }

              setShowModal(false);
            }}
          >
            {teacher}
          </div>
        ))}
      </Modal>
    </div>
  );
};

export default HocPhan;
