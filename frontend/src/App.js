import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ReaderBooks from "./pages/reader/Books";
import AdminBooks from "./pages/admin/Books";
import Signup from "./pages/auth/Signup";
import Audits from "./pages/admin/Audits";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/reader/books" element={< ReaderBooks/>} />
        <Route path="/admin/books" element={<AdminBooks/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/admin/records" element={<Audits/>}/>
      </Routes>
    </Router>
  );
}

export default App;
