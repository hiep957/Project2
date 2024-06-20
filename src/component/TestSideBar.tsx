import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
// import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

const TestSideBar = () => {
  const menus = [
    { name: "Xếp lịch", link: "/giaovu/xeplich", icon: MdOutlineDashboard },
    {
      name: "Cài đặt thời gian",
      link: "/giaovu/caidatthoigian",
      icon: AiOutlineUser,
    },
    { name: "Học phần", link: "/giaovu/hocphan", icon: FiMessageSquare },

    {
      name: "Danh sách phòng máy",
      link: "/giaovu/danhsachphongmay",
      icon: AiOutlineUser,
      margin: true,
    },
    {
      name: "Danh sách lớp thi",
      link: "/giaovu/danhsachlopthi",
      icon: FiMessageSquare,
      margin: true,
    },
    {
      name: "Tải file excel",
      link: "/giaovu/taifileexcel",
      icon: TbReportAnalytics,
      margin: true,
    },
    {
      name: "Biểu mẫu",
      link: "/bieumau",
      icon: TbReportAnalytics,
      margin: true,
    },
  ];
  const [open, setOpen] = useState(true);
  return (
    <section className="flex gap-6 w-1/6  ">
      <div
        className={`bg-blue-200  ${
          open ? "w-72" : "w-16"
        } duration-500 text-black-200  px-4 self-start py-4`}
      >
        <div className=" flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${menu?.margin} group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-300 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre  ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-black rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestSideBar;
