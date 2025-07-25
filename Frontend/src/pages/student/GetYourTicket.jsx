import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const GetYourTicket = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const baseURL = "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicketPDF = async () => {
      if (!token) {
        setError("You need to log in to view tickets");
        setLoading(false);
        navigate("/login");
        return;
      }

      if (!id) {
        setError("Invalid ticket reference");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${baseURL}/api/ticket/generate/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "blob",
          }
        );

        const fileURL = URL.createObjectURL(response.data);
        setPdfUrl(fileURL);
        setLoading(false);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load ticket. Please try again."
        );
        setLoading(false);
      }
    };

    fetchTicketPDF();

    // Clean up the object URL when component unmounts
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [token, id, navigate]);

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `ticket-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#3F51B5] border-t-transparent"></div>
          <p className="mt-4 text-lg font-medium text-[#212121]">
            Loading your ticket...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-bold text-[#212121] mt-4">
            Ticket Error
          </h2>
          <p className="text-[#757575] mt-2">{error}</p>
          <button
            onClick={() => navigate("/ticket")}
            className="mt-6 bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Back to Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-[#3F51B5] p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold">Your Event Ticket</h1>
                <p className="text-[#E0E0E0] mt-1">Ticket ID: {id}</p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <button
                  onClick={handleDownload}
                  className="bg-white text-[#3F51B5] hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </button>
                <button
                  onClick={() => navigate("/ticket")}
                  className="bg-transparent border border-white hover:bg-white hover:text-[#3F51B5] font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Back to Tickets
                </button>
              </div>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="p-6">
            {pdfUrl ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src={pdfUrl}
                  width="100%"
                  height="600px"
                  title="Ticket PDF"
                  className="border-0"
                ></iframe>
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-[#9E9E9E]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-[#212121] mt-4">
                  Ticket Not Available
                </h3>
                <p className="text-[#757575] mt-2">
                  We couldn&apos;t find the ticket you&apos;re looking for
                </p>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-[#757575]">
                Need help?{" "}
                <a href="#" className="text-[#3F51B5] hover:underline">
                  Contact support
                </a>
              </p>
              <p className="text-sm text-[#757575] mt-2 md:mt-0">
                Ticket generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetYourTicket;
