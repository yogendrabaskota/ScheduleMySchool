import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/resetPassword', formData);

      if (response.status === 200) {
        setMessage('Password reset successful. Redirecting to login page..');
        setTimeout(() => {
          navigate('/login');  // Redirect to login page after password reset
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 w-96 mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

      {/* New Password Input */}
      <input
        type="email"
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required
      />

      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={formData.newPassword}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required
      />

      {/* Confirm Password Input */}
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required
      />

      {/* Message display */}
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
