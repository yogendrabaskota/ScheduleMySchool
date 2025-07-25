/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AdminSidebar from "../admin/sidebar/Sidebar";
// import Sidebar from "./component/Sidebar";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");
  const getUserRole = () => localStorage.getItem("role");

  useEffect(() => {
    const role = getUserRole();
    if (role) setUserRole(role);
  }, []);

  const axiosInstance = axios.create({
    headers: { Authorization: `${getToken()}` },
  });

  const fetchVerifiedUsers = async () => {
    try {
      const response = await axiosInstance.get(
        "https://schedulemyschool.onrender.com/api/user/verified"
      );
      setUsers(response.data.data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeeRequestClick = () => navigate("/user-verification");
  const handleProfile = () => {
    const token = getToken();
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

  useEffect(() => {
    fetchVerifiedUsers();
  }, []);

  const categorizedUsers = {
    teachers: users.filter((user) => user.role === "teacher"),
    students: users.filter((user) => user.role === "student"),
    guests: users.filter((user) => user.role === "guest"),
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Sidebar */}
      {/* <div className="w-72 bg-[#3F51B5] text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {userRole === "admin" ? "Admin Dashboard" : "Teacher Dashboard"}
          </h1>
          <div className="w-16 h-1 bg-[#00BCD4]"></div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-3">
            {userRole !== "admin" && (
              <>
                <li>
                  <button
                    onClick={() => navigate("/create-event")}
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
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Create Event</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/your-event")}
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
                    onClick={() => navigate("/past-event")}
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
              </>
            )}
            <li>
              <button
                onClick={() => navigate("/all-users")}
                className="w-full flex items-center space-x-3 bg-white/20 text-white font-medium py-3 px-4 rounded-lg"
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
      </div> */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#212121]">
              User Management
            </h2>
            {userRole === "admin" && (
              <button
                onClick={handleSeeRequestClick}
                className="bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                View Verification Requests
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3F51B5]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
              <p>{error}</p>
            </div>
          ) : (
            Object.keys(categorizedUsers).map((category) => (
              <div key={category} className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-[#212121] capitalize">
                    {category} ({categorizedUsers[category].length})
                  </h3>
                </div>

                {categorizedUsers[category].length === 0 ? (
                  <div className="text-center py-6 bg-[#FAFAFA] rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-[#9E9E9E]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <p className="text-[#757575] mt-2">No {category} found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorizedUsers[category].map((user) => (
                      <div
                        key={user._id}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center mb-4">
                          <div className="bg-[#3F51B5] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#212121]">
                              {user.name}
                            </h4>
                            <p className="text-sm text-[#757575]">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#757575]">Role:</span>
                            <span className="font-medium capitalize">
                              {user.role}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#757575]">Status:</span>
                            <span
                              className={`font-medium ${
                                user.isUserVerified
                                  ? "text-[#4CAF50]"
                                  : "text-[#F44336]"
                              }`}
                            >
                              {user.isUserVerified
                                ? "Verified"
                                : "Not Verified"}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/user-details/${user._id}`)}
                          className="w-full mt-4 bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManager;
