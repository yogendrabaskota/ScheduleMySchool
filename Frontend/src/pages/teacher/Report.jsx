import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Report = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [eventReport, setEventReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = "https://schedulemyschool.onrender.com"; // Your backend's base URL
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEventReport = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/api/event/report/${id}`, {
          headers: { Authorization: `${token}` },
        });
        setEventReport(response.data.data); // Assuming response contains the report data
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchEventReport();
  }, [id, token]);

  if (loading) {
    return <div className="text-center text-lg">Loading report...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Event Report</h2>

      {eventReport ? (
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-4xl">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Event Details</h3>
          <div className="space-y-4">
            <div>
              <strong className="font-semibold">Event Title:</strong> {eventReport.title}
            </div>
            <div>
              <strong className="font-semibold">Location:</strong> {eventReport.location}
            </div>
            <div>
              <strong className="font-semibold">Date:</strong> {new Date(eventReport.date).toLocaleDateString()}
            </div>
            <div>
              <strong className="font-semibold">Time:</strong> {eventReport.time}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Report Data</h3>
            <div className="space-y-2">
              <div>
                <strong className="font-semibold">Total Participants:</strong> {eventReport.totalParticipants}
              </div>
              <div>
                <strong className="font-semibold">Tickets Sold:</strong> {eventReport.ticketsSold}
              </div>
              <div>
                <strong className="font-semibold">Revenue Collected:</strong> ${eventReport.revenue}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No report available for this event.</p>
      )}
    </div>
  );
};

export default Report;
