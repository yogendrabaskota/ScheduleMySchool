/* eslint-disable no-unused-vars */
import React from 'react';

const Card = ({ date, time, title, location, imageUrl }) => {
  return (
    <div className="flex flex-col bg-white rounded shadow-lg w-60 h-80">
      <div
        className="w-full h-32 bg-top bg-cover rounded-t"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className="flex flex-col p-4">
        <div className="text-gray-800 font-bold text-lg">{title}</div>
        <div className="text-gray-600 text-sm mt-2">{location}</div>
        <div className="flex flex-row justify-between items-center mt-4 text-gray-800">
          <div className="text-sm font-bold">
            {date.month} {date.day}
          </div>
          <div className="text-sm">{time}</div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const cardsData = [
    {
      date: { month: 'Jan', day: 13 },
      time: '7 pm',
      title: 'National Championship',
      location: 'Superdome',
      imageUrl:
        'https://www.si.com/.image/t_share/MTY4MTkyMjczODM4OTc0ODQ5/cfp-trophy-deitschjpg.jpg',
    },
    {
      date: { month: 'Feb', day: 10 },
      time: '8 pm',
      title: 'Super Bowl 2020',
      location: 'Hard Rock Stadium',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/en/a/a4/Super_Bowl_LIV_logo.png',
    },
    {
      date: { month: 'Mar', day: 15 },
      time: '6 pm',
      title: 'March Madness',
      location: 'Lucas Oil Stadium',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/NCAA_logo.svg/1200px-NCAA_logo.svg.png',
    },
    // Add more card data as needed
  ];

  return (
    <div className="mx-auto bg-gray-700 min-h-screen flex flex-wrap gap-6 justify-center items-center px-8 py-8">
      {cardsData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default Home;
