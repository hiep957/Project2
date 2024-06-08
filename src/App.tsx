// App.tsx

import React from "react";
import PDFViewerComponent from "./PDFViewer";
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
import HomePageGiaoVu from "./page/HomePageGiaoVu";
import Tab from "./component/Tab";
import EventSoict from "./component/EventSoict";
import Xeplich from "./page/Xeplich";
import HocPhan from "./page/HocPhan";
import CaiDatThoiGian from "./page/CaiDatThoiGian";
import BieuMau from "./page/BieuMau";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/pdf" element={<PDFViewerComponent />} />
        <Route
          path="/"
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
              {/* <div className="flex">
                <Tab />
                <div 
                className=" max-w-2xl border p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400
                 dark:bg-gray-800 rounded-lg mr-3 ml-3 "
                 >
                  <Outlet />
                </div>

                <EventSoict />
              </div> */}
              <HomePageGiaoVu />
            </Layout>
          }
        >
          {/* <Route index element={<Navigate to="xeplich" />} />
          <Route path="caidatthoigian" element={<CaiDatThoiGian/>}></Route>
          <Route path="xeplich" element={<Xeplich />} />
          <Route path="hocphan" element={<HocPhan />} />
          <Route path="bieumau" element={<BieuMau/>}/> */}
        </Route>
         
      </Routes>
    </Router>
  
  );
};

export default App;
