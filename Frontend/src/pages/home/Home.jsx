/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EventCard = ({ id, title, description, location, date, time, availableTickets, createdBy }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-80 h-auto p-6 m-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">📍 Location:</span> {location}
      </div>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">📅 Date:</span> {new Date(date).toLocaleDateString()}
      </div>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">⏰ Time:</span> {time}
      </div>
      <div className={`text-sm font-bold mb-3 ${availableTickets > 0 ? 'text-green-500' : 'text-red-500'}`}>
        🎟️ Available Tickets: {availableTickets > 0 ? availableTickets : 'Sold Out'}
      </div>
      {createdBy && (
        <div className="text-gray-700 mb-3">
          <span className="font-semibold">👤 Created By:</span> {createdBy.name} ({createdBy.email})
        </div>
      )}
      <Link to={`/event/${id}`}>
        <button className="mt-auto bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg">
          View Details
        </button>
      </Link>
    </div>
  );
};


const Home = () => {

  //const navigate = useNavigate()
  const [events, setEvents] = useState([]);
  const baseURL = 'http://localhost:5000';

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     navigate('/login');
  //   }
  // }, [navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/event`);
       // console.log('Response data:', response);
        setEvents(response.data.data); // Set the events state
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
    
    
    <div className="mx-auto bg-gray-100 min-h-screen flex flex-wrap justify-center items-center px-8 py-8">
     
      {events.map((event) => (
        <EventCard
          key={event._id}
          id={event._id}
          title={event.title}
          description={event.description}
          location={event.location}
          date={event.date}
          time={event.time}
          availableTickets={event.totalTickets - event.ticketsBooked}
          createdBy={event.createdby}
        />
      ))}
    </div>
    </>
  );
};

export default Home;
