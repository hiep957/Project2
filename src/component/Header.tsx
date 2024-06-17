import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const authContext = useContext(AuthContext);
  const {role} = authContext ?? { role: "" };
  return (
    <div className="bg-headerColor">
      <div className="container mx-auto flex items-center">
        <img
          src="src/assets/soict.png"
          alt=""
          className="object-fil h-20 w-20 ml-4"
        />
        <div className="ml-3 font-bold flex-grow">
          <div>Trường Công nghệ thông tin và truyền thông</div>
          <div>Hệ thống quản lý lịch thi</div>
        </div>
        
        <div className="flex space-x-2">
          <Link
            to="/signin"
            className="flex bg-buttonColor items-center text-white rounded
                            p-2 font-bold hover:bg-gray-100"
          >
            Đăng ký
          </Link>
          <Link
            to="/signin"
            className="flex bg-buttonColor items-center text-white rounded
                            p-2 font-bold hover:bg-gray-100"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
