import React, { useState } from "react";

const Sidebar = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <div className="bg-slate-200 w-60">
      <div className="">
        <div className="text-xl p-4 flex justify-center items-center bg-blue-200 hover:bg-blue-400">
          Lớp giảng dạy
        </div>
        <div className="">
          <div className="text-md p-2 hover:bg-slate-400">Toán rời rạc</div>
          <div className="text-md p-2 hover:bg-slate-400">Lý thuyết thông tin</div>
          <div className="text-md p-2 hover:bg-slate-400">Trí tuệ nhân tạo</div>
        </div>
      </div>
      <div className="mt-4 text-xl p-4 flex justify-center items-center bg-blue-200 hover:bg-blue-400">
        Thêm lịch thi
      </div>
    </div>
  );
};

export default Sidebar;
