import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const GetYourTicket = () => {
  const { ticketNumber } = useParams(); // Get the ticket number from the URL
  const [pdfUrl, setPdfUrl] = useState(null); // To store the URL of the PDF file
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = "http://localhost:5000"; // Your backend's base URL
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicketPDF = async () => {
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        // Make the API call to get the ticket PDF file
        const response = await axios.get(`${baseURL}/api/ticket/generate/${ticketNumber}`, {
          headers: { Authorization: `${token}` },
          responseType: "blob", // This will tell axios to handle the response as binary data
        });
        console.log("hello",response)

        // Create a URL for the PDF blob
        const fileURL = URL.createObjectURL(response.data);
        setPdfUrl(fileURL); // Set the PDF URL for display
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };

    fetchTicketPDF();
  }, [ticketNumber, token]);

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `ticket-${ticketNumber}.pdf`;
      link.click();
    }
  };

  if (loading) {
    return <div className="text-center text-lg">Loading ticket...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Ticket</h2>

      {pdfUrl ? (
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-4xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ticket PDF</h3>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Download Ticket
            </button>
          </div>

          <div className="mt-6">
            <iframe
              src={pdfUrl}
              width="100%"
              height="600px"
              title="Ticket PDF"
            ></iframe>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No ticket available for this number.</p>
      )}
    </div>
  );
};

export default GetYourTicket;
