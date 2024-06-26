// App.tsx

// import PDFViewerComponent from "./PDFViewer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import HomePage from "./page/HomePage";
import Layout from "./layout/Layout";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Xeplich from "./page/Xeplich";
import HocPhan from "./page/HocPhan";
import CaiDatThoiGian from "./page/CaiDatThoiGian";
import BieuMau from "./page/BieuMau";
// import PDFViewerComponent from "./PDFViewer";
import TestSideBar from "./component/TestSideBar";
import EventSoict from "./component/EventSoict";
import GiaoVien from "./page/GiaoVien";
import Api from "./page/Api";
import ThemLichThi from "./page/ThemLichThi";
import Chucnang from "./page/Chucnang";
import DanhSachPhongMay from "./page/DanhSachPhongMay";
import DanhSachLopThi from "./page/DanhSachLopThi";
import TaiFileExcel from "./page/TaiFileExcel";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/sidebar" element={<TestSideBar></TestSideBar>}></Route> */}
        <Route path="/api" element={<Api></Api>}></Route>
        {/* <Route path="/pdf" element={<PDFViewerComponent />} /> */}
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>

        <Route
          path="/sinhvien"
          element={
            <>
              <Layout>
                <HomePage />
              </Layout>
            </>
          }
        />
        <Route
          path="/giaovu"
          element={
            <Layout>
              <div className="flex flex-row space-x-3">
                <TestSideBar></TestSideBar>

                <div className="w-4/6 border-r border-l p-2">
                  <Outlet />
                </div>

                <div className="w-1/6">
                  <EventSoict></EventSoict>
                </div>
              </div>
            </Layout>
          }
        >
          <Route index element={<Navigate to="xeplich" />} />
          <Route path="caidatthoigian" element={<CaiDatThoiGian />}></Route>
          <Route path="xeplich" element={<Xeplich />} />
          <Route path="hocphan" element={<HocPhan />} />
          {/* <Route path="bieumau" element={<BieuMau />} /> */}
        </Route>
        <Route
          path="/bieumau"
          element={
            <Layout>
              <div className="flex flex-row space-x-3">
                <TestSideBar></TestSideBar>
                <BieuMau></BieuMau>
                <EventSoict></EventSoict>
              </div>
            </Layout>
          }
        />

        <Route
          path="/giaovu/chucnang"
          element={
            <Layout>
              <div className="flex flex-row space-x-3">
                <TestSideBar></TestSideBar>
                <Chucnang></Chucnang>
                <EventSoict></EventSoict>
              </div>
            </Layout>
          }
        ></Route>

        <Route
          path="/giaovu/taifileexcel"
          element={
            <Layout>
              <div className="flex flex-row space-x-3">
                <TestSideBar></TestSideBar>
                <TaiFileExcel></TaiFileExcel>
                <EventSoict></EventSoict>
              </div>
            </Layout>
          }
        ></Route>
        <Route
          path="/giaovu/danhsachphongmay"
          element={
            <Layout>
              <div className="flex flex-row space-x-3">
                <TestSideBar></TestSideBar>
                <DanhSachPhongMay></DanhSachPhongMay>
                <EventSoict></EventSoict>
              </div>
            </Layout>
          }
        ></Route>

        <Route
          path="/giaovu/danhsachlopthi"
          element={
            <Layout>
              <div className="flex flex-row space-x-3">
                <TestSideBar></TestSideBar>
                <DanhSachLopThi></DanhSachLopThi>
              </div>
            </Layout>
          }
        ></Route>
        <Route
          path="/giaovien"
          element={
            <Layout>
              <GiaoVien></GiaoVien>
            </Layout>
          }
        ></Route>
        <Route
          path="/giaovien/themlichthi"
          element={
            <Layout>
              <ThemLichThi></ThemLichThi>
            </Layout>
          }
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
