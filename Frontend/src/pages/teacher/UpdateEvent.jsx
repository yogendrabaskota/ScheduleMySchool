import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();
  const baseURL = "https://schedulemyschool.onrender.com"; // Replace with your backend URL
  const token = localStorage.getItem("token");

  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    totalTickets: "",
    ticketsBooked: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch event details when the component loads
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/event/${id}`, {
          headers: { Authorization: `${token}` },
        });
        setEvent(response.data); // Populate form with fetched event data
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch event data.");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, token]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `${baseURL}/api/event/${id}`,
        event,
        {
          headers: { Authorization: `${token}` },
        }
      );
      alert(response.data.message || "Event updated successfully!");
      navigate("/your-event");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update the event.");
    }
  };
    

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Update Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
             // id="title"
             placeholder= {event.data.title}
              name="title"
              value={event.title} // Use event.title
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder= {event.data.description}
              value={event.description} // Use event.description
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              rows="4"
            ></textarea>
          </div>
          <div>
            <label htmlFor="location" className="block text-gray-700 font-semibold mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder= {event.data.location}
              value={event.location} // Use event.location
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700 font-semibold mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder= {event.data.date}
              value={event.date ? event.date.slice(0, 10) : ""} // Use event.date
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-gray-700 font-semibold mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              placeholder= {event.data.time}
              value={event.time} // Use event.time
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="totalTickets" className="block text-gray-700 font-semibold mb-1">
              Total Tickets
            </label>
            <input
              type="number"
              id="totalTickets"
              name="totalTickets"
              placeholder= {event.data.totalTickets}
              value={event.totalTickets} // Use event.totalTickets
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="ticketsBooked" className="block text-gray-700 font-semibold mb-1">
              Tickets Booked
            </label>
            <input
              type="number"
              id="ticketsBooked"
              name="ticketsBooked"
              placeholder= {event.data.ticketsBooked}
              value={event.ticketsBooked} // Use event.ticketsBooked
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
