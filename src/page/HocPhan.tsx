import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const dataHocPhan = ["Tin học đại cương","Thuật toán ứng dụng","Nhập môn công nghệ phần mềm"]
const HocPhan = () => {
  const context = useContext(AuthContext);
  const { role } = context || {};

  console.log(role);
  return (
        <div className="flex flex-col w-4/6">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Học phần
        </h3>
        <div>
          Tổng cộng trong kỳ học có 30 học phần
        </div>
        <select className="w-1/3 bg-red border p-2">
          {dataHocPhan.map((hocphan, index) => (
            <option key={index} value={hocphan}>
              {hocphan}
            </option>
          ))}
        </select>
        </div>
    )
}

export default HocPhan