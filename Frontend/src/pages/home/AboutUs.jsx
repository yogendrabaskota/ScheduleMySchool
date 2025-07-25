import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="bg-[#FAFAFA] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#3F51B5] mb-4">
            About Bhanu Secondary School
          </h2>
          <div className="w-20 h-1 bg-[#00BCD4] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1531973576160-7125cd663d86"
                alt="Bhanu Secondary School Campus"
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F51B5]/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-lg font-medium">
                  Our beautiful campus in Jhapa
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="text-3xl font-bold text-[#212121] mb-6">
              Excellence in Education Since 1990
            </h3>
            <p className="text-[#212121] mb-6 leading-relaxed">
              Bhanu Secondary School is a renowned educational institution known
              for its beautiful campus and excellent learning environment.
              Nestled in a serene location, the school boasts modern facilities
              and well-maintained surroundings that inspire both students and
              teachers.
            </p>
            <p className="text-[#212121] mb-8 leading-relaxed">
              We are committed to providing high-quality education through our
              team of dedicated and highly qualified teachers who nurture
              students&apos; academic and personal growth. With a strong
              emphasis on discipline, creativity, and holistic development, we
              foster a supportive atmosphere where students can excel in
              academics, sports, and extracurricular activities.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#FF9800]">
                <h4 className="font-bold text-[#3F51B5] mb-2">Our Mission</h4>
                <p className="text-sm text-[#212121]">
                  To empower students with knowledge, skills, and values for
                  lifelong success.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#00BCD4]">
                <h4 className="font-bold text-[#3F51B5] mb-2">Our Vision</h4>
                <p className="text-sm text-[#212121]">
                  To be a center of excellence in holistic education.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="bg-[#3F51B5] hover:bg-[#303F9F] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/"
                className="border-2 border-[#3F51B5] text-[#3F51B5] hover:bg-[#3F51B5]/10 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="p-8 text-center">
              <div className="bg-[#00BCD4]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#00BCD4]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#212121] mb-2">
                Quality Education
              </h3>
              <p className="text-[#212121]">
                Nepal&apos;s top-ranked curriculum with modern teaching methods
              </p>
            </div>
            <div className="p-8 text-center">
              <div className="bg-[#FF9800]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#FF9800]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#212121] mb-2">
                Experienced Faculty
              </h3>
              <p className="text-[#212121]">
                30+ certified teachers with 5+ years average experience
              </p>
            </div>
            <div className="p-8 text-center">
              <div className="bg-[#3F51B5]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-[#3F51B5]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#212121] mb-2">
                Safe Environment
              </h3>
              <p className="text-[#212121]">
                Secure campus with 24/7 surveillance and counseling
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
