import React from 'react';
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Layout Components
import Footer from "./components/Footer";
import InstructorNavbar from "./components/instructorNavbar";
import ScrollToTop from "./components/ScrollToTop";

// Static pages
import WhoWeAre from "./pages/static/WhoWeAre";
import Programmes from "./pages/static/Programmes";
import News from "./pages/static/News";
import ContactUs from "./pages/static/ContactUs";

// Module pages
import SemesterDisplay from "./pages/instructor/SemesterDisplay";
import ModuleDisplay from "./pages/instructor/ModuleDisplay";
import UpdateModulePage from './pages/instructor/UpdateModulePage';
import DiplomaYearDisplay from "./pages/instructor/DiplomaYearDisplay";
import InstructorModuleDisplayPage from "./pages/instructor/InstructorModuleDisplayPage";
import YearDisplayPage from "./pages/instructor/YearDisplayPage";
import SemesterDisplayPage from "./pages/instructor/SemesterDisplayPage";
import AssignmentPerformancePage from "./pages/instructor/AssignmentPerformancePage";
import UserProfilePage from "./pages/instructor/UserProfilePage";
import ResetPasswordPage from "./pages/instructor/ResetPasswordPage";
import PasswordChangedSuccessfulPage from "./pages/instructor/PasswordChangedSuccessfulPage";
import AddModulePage from "./pages/instructor/AddModulePage";
import AssignmentDisplayPage from "./pages/instructor/AssignmentDisplayPage";
import AddAssignmentPage from "./pages/instructor/AddAssignmentPage";
import EditAssignmentPage from "./pages/instructor/EditAssignmentPage";

// Instructor dashboard
import InstructorDashboard from './pages/instructor/InstructorDashboard';

// Announcement
import AddAnnouncement from "./components/AddAnnouncement";
import AddedAnnouncement from "./components/AddedAnnouncement";
import UpdateAnnouncement from "./components/UpdateAnnouncement";

// Quiz
import AddQuiz from "./pages/instructor/AddQuiz";
import QuizList from "./pages/instructor/QuizList";
import UpdateQuiz from "./pages/instructor/UpdateQuiz";
import QuizPerformance from "./pages/instructor/QuizPerformance";

// Assignment
import AddAssignment from "./pages/instructor/AddAssignment";
import AddedAssignment from "./pages/instructor/AddedAssignment";
import EditAssignment from "./pages/instructor/EditAssignment";

// Lecture materials
import AddLectureMaterial from "./pages/instructor/AddLectureMaterial";
import AddedLectureMaterials from "./pages/instructor/AddedLectureMaterials";
import UpdateLectureMaterial from "./pages/instructor/UpdateLectureMaterial";

// Instructor support desk
import SupportForm from './pages/instructor/SupportForm';
import SupportList from './pages/instructor/SupportList';
import SucessRequest from './pages/instructor/SucessRequest'; 
import SupportDesk from "./pages/static/SupportDesk";
import SuccessfullyRequest from "./pages/static/SuccessfullyRequest";

function App() {
  return (
    <div>
      <InstructorNavbar />
      <ScrollToTop />
      <Routes>
        {/* Static Pages */}
        <Route path="/whoweare" element={<WhoWeAre />} />
        <Route path="/programmes" element={<Programmes />} />
        <Route path="/news" element={<News />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* Common Route */}
        <Route path="/" element={<InstructorDashboard />} />

        {/* Quiz Pages */}
        <Route path="/addquiz" element={<AddQuiz />} />
        <Route path="/quizlist" element={<QuizList />} />
        <Route path="/updatequiz/:id" element={<UpdateQuiz />} />
        <Route path="/quizperformance" element={<QuizPerformance />} />
        
        {/* Announcements */}
        <Route path="/addannouncement" element={<AddAnnouncement />} />
        <Route path="/addedannouncement" element={<AddedAnnouncement />} />
        <Route path="/updateannouncement/:id" element={<UpdateAnnouncement />} />

        {/* Assignment Pages */}
        <Route path="/addassignment" element={<AddAssignment />} />
        <Route path="/instructor/added-assignment" element={<AddedAssignment />} />
        <Route path="/instructor/edit-assignment/:id" element={<EditAssignment />} />

        {/* Lecture material page */}
        <Route path="/instructor/add-lecture-material/:courseId" element={<AddLectureMaterial />} />
        <Route path="/instructor/added-lecture-materials/:courseId" element={<AddedLectureMaterials />} />
        <Route path="/instructor/update-lecture-material/:id" element={<UpdateLectureMaterial />} />

        {/* Module page routes */}
        <Route path="/modules" element={<ModuleDisplay />} />
        <Route path="/modules/add" element={<AddModulePage />} />
        <Route path="/diploma-years" element={<DiplomaYearDisplay />} />
        <Route path="/modules/edit/:id" element={<UpdateModulePage />} />
        <Route path="/semester" element={<SemesterDisplay />} />
        <Route path="/instructor/years" element={<YearDisplayPage />} />
        <Route path="/instructor/semesters" element={<SemesterDisplayPage />} />
        <Route path="/instructor/modules" element={<ModuleDisplay />} />
        <Route path="/instructor/modules/:moduleId" element={<InstructorModuleDisplayPage />} />
        <Route path="/instructor/assignments" element={<AssignmentDisplayPage />} />
        <Route path="/instructor/assignments/:assignmentId/performance" element={<AssignmentPerformancePage />} />
        <Route path="/instructor/profile" element={<UserProfilePage />} />
        <Route path="/instructor/reset-password" element={<ResetPasswordPage />} />
        <Route path="/instructor/password-changed-successful" element={<PasswordChangedSuccessfulPage />} />
        <Route path="/instructor/modules/:moduleId/assignments/add" element={<AddAssignmentPage />} />
        <Route path="/instructor/modules/:moduleId/assignments/:assignmentId/edit" element={<EditAssignmentPage />} />

        {/* Lecture Support Desk */}
        <Route path="/instructor/sucess-request" element={<SucessRequest />} />
        <Route path="/instructor/support-list" element={<SupportList />} />
        <Route path="/instructor/supportform" element={<SupportForm />} />
        <Route path="/support-request" element={<SupportForm />} />
        <Route path="/supportdesk" element={<SupportDesk />} />
        <Route path="/successfully-request" element={<SuccessfullyRequest />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;