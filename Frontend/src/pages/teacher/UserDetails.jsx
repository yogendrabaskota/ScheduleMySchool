/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // For notifications (optional)

const UserDetails = () => {
  const { userId } = useParams(); // Extract userId from the URL
  const [user, setUser] = useState(null); // State to store user details
  const [loading, setLoading] = useState(false); // State to manage loading state
  const [error, setError] = useState(""); // State to manage error message
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to get the token from localStorage
  const getToken = () => {
    return localStorage.getItem("token"); // Adjust to sessionStorage if necessary
  };

  // Fetch user details by ID
  const fetchUserDetails = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.get(
        `https://schedulemyschool.onrender.com/api/user/${userId}`,
        {
          headers: {
            Authorization: `${getToken()}`, // Add token to Authorization header
          },
        }
      );
      setUser(response.data.data); // Set user details
      setLoading(false); // Set loading state to false
    } catch (err) {
      setError("Failed to fetch user details. Please try again."); // Handle error
      setLoading(false); // Set loading state to false
    }
  };

  // Delete user by ID

  const role = localStorage.getItem("role")

  const deleteUser = async () => {
    try {
      await axios.delete(`https://schedulemyschool.onrender.com/api/user/delete/${userId}`, {
        headers: {
          Authorization: `${getToken()}`, // Add token to Authorization header
          role : role
        },
      });
      toast.success("User deleted successfully!"); // Optional: Display success notification
      alert("User deleted Successfully")
      navigate("/all-users"); // Navigate back to user list after deletion
    } catch (err) {
      toast.error("Failed to delete user. Please try again."); // Optional: Display error notification
      alert(err.response?.data?.message)
      navigate("/all-users")

    }
  };

  // Fetch user details when component mounts
  useEffect(() => {
    fetchUserDetails();
  }, [userId]); // Re-fetch details if userId changes

  // If loading, display loading message
  if (loading) return <div className="text-center mt-10">Loading...</div>;

  // If error, display error message
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  // If no user data, show a message
  if (!user) return <div className="text-center mt-10">No user details available.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200 w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">User Details</h1>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Role:</span> {user.role}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Status:</span>{" "}
            {user.isUserVerified ? "Verified" : "Not Verified"}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Phone:</span> {user.phoneNumber || "N/A"}
          </p>
        </div>
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Back
          </button>
          <button
            onClick={deleteUser} // Delete the user
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
