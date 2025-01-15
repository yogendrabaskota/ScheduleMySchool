import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
  });
  const [isOtpSent, setIsOtpSent] = useState(false);  // State to control OTP input visibility
  const [message, setMessage] = useState('');  // To display any error or success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      // Send email to get OTP
      try {
        const response = await axios.post('http://localhost:5000/api/auth/forgetpassword', { email: formData.email });

        if (response.status === 200) {
          setIsOtpSent(true);  // Show OTP input field if OTP is sent
          setMessage('OTP sent to your email. Please check your inbox.');
        }
      } catch (error) {
        console.error(error);
        setMessage('Error sending OTP. Please try again.');
      }
    } else {
      // Verify OTP after sending it
      try {
        const response = await axios.post('http://localhost:5000/api/auth/verifyOtp', { email: formData.email, otp: formData.otp });

        if (response.status === 200) {
          // Redirect to reset password page after OTP is verified
          navigate('/reset-password');
        }
      } catch (error) {
        console.error(error);
        setMessage('Invalid OTP. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 w-96 mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      
      {/* Email Input */}
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        required
      />

      {/* Show OTP input field only after clicking "Send OTP" */}
      {isOtpSent && (
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
          required
        />
      )}

      {/* Message display */}
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}

      {/* Submit Button */}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4">
        {isOtpSent ? 'Verify OTP' : 'Send OTP'}
      </button>
    </form>
  );
};

export default ForgotPassword;
