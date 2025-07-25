import Sidebar from "./component/Sidebar";
import { useNavigate } from "react-router-dom";

const GuestDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      <Sidebar title="Guest Dashboard" />

      <div className="flex-1 p-6 md:p-8">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-[#3F51B5]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-[#3F51B5] mt-4">
              Welcome Guest
            </h2>
            <p className="text-[#757575] mt-2">
              Explore available events and manage your tickets from the sidebar
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/")}
                className="bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Browse Events
              </button>
              <button
                onClick={() => navigate("/ticket")}
                className="bg-white border border-[#3F51B5] text-[#3F51B5] hover:bg-[#3F51B5] hover:text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                View Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
