import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TicketPurchaseForm = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const baseURL = "https://schedulemyschool.onrender.com";
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      setError("You must be logged in to purchase tickets!");
      navigate("/login");
      return;
    }

    if (role === "teacher" || role === "student") {
      setPaymentMethod("free");
    } else if (role === "guest") {
      setPaymentMethod("khalti");
    }
  }, [navigate]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      setError("You need to log in to purchase tickets!");
      navigate("/login");
      return;
    }

    if (role === "guest") {
      try {
        const ticketResponse = await axios.post(
          `${baseURL}/api/ticket/${id}`,
          { quantity, paymentMethod },
          { headers: { Authorization: `${token}` } }
        );

        if (!ticketResponse?.data?.data?._id) {
          setError("Failed to fetch ticket details.");
          return;
        }

        const ticketNum = ticketResponse.data.data._id;
        const quantityFromResponse = ticketResponse.data.data.quantity;
        const amount = 100 * 100 * quantityFromResponse;

        const paymentResponse = await axios.post(
          `${baseURL}/api/payment`,
          { ticketNum, amount },
          { headers: { Authorization: `${token}` } }
        );

        window.location.href = paymentResponse.data.payment_url;
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/api/ticket/${id}`,
        { quantity, paymentMethod },
        { headers: { Authorization: `${token}` } }
      );

      navigate(`/ticket/${response.data.data._id}`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to purchase ticket. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-[#3F51B5] p-6 text-center">
          <h1 className="text-2xl font-bold text-white">Ticket Purchase</h1>
          <p className="text-[#E0E0E0] mt-1">
            Complete your ticket purchase below
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handlePurchase} className="space-y-6">
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-[#212121] mb-1"
              >
                Ticket Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3F51B5] focus:ring-2 focus:ring-[#3F51B5]/50 transition-colors"
                required
              />
            </div>

            <div>
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-[#212121] mb-1"
              >
                Payment Method
              </label>
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3F51B5] focus:ring-2 focus:ring-[#3F51B5]/50 transition-colors"
                disabled
              >
                <option value="">Select payment method</option>
                <option value="free">Free</option>
                <option value="khalti">Khalti</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Payment method is automatically selected based on your account
                type
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3F51B5] hover:bg-[#303F9F] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Purchase Tickets"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#757575]">
              Changed your mind?{" "}
              <button
                onClick={() => navigate(-1)}
                className="text-[#3F51B5] hover:text-[#303F9F] font-medium hover:underline"
              >
                Go back
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaseForm;
