import React from 'react';
import { Routes, Route } from "react-router-dom";
import SemesterDisplay from "./pages/instructor/SemesterDisplay";
import ModuleDisplay from "./pages/instructor/ModuleDisplay";
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
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/modules" element={<ModuleDisplay />} />
        <Route path="/modules/add" element={<AddModulePage />} />
        <Route path="/diploma-years" element={<DiplomaYearDisplay />} />
        <Route path="/semester" element={<SemesterDisplay />} />
        <Route path="/instructor/years" element={<YearDisplayPage />} />
        <Route path="/instructor/semesters" element={<SemesterDisplayPage />} />
        <Route path="/instructor/modules/:moduleId" element={<InstructorModuleDisplayPage />} />
        <Route path="/instructor/assignments" element={<AssignmentDisplayPage />} />
        <Route path="/instructor/assignments/:assignmentId/performance" element={<AssignmentPerformancePage />} />
        <Route path="/instructor/profile" element={<UserProfilePage />} />
        <Route path="/instructor/reset-password" element={<ResetPasswordPage />} />
        <Route path="/instructor/password-changed-successful" element={<PasswordChangedSuccessfulPage />} />
        <Route path="/instructor/modules/:moduleId/assignments/add" element={<AddAssignmentPage />} />
        <Route path="/instructor/modules/:moduleId/assignments/:assignmentId/edit" element={<EditAssignmentPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
