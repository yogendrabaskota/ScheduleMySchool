import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    totalTickets: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://schedulemyschool.onrender.com/api/event",
        formData,
        { headers: { Authorization: `${token}` } }
      );

      if (response.status === 200) {
        setSuccess("Event created successfully!");
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          totalTickets: "",
        });
        setTimeout(() => navigate("/teacher-dashboard"), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the event."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (path) => navigate(path);
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
                onClick={() => handleNavigation("/create-event")}
                className="w-full flex items-center space-x-3 bg-white/20 text-white font-medium py-3 px-4 rounded-lg"
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
                onClick={() => handleNavigation("/your-event")}
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
                onClick={() => handleNavigation("/past-event")}
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
                onClick={() => handleNavigation("/all-users")}
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
        <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#212121]">
              Create New Event
            </h2>
            <p className="text-[#757575]">
              Fill out the form below to create a new school event
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
              <p>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-[#212121] mb-1"
              >
                Event Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3F51B5] focus:ring-2 focus:ring-[#3F51B5]/50 transition-colors"
                placeholder="Science Fair 2023"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-[#212121] mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3F51B5] focus:ring-2 focus:ring-[#3F51B5]/50 transition-colors"
                placeholder="Describe the event details..."
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-[#212121] mb-1"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3F51B5] focus:ring-2 focus:ring-[#3F51B5]/50 transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-[#212121] mb-1"
                >
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3F51B5] focus:ring-2 focus:ring-[#3F51B5]/50 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-[#212121] mb-1"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3F51B5] focus:ring-2 focus:ring-[#3F51B5]/50 transition-colors"
                placeholder="School Auditorium"
                required
              />
            </div>

            <div>
              <label
                htmlFor="totalTickets"
                className="block text-sm font-medium text-[#212121] mb-1"
              >
                Total Tickets Available
              </label>
              <input
                type="number"
                id="totalTickets"
                name="totalTickets"
                min="1"
                value={formData.totalTickets}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3F51B5] focus:ring-2 focus:ring-[#3F51B5]/50 transition-colors"
                placeholder="50"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#3F51B5] hover:bg-[#303F9F] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating Event...
                  </>
                ) : (
                  "Create Event"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
