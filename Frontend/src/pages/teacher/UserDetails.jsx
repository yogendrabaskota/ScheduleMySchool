import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const getToken = () => localStorage.getItem("token");

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `https://schedulemyschool.onrender.com/api/user/${userId}`,
        { headers: { Authorization: getToken() } }
      );
      setUser(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch user details");
      toast.error("Failed to load user details");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (!window.confirm("Are you sure you want to delete this user account?"))
      return;

    setIsDeleting(true);
    try {
      await axios.delete(
        `https://schedulemyschool.onrender.com/api/user/delete/${userId}`,
        { headers: { Authorization: getToken(), role } }
      );
      toast.success("User deleted successfully!");
      navigate("/all-users");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#3F51B5] border-t-transparent"></div>
          <p className="mt-4 text-lg font-medium text-[#212121]">
            Loading user details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-[#212121] mt-4">
            Error Loading User
          </h2>
          <p className="text-[#757575] mt-2">{error}</p>
          <button
            onClick={() => navigate("/all-users")}
            className="mt-6 bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-[#9E9E9E]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-[#212121] mt-4">
            No User Found
          </h2>
          <p className="text-[#757575] mt-2">
            The requested user details are not available
          </p>
          <button
            onClick={() => navigate("/all-users")}
            className="mt-6 bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-[#3F51B5] p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">User Details</h1>
                <p className="text-[#E0E0E0] mt-1">ID: {user._id}</p>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="mt-4 md:mt-0 bg-white text-[#3F51B5] hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* User Avatar */}
              <div className="flex flex-col items-center">
                <div className="h-32 w-32 rounded-full bg-[#3F51B5] flex items-center justify-center text-white text-5xl font-bold mb-4">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.isUserVerified
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.isUserVerified ? "Verified" : "Not Verified"}
                </span>
              </div>

              {/* User Details */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-[#757575]">
                      Full Name
                    </h3>
                    <p className="text-lg font-medium mt-1">{user.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#757575]">
                      Email Address
                    </h3>
                    <p className="text-lg font-medium mt-1">{user.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#757575]">Role</h3>
                    <p className="text-lg font-medium mt-1 capitalize">
                      {user.role}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#757575]">
                      Phone Number
                    </h3>
                    <p className="text-lg font-medium mt-1">
                      {user.phoneNumber || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#757575]">
                      Account Created
                    </h3>
                    <p className="text-lg font-medium mt-1">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#757575]">
                      Last Updated
                    </h3>
                    <p className="text-lg font-medium mt-1">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => navigate(`/user-details/${user._id}`)}
                className="bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Edit User
              </button>
              <button
                onClick={deleteUser}
                disabled={isDeleting}
                className={`bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center ${
                  isDeleting ? "opacity-75" : ""
                }`}
              >
                {isDeleting ? (
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
                    Deleting...
                  </>
                ) : (
                  "Delete User"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
