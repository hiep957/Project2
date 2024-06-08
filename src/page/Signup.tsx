import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FcGoogle  } from "react-icons/fc";
const Signup = () => {
  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen p-20">
      <div className=" bg-white flex rounded w-4/5 ">
        <div className="w-2/5 relative  bg-headerColor flex items-center  justify-center rounded ">
          <img
            src="src/assets/soict.png"
            alt=""
            className="h-[40] w-[40] p-28 rounded "
          />
        </div>

        <div className="flex items-center justify-center w-3/5 ">
          <form className="flex flex-col items-center p-20 w-full">
            <div className="font-bold ">Đăng nhập hệ thống</div>
            <label className="flex flex-col w-full font-light  mb-4">
              FullName
              <input
                className="bg-gray-300 w-full rounded-lg p-2  text-sm "
                placeholder="Enter your Full Name here"
              />
            </label> 
            <label className="flex flex-col w-full font-light mb-4">
              Email
              <input
                className="bg-gray-300 w-full rounded-lg p-2  text-sm "
                placeholder="Enter your email hear"
              />
            </label>
            <label className="flex flex-col w-full font-light  mb-4">
              Password
              <input
                className="bg-gray-300 w-full rounded-lg p-2  text-sm "
                placeholder="Enter your email hear"
              />
            </label>

            <label className="flex flex-col w-full font-light">
              Role
              <input
                className="bg-gray-300 w-full rounded-lg p-2  text-sm "
                placeholder="Enter your role hear"
              />
            </label>

            <span className="flex items-center justify-between mt-4">
              <span className="text-sm">
                Not Registered?{" "}
                <Link className="underline" to="/register">
                  Create an account here
                </Link>
              </span>
            </span>

            <button
              type="submit"
              className="bg-blue-200 text-black p-2 font-sm hover:bg-blue-300 text-sm rounded mt-4 "
            >
              Đăng ký
            </button>

            <span className="font-sm mt-5"> - OR -</span>
            <div className="flex flex-row gap-x-2 mt-5">
              <button className="flex  border border-gray-300 rounded-lg text-md p-2">
                <FcGoogle className="w-6 h-6 inline mr-2" />
                Đăng nhập bằng Google
              </button>
              <button className="flex  border border-gray-300 rounded-lg text-md p-2">
                <FaGithub className="w-6 h-6 inline mr-2" />
                Đăng nhập bằng Github
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
