import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EventDetails = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const baseURL = 'http://localhost:5000';

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

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h1>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">📍 Location:</span> {event.location}
      </div>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">📅 Date:</span> {new Date(event.date).toLocaleDateString()}
      </div>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">⏰ Time:</span> {event.time}
      </div>
      <div className={`text-sm font-bold mb-3 ${event.totalTickets - event.ticketsBooked > 0 ? 'text-green-500' : 'text-red-500'}`}>
        🎟️ Available Tickets: {event.totalTickets - event.ticketsBooked > 0 ? event.totalTickets - event.ticketsBooked : 'Sold Out'}
      </div>
      {event.createdby && (
        <div className="text-gray-700 mb-3">
          <span className="font-semibold">👤 Created By:</span> {event.createdby.name} ({event.createdby.email})
        </div>
      )}
    </div>
  );
};

export default EventDetails;
