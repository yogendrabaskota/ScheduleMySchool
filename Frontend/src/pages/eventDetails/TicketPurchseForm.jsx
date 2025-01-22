/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const TicketPurchaseForm = () => {
  const { id } = useParams(); // Get event ID from URL
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(''); // Start with an empty value
  const baseURL = 'http://localhost:5000';
  const navigate = useNavigate();

  useEffect(() => {
    // Get role from localStorage and set the payment method automatically
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (token) {
      if (role === 'teacher' || role === 'student') {
        setPaymentMethod('free'); // Auto-select 'free' for teacher or student
      } else if (role === 'guest') {
        setPaymentMethod('khalti'); // Auto-select 'khalti' for guest
      }
    } else {
      alert('You must be logged in to purchase tickets!');
    }
  }, []);

  const handlePurchase = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      alert('You need to log in to purchase tickets!');
      return;
    }

    if (role === 'guest') {
      try {
        // Create the ticket (first API call)
        const ticketResponse = await axios.post(
          `${baseURL}/api/ticket/${id}`,
          { quantity, paymentMethod },
          {
            headers: { Authorization: `${token}` },
          }
        );

        console.log('Ticket Response:', ticketResponse);

        if (!ticketResponse?.data?.data?._id) {
          console.error('Invalid response from ticket API:', ticketResponse.data);
          alert('Failed to fetch ticket details.');
          return;
        }

        const ticketNum = ticketResponse.data.data._id;
        const quantityFromResponse = ticketResponse.data.data.quantity;
        const initialAmount = 100*100; // Assuming each ticket costs 100
        const amount = initialAmount * quantityFromResponse;

        console.log('Extracted Ticket ID:', ticketNum);
        console.log('Calculated Amount:', amount);

        // Process payment (second API call)
        const paymentResponse = await axios.post(
          `${baseURL}/api/payment`,
          { ticketNum, amount },
          {
            headers: { Authorization: `${token}` },
          }
        );

        console.log('Payment Response:', paymentResponse.data);
        console.log('Payment URL:', paymentResponse.data.payment_url);

        // Redirect to Khalti payment page
        window.location.href = paymentResponse.data.payment_url;
      } catch (error) {
        console.error('Error during payment:', error);
        alert('An error occurred. Please try again.');
      }
      return;
    }

    try {
      // Purchase ticket directly for 'free' payment method
      const response = await axios.post(
        `${baseURL}/api/ticket/${id}`,
        { quantity, paymentMethod },
        {
          headers: { Authorization: `${token}` },
        }
      );

      alert('Ticket purchased successfully!');
      navigate('/'); // Redirect to home page after purchase
    } catch (error) {
      console.error('Error purchasing ticket:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Failed to purchase ticket. Please try again.');
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
              disabled // Dropdown is disabled because the value is auto-selected
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
