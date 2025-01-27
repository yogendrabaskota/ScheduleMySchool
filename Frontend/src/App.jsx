
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './global/components/Navbar'
import Home from './pages/home/Home'
import EventDetails from './pages/eventDetails/EventDetails'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgetPassword'
import ResetPassword from './pages/auth/ResetPassword'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import CreateEvent from './pages/teacher/CreateEvent'
import YourEvents from './pages/teacher/YourEvent'
import UpdateEvent from './pages/teacher/UpdateEvent'
import Report from './pages/teacher/Report'
import UserVerification from './pages/auth/UserVerification'
import UserManager from './pages/teacher/UserManager'
import PastEvents from './pages/teacher/PastEvent'
import TicketPurchaseForm from './pages/eventDetails/TicketPurchseForm'
import StudentDashboard from './pages/student/StudentDashboard'
import ProfileManager from './pages/student/Profile'
import TicketPage from './pages/student/TicketPage'
import GetYourTicket from './pages/student/GetYourTicket'
import UserDetails from './pages/teacher/UserDetails'
import GuestDashboard from './pages/guest/GuestDashboard'
import TeacherProfile from './pages/teacher/TeacherProfile'
import VerifyPage from './pages/teacher/VerifyPage'
import Contact from './pages/home/Contact'
import AboutUs from './pages/home/AboutUs'
import HistoryPage from './pages/student/HistoryPage'


function App() {
 

  return (
    <>
  
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/About" element={<AboutUs />} />

      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/your-event" element={<YourEvents />} />
      <Route path="/event/update/:id" element={<UpdateEvent />} />
      <Route path="/event/report/:id" element={<Report />} />
      <Route path="/all-users" element={<UserManager />} />
      <Route path="/user-verification" element={<UserVerification />} />
      <Route path="/past-event" element={<PastEvents />} />
      <Route path="/ticket-purchase/:id" element={<TicketPurchaseForm />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/profile/:id" element={<ProfileManager />} />
      <Route path="/ticket" element={<TicketPage />} />
      <Route path="/ticket/:id" element={<GetYourTicket />} />
      <Route path="/user-details/:userId" element={<UserDetails />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/guest-dashboard" element={<GuestDashboard />} />
      <Route path="/teacherprofile/:id" element={<TeacherProfile />} />
      <Route path="/verify-page" element={<VerifyPage />} />




    </Routes>
      
    
    
    </BrowserRouter>
    
    </>


      
    
  )
}

export default App