import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  // Update form data on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the server
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      if (response.status === 200) {
        // Save token and role in localStorage
        const { data, role } = response.data; // Assuming response contains token and role
        localStorage.setItem('token', data);
        localStorage.setItem('role', role);

        // Show success message and redirect
        alert(response.data.message);
        navigate('/');
      } else {
        alert(response.data.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        alert(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        // No response from the server
        alert('No response from the server. Please check your connection.');
      } else {
        // Other errors
        alert('An error occurred: ' + error.message);
      }
    }
  };

  // Handle forgot password click
  const handleForgotPassword = () => {
    navigate('/forget-password'); // Navigate to Forgot Password page
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 w-96 mx-auto bg-white shadow-md rounded-md"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
      >
        Login
      </button>
      <button
        type="button"
        onClick={handleForgotPassword}
        className="text-blue-500 hover:text-blue-700 text-sm w-full text-center"
      >
        Forgot Password?
      </button>
    </form>
  );
};

export default Login;
