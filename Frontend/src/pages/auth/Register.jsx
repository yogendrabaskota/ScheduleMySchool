/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    username: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://schedulemyschool.onrender.com/api/auth/register', formData);
      //alert(response.data.message);
      navigate('/login')

    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 w-96 mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required = 'email is required'
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required = 'password is required'
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required = 'phonenumber is required'
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required = 'username is required'
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required = 'role is required'
      >
        <option value="">Select Role</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
        <option value="student">Guest</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default Register;
