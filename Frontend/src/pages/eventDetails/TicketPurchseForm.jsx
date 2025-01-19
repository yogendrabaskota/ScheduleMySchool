/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TicketPurchaseForm = () => {
  const { id } = useParams(); // Get event ID from URL
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(''); // Start with an empty value
  const baseURL = 'http://localhost:5000';
  const navigate = useNavigate()

  useEffect(() => {
    // Get role from localStorage and set the payment method
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      if (role === 'teacher' || role === 'student') {
        setPaymentMethod('free'); // Automatically choose 'free' for teacher or student
      } else if (role === 'guest') {
        setPaymentMethod('khalti'); // Automatically choose 'khalti' for guest
      }
    } else {
      alert('You must be logged in to purchase tickets!');
    }
  }, []);

  const handlePurchase = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in to purchase tickets!');
        return;
      }

      const response = await axios.post(
        `${baseURL}/api/ticket/${id}`,
        { quantity, paymentMethod },
        {
          headers: { Authorization: `${token}` },
        }
      );

      alert('Ticket purchased successfully!');
      navigate("/")
      
    } catch (error) {
      console.error('Error purchasing ticket:', error.response?.data?.message || error.message);
      alert(error.response.data.message)
      //alert('Failed to purchase ticket. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Purchase Ticket</h1>
        <form onSubmit={handlePurchase}>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 font-semibold mb-2">
              Ticket Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded-lg"
              disabled // Disable the dropdown since the value is auto-selected
            >
              <option value="free">Free</option>
              <option value="khalti">Khalti</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketPurchaseForm;
