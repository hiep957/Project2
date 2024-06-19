import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const authContext = useContext(AuthContext);
  const { role, accessToken } = authContext ?? { role: "" };
  console.log(role);
  // if (role === "academic_affair") {
  const [user, setUser] = useState({ name: "" });

  if (role === "student") {
    console.log("student");
  } else {
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await fetch(
            `https://19df-42-113-220-219.ngrok-free.app/api/v1/${role}/profile`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                method: "GET",
                "ngrok-skip-browser-warning": "true",
              },
            }
          );
          const data = await response.json();
          setUser(data);

          console.log(user);
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      };

      if (role === "academic_affair" || role === "instructor") {
        fetchProfile();
      }
    }, [role, accessToken]);
  }

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

        {role === "academic_affair" ||
        role === "student" ||
        role === "instructor" ? (
          <div>
            Xin chào {role} {user?.name}
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link
              to="/"
              className="flex bg-buttonColor items-center text-white rounded
                            p-2 font-bold hover:bg-gray-100"
            >
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
