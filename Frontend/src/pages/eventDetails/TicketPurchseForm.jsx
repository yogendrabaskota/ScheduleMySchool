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

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      alert('You need to log in to purchase tickets!');
      return;
    }

    if (paymentMethod === 'khalti') {
      try {
        // First API call to create the ticket
        const ticketResponse = await axios.post(
          `${baseURL}/api/ticket/${id}`,
          { quantity, paymentMethod },
          {
            headers: { Authorization: `${token}` },
          }
        );
    
        // Log the full ticket response for debugging
        console.log("Ticket Response:", ticketResponse);
    
        // Ensure the response data structure is correct
        if (!ticketResponse?.data?.data?._id) {
          console.error('Invalid response from ticket API:', ticketResponse.data);
          alert('Failed to fetch ticket details.');
          return;
        }
    
        // Extract the ticket ID (_id) from the response
        const ticketNum = ticketResponse.data.data._id; // Use _id from the ticket model
        const quantityFromResponse = ticketResponse.data.data.quantity; // Ensure this is initialized properly
        const initialAmount = 100;  // Assuming each ticket is priced 100
        const amount = initialAmount * quantityFromResponse;  // Calculate amount based on quantity
    
        console.log("Extracted Ticket ID:", ticketNum);
        console.log("Calculated Amount:", amount);
    
        // Second API call using the extracted _id as ticketNum
        const paymentResponse = await axios.post(
          `${baseURL}/api/payment`,
          { ticketNum, amount },
          {
            headers: { Authorization: `${token}` },
          }
        );
    
        // Redirect user to the Khalti payment page
      
        console.log("payment url",paymentResponse.data.payment_url)
        window.location.href = paymentResponse.data.payment_url;  // Use the payment URL from the response
        console.log('Payment Response:', paymentResponse.data);
      } catch (error) {
        console.error('Error during payment:', error);
        alert('An error occurred. Please try again.');
      }
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/ticket/${id}`,
        { quantity, paymentMethod },
        {
          headers: { Authorization: `${token}` },
        }
      );

      alert('Ticket purchased successfully!');
      navigate("/"); // Redirect to home or any other page after successful purchase
      
    } catch (error) {
      console.error('Error purchasing ticket 1:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Failed to purchase ticket. Please try again. 1');
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
