// import  { useState } from "react";

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Sidebar = () => {
  return (
    <div className="bg-slate-200 w-60">
      <div className="">
        <div className="text-xl p-4 flex justify-center items-center bg-blue-200 hover:bg-blue-400">
          <Link to="/giaovien">
            <button>Lớp giảng dạy</button>
          </Link>
        </div>
      </div>
      <div className="mt-4 text-xl p-4 flex justify-center items-center bg-blue-200 hover:bg-blue-400">
        <Link to="/giaovien/themlichthi">
          <button>Thêm lịch thi</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
