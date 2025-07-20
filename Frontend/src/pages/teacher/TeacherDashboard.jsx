/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => navigate("/create-event");
  const handleYourEvent = () => navigate("/your-event");
  const handlePastEvents = () => navigate("/past-event");
  const handleAllUsers = () => navigate("/all-users");
  const handleProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      navigate(`/teacherprofile/${decodedToken.id}`);
    } else {
      alert("User not authenticated!");
      navigate("/login");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Sidebar */}
      <div className="w-72 bg-[#3F51B5] text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Teacher Dashboard</h1>
          <div className="w-16 h-1 bg-[#00BCD4]"></div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-3">
            <li>
              <button
                onClick={handleCreateEvent}
                className="w-full flex items-center space-x-3 bg-[#FF9800] hover:bg-[#F57C00] text-[#212121] font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Create Event</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleYourEvent}
                className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Your Events</span>
              </button>
            </li>
            <li>
              <button
                onClick={handlePastEvents}
                className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Past Events</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleAllUsers}
                className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
                <span>User Manager</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleProfile}
                className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-[#212121] mb-4">
            Welcome Back, Teacher!
          </h2>
          <p className="text-[#757575] mb-6">
            Manage your events, view student participation, and update your
            profile from this dashboard.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Quick Stats Cards */}
            <div className="bg-[#00BCD4]/10 p-6 rounded-lg border-l-4 border-[#00BCD4]">
              <h3 className="text-lg font-semibold text-[#212121] mb-2">
                Upcoming Events
              </h3>
              <p className="text-3xl font-bold text-[#00BCD4]">5</p>
            </div>
            <div className="bg-[#FF9800]/10 p-6 rounded-lg border-l-4 border-[#FF9800]">
              <h3 className="text-lg font-semibold text-[#212121] mb-2">
                Students Registered
              </h3>
              <p className="text-3xl font-bold text-[#FF9800]">42</p>
            </div>
            <div className="bg-[#4CAF50]/10 p-6 rounded-lg border-l-4 border-[#4CAF50]">
              <h3 className="text-lg font-semibold text-[#212121] mb-2">
                Past Events
              </h3>
              <p className="text-3xl font-bold text-[#4CAF50]">12</p>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-[#212121] mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start p-4 bg-[#FAFAFA] rounded-lg">
                <div className="bg-[#3F51B5] text-white p-2 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#212121]">
                    You created a new event "Science Fair 2023"
                  </p>
                  <p className="text-sm text-[#757575]">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start p-4 bg-[#FAFAFA] rounded-lg">
                <div className="bg-[#4CAF50] text-white p-2 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-[#212121]">
                    15 students registered for "Math Olympiad"
                  </p>
                  <p className="text-sm text-[#757575]">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
