/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [eventCount, setEventCount] = useState(0);

  // Base URL of the backend
  const baseURL = 'https://schedulemyschool.onrender.com';

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Fetch data from the backend
        const response = await axios.get(`${baseURL}/api/event`);
        const events = response.data; // Assuming response.data is an array of events
        setEventCount(events.length); // Set the number of events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="mx-auto bg-gray-700 min-h-screen flex flex-col justify-center items-center px-8 py-8 text-white">
      <h1 className="text-4xl font-bold mb-4">Event Count</h1>
      <p className="text-2xl">{`Number of Events: ${eventCount}`}</p>
    </div>
  );
};

export default Home;
