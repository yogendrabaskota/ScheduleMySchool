import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      // Save the token in local storage
      localStorage.setItem('token', response.data.data);
      
      alert(response.data.message);
      
      // Redirect to the home page
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  const handleForgotPassword = () => {
    // Redirect to forgot password page or show a modal
    navigate('/forget-password');  // Replace with your Forgot Password route
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 w-96 mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2">
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
