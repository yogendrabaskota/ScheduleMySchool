/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section className="bg-gray-100">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About Us</h2>
            <p className="mt-4 text-gray-600 text-lg">
            Bhanu Secondary School is a renowned educational institution known for its beautiful campus and excellent learning environment. 
            Nestled in a serene location, the school boasts modern facilities and well-maintained surroundings that inspire both students and teachers. 
            Bhanu Secondary School is committed to providing high-quality education through its team of dedicated and highly qualified teachers who nurture student's 
            academic and personal growth. With a strong emphasis on discipline, creativity, and holistic development, the school fosters a supportive atmosphere where 
            students can excel in academics, sports, and extracurricular activities. Bhanu Secondary School is truly a beacon of knowledge and excellence in the community.

            </p>
            <div className="mt-8">
              <Link to="/contact" className="text-blue-500 hover:text-blue-600 font-medium">
                Learn more about us
                <span className="ml-2">&#8594;</span>
              </Link>
            </div>
          </div>
          <div className="mt-12 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
              alt="About Us"
              className="object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
