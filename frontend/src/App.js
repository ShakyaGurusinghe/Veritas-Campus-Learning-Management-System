import React from 'react';
import { Route, Routes } from "react-router-dom";
import Button from './components/Button';
import Footer from './components/Footer';
import Home from "./pages/static/Home";
import Navbar from "./components/Navbar";
import WhoWeAre from "./pages/static/WhoWeAre";
import Programmes from "./pages/static/Programmes";
import News from "./pages/static/News";
import ContactUs from "./pages/static/ContactUs";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import AssignmentSubmission from "./pages/student/AssignmentSubmission";


function App() {
  return (
    <div>
      <Navbar/>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/news" element={<News />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/assignment" element={<AssignmentSubmission />} />
      </Routes>
      <Button/>
    
      <Footer />
    </div>
  );
}

export default App;
