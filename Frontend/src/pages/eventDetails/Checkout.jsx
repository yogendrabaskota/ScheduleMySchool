import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const { id } = useParams(); // Get event ID from URL
  const [ticketDetails, setTicketDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch ticket details for the guest user
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to log in to proceed!');
      navigate('/');
    }

    // Fetch ticket details for the event
    const fetchTicketDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/ticket/${id}`,
          {
            headers: { Authorization: `${token}` },
          }
        );
        setTicketDetails(response.data.data); // Assuming this will contain ticket info
      } catch (error) {
        console.error('Error fetching ticket details:', error);
        alert('Failed to load ticket details.');
      }
    };

    fetchTicketDetails();
  }, [id, navigate]);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You need to log in to proceed with the payment!');
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/payment/${id}`,
        { status: 'paid' },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPaymentStatus('paid'); // Set payment status to 'paid'
      alert('Payment Successful! Your ticket has been booked.');
      navigate('/'); // Redirect to homepage or wherever necessary

    } catch (error) {
      console.error('Error during payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  if (!ticketDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-8">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Loading Ticket Details...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h1>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Event Details</h3>
          <p className="text-gray-600">Event ID: {ticketDetails.eventId}</p>
          <p className="text-gray-600">Quantity: {ticketDetails.quantity}</p>
          <p className="text-gray-600">Total Price: {/* Implement price logic here */} Free</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-700">Payment Status</h3>
          <p className="text-gray-600">Status: {paymentStatus === 'pending' ? 'Pending' : 'Paid'}</p>
        </div>

        {paymentStatus === 'pending' && (
          <button
            onClick={handlePayment}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Pay Now (Khalti)
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
