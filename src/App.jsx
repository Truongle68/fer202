import React from "react";
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import DashBoard from "./components/Dashboard";
import AddStudent from "./components/AddForm";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailPage from "./components/Detail";
import UpdateForm from "./components/UpdateForm";
import NavbarHeader from "./components/Navbar";
// import FullDetailPage from "./components/FullDetail";


const App = () => {
  return(
    <Router>
      <NavbarHeader/>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/detail" element={<FullDetailPage/>} /> */}
        <Route path="/detail/:id" element={<DetailPage/>} />
        <Route path="/dashboard" element={<DashBoard/>} />
        <Route path="/addform" element={<AddStudent/>} />
        <Route path="/updateform/:id" element={<UpdateForm/>} />
      </Routes>
     <ToastContainer/>
    </Router>
  )
}

export default App