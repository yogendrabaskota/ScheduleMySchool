import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const navigate = useNavigate(); // To redirect
  const baseURL = 'https://schedulemyschool.onrender.com';

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/event/${id}`);
        setEvent(response.data.data); // Set the event details state
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (!event) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const handleRegister = () => {
    navigate(`/ticket-purchase/${id}`); // Redirect to ticket purchasing form
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{event.title}</h1>
        <p className="text-gray-600 text-lg mb-6">{event.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div className="text-gray-700">
            <span className="font-semibold">📍 Location:</span> {event.location}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">📅 Date:</span> {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">⏰ Time:</span> {event.time}
          </div>
          <div className={`text-sm font-bold ${event.totalTickets - event.ticketsBooked > 0 ? 'text-green-500' : 'text-red-500'}`}>
            🎟️ Available Tickets: {event.totalTickets - event.ticketsBooked > 0 ? event.totalTickets - event.ticketsBooked : 'Sold Out'}
          </div>
        </div>

        {event.createdby && (
          <div className="text-gray-700 mb-6">
            <span className="font-semibold">👤 Created By:</span> {event.createdby.name} ({event.createdby.email})
          </div>
        )}

        <button
          onClick={handleRegister}
          className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-lg"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
