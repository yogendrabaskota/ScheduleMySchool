/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Contact from "./Contact";
import AboutUs from "./AboutUs";

const EventCard = ({
  id,
  title,
  description,
  location,
  date,
  time,
  availableTickets,
  createdBy,
}) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-80 h-auto p-6 m-4">
      <h2 className="text-2xl font-bold text-[#212121] mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">📍 Location:</span> {location}
      </div>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">📅 Date:</span>{" "}
        {new Date(date).toLocaleDateString()}
      </div>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">⏰ Time:</span> {time}
      </div>
      <div
        className={`text-sm font-bold mb-3 ${
          availableTickets > 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        🎟️ Available Tickets:{" "}
        {availableTickets > 0 ? availableTickets : "Sold Out"}
      </div>
      {createdBy && (
        <div className="text-gray-700 mb-3">
          <span className="font-semibold">👤 Created By:</span> {createdBy.name}{" "}
          ({createdBy.email})
        </div>
      )}
      <Link to={`/event/${id}`}>
        <button className="mt-auto bg-[#3F51B5] hover:bg-[#303F9F] text-white text-sm font-semibold py-2 px-4 rounded-lg">
          View Details
        </button>
      </Link>
    </div>
  );
};

const Home = () => {
  const [events, setEvents] = useState([]);
  const baseURL = "https://schedulemyschool.onrender.com";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/event`);
        console.log(response.data.data);
        const currentDate = new Date(); // Get the current date
        const sortedAndFilteredEvents = response.data.data
          .filter((event) => new Date(event.date) >= currentDate) // Filter out past events
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort events by date (soonest first)
        // console.log(sortedAndFilteredEvents);
        setEvents(sortedAndFilteredEvents); // Set the sorted and filtered events state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#3F51B5] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Exciting Events Near You
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Find, book, and enjoy the best events in your area. From concerts to
            workshops, we&apos;ve got you covered.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-[#FF9800] hover:bg-[#F57C00] text-[#212121] font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Create an Event
            </Link>
            <Link
              to="/"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-[#3F51B5] font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Browse All Events
            </Link>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="bg-[#FAFAFA] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-[#212121] mb-8 text-center">
            Upcoming Events
          </h2>
          {events.length > 0 ? (
            <div className="flex flex-wrap justify-center">
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
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-[#212121]">
                No upcoming events found. Check back later!
              </p>
            </div>
          )}
        </div>
      </div>

      <AboutUs />
      <Contact />
    </>
  );
};

export default Home;
