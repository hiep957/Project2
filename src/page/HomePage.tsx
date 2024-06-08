import EventSoict from "../component/EventSoict";
import SearchBar from "../component/SearchBar";

const HomePage = () => {
  return (
    <div className="flex flex-row justify-between gap-x-5">

      <div className="bg-white  flex-1 w-1/6">
        <div>Danh sách lựa chọn tìm kiếm</div>
        <div className=" items-center justify-center bg-slate-200 p-2 gap-y-5">
          <div>MSSV</div>
          <div>MSSV</div>
          <div>MSSV</div>
        </div>
      </div>


      <div className="bg-white  gap-y-4  flex-4 w-3/6 ">
        <div>Thông tin sinh viên</div>

        <SearchBar ></SearchBar>

        <div className="flex flex-row bg-gray-300 gap-x-2 p-4 rounded-md">
          <div className="text-sm flex flex-col gap-y-2 mr-6 ml-3">
            <div>739962-Thuật toán ứng dụng</div>
            <div>Kíp thi</div>
            <div>STT:11</div>
          </div>
          <div className="text-sm flex flex-col gap-y-2 ">
            <div>739962-Thuật toán ứng dụng</div>
            <div>Kíp thi</div>
            <div>STT:11</div>
          </div>
        </div>
      </div>
      <div className=" bg-slate-200 w-2/6">
        <div className="text-sm">Sự kiện nổi bật</div>
        <EventSoict></EventSoict>
      </div>
    </div>
  );
};

export default HomePage;
