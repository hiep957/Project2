import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
// import { useState } from "react";
import { useForm } from "react-hook-form";
export type LoginForm = {
  email: string;
  password: string;
  role: string;
};
const Login = () => {
  const {
    register,
    watch,
    handleSubmit,
  } = useForm<LoginForm>();
  const role_input = watch("role");
  
  const onSubmit = handleSubmit(async () => {
    try {
      const response = await fetch(
        "https://8f51-113-190-119-178.ngrok-free.app/api/v1/auth/login",
        {
          method: "GET",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
          },
          // body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      // const responseData = await response.json();
      // console.log(responseData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
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
          <form
            className="flex flex-col items-center p-20 w-full"
            onSubmit={onSubmit}
          >
            <div className="font-bold ">Đăng nhập hệ thống</div>
            {/* <label className="flex flex-col w-full font-light mb-4">
              Email
              <input
                type="email"
                className="bg-gray-300 w-full rounded-lg p-2  text-sm "
                placeholder="Enter your email hear"
                required
                {...register("email", { required: "This field is required" })}
              />
              {errors.email && (
                <span className="text-red-500"> {errors.email.message}</span>
              )}
            </label>
            <label className="flex flex-col w-full font-light">
              Password
              <input
                className="bg-gray-300 w-full rounded-lg p-2  text-sm "
                placeholder="Enter your email hear"
                required
                {...register("password", {
                  required: "This field is required",
                })}
                type="password"
              />
              {errors.password && (
                <span className="text-red-500"> {errors.password.message}</span>
              )}
            </label> */}

            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="student"
                  {...register("role")}
                  className="form-radio text-blue-600 h-4 w-4"
                />
                <span className="ml-2">Sinh viên</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="instructor"
                  {...register("role")}
                  className="form-radio text-blue-600 h-4 w-4"
                />
                <span className="ml-2">Giáo viên</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="academic_affairs"
                  className="form-radio text-blue-600 h-4 w-4"
                  {...register("role")}
                />
                <span className="ml-2">Giáo vụ</span>
              </label>
            </div>

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
              Đăng nhập
            </button>

            <span className="font-sm mt-5"> - OR -</span>
            <div className="flex flex-row gap-x-2 mt-5">
              <button className="flex  border border-gray-300 rounded-lg text-md p-2">
                <FaMicrosoft  className="w-6 h-6 inline mr-2" />
                <a href={`https://7d87-42-113-220-219.ngrok-free.app/api/v1/auth/login?role=${role_input}`}>
                  Đăng nhập bằng Microsoft
                </a>
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

export default Login;
