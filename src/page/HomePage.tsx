import EventSoict from "../component/EventSoict";
import ExamStudent from "../component/ExamStudent";
import SearchBar from "../component/SearchBar";
import Swiper1 from "../component/Swiper";

const itemSearch = ["MSSV", "Lớp", "Mã học phần"];

const HomePage = () => {
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

          <SearchBar></SearchBar>

          <div>
            <span>Bạn có 4 lớp thi</span>
          </div>

          <div className="flex gap-x-10">
            <div className="bg-gray-300 p-4 rounded-md text-sm flex flex-col space-y-2 self-start ">
              <div className="text-xl">Thông tin sinh viên</div>
              <div>Họ và tên: Mã Tiến Hiệp</div>
              <div>Ngày sinh: 16-02-2003</div>
              <div>Lớp: Khoa học máy tính K66</div>
            </div>
            <div className="flex flex-col space-y-4">
              <ExamStudent></ExamStudent>
              <ExamStudent></ExamStudent>
              <ExamStudent></ExamStudent>
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
