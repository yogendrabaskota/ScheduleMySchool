/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FiUsers, FiCalendar, FiDollarSign, FiActivity } from "react-icons/fi";
import { FaTicketAlt } from "react-icons/fa"; // Using FontAwesome ticket icon instead

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    tickets: 0,
    revenue: 0,
    activeEvents: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setStats({
        users: 1243,
        events: 56,
        tickets: 892,
        revenue: 12560,
        activeEvents: 12,
      });

      setRecentActivity([
        {
          id: 1,
          user: "John Doe",
          action: "Purchased ticket",
          time: "2 mins ago",
        },
        {
          id: 2,
          user: "Admin",
          action: "Created new event",
          time: "15 mins ago",
        },
        {
          id: 3,
          user: "Jane Smith",
          action: "Registered account",
          time: "32 mins ago",
        },
        {
          id: 4,
          user: "System",
          action: "Scheduled maintenance",
          time: "1 hour ago",
        },
        {
          id: 5,
          user: "Mike Johnson",
          action: "Cancelled ticket",
          time: "2 hours ago",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const chartData = [
    { name: "Jan", users: 400, tickets: 240 },
    { name: "Feb", users: 300, tickets: 139 },
    { name: "Mar", users: 200, tickets: 980 },
    { name: "Apr", users: 278, tickets: 390 },
    { name: "May", users: 189, tickets: 480 },
    { name: "Jun", users: 239, tickets: 380 },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      <Sidebar title="Admin Dashboard" />

      <div className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#3F51B5]">
              Admin Dashboard
            </h1>
            <p className="text-[#757575]">
              Welcome back! Here&apos;s what&apos;s happening today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-3">
              <p className="text-sm text-[#757575]">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm p-6 h-32 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <StatCard
              icon={<FiUsers className="text-[#3F51B5]" size={24} />}
              title="Total Users"
              value={stats.users}
              change="+12% from last month"
            />
            <StatCard
              icon={<FiCalendar className="text-[#4CAF50]" size={24} />}
              title="Total Events"
              value={stats.events}
              change="+3 new this week"
            />
            <StatCard
              icon={<FaTicketAlt className="text-[#FF9800]" size={24} />}
              title="Tickets Sold"
              value={stats.tickets}
              change="+24 today"
            />
            <StatCard
              icon={<FiDollarSign className="text-[#F44336]" size={24} />}
              title="Total Revenue"
              value={`$${stats.revenue.toLocaleString()}`}
              change="+8% from last month"
            />
            <StatCard
              icon={<FiActivity className="text-[#9C27B0]" size={24} />}
              title="Active Events"
              value={stats.activeEvents}
              change="2 ending soon"
            />
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">User & Ticket Growth</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#3F51B5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="tickets" fill="#FF9800" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#3F51B5] flex items-center justify-center text-white mr-3">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-[#757575]">{activity.action}</p>
                  </div>
                  <div className="ml-auto text-sm text-[#757575]">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <ActionButton
              label="Create Event"
              onClick={() => console.log("Create Event")}
              color="bg-[#4CAF50] hover:bg-[#388E3C]"
            />
            <ActionButton
              label="Manage Users"
              onClick={() => console.log("Manage Users")}
              color="bg-[#3F51B5] hover:bg-[#303F9F]"
            />
            <ActionButton
              label="View Reports"
              onClick={() => console.log("View Reports")}
              color="bg-[#FF9800] hover:bg-[#F57C00]"
            />
            <ActionButton
              label="System Settings"
              onClick={() => console.log("System Settings")}
              color="bg-[#9E9E9E] hover:bg-[#757575]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value, change }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#757575]">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className="text-xs text-[#757575] mt-2">{change}</p>
      </div>
      <div className="p-3 rounded-full bg-opacity-20 bg-[#3F51B5]">{icon}</div>
    </div>
  </div>
);

// Action Button Component
const ActionButton = ({ label, onClick, color }) => (
  <button
    onClick={onClick}
    className={`${color} text-white font-medium py-3 px-4 rounded-lg transition-colors text-sm flex items-center justify-center`}
  >
    {label}
  </button>
);

export default AdminDashboard;
