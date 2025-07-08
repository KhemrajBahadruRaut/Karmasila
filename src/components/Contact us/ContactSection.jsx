import React, { useEffect, useState } from 'react';
import { IoIosCall } from 'react-icons/io';
import { IoLocation, IoTime } from "react-icons/io5";

const ContactSection = () => {
  // State to track whether to show the map
  const [showMap, setShowMap] = useState(false);
 const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    // Show browser confirmation prompt
    const confirm = window.confirm(`Are you sure you want to subscribe with "${email}"?`);
    if (!confirm) return;

    try {
      const res = await fetch('http://localhost/karmashila/newsletter/subscribe_newsletter.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      setStatus(data.success ? 'success' : 'error');
      setMessage(data.message);
      if (data.success) setEmail('');
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contact us</h1>
          <p className="text-lg text-gray-600">Get in touch with our team</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column */}
          <div className="flex flex-col space-y-6 h-full">
            {/* Contact Details Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">CONTACT</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                    <IoIosCall /> Phone
                  </h3>
                  <p className="text-gray-600">+977 (985) 1352013</p>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">  <IoLocation /> Location</h3>
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className="text-gray-600 underline hover:text-yellow-600 transition"
                  >
                    Sukhedhara, Kathmandu
                  </button>
                </div>

                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800"> <IoTime />Working Hours</h3>
                  <p className="text-gray-600">10 A.M to 6 P.M (Sun to Fri)</p>
                </div>
              </div>
            </div>


          </div>

          {/* Right Column */}
           <div className="flex flex-col h-full">
      <div className="bg-white p-6 rounded-lg shadow-sm h-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">NEWSLETTER</h2>
        <p className="text-gray-800 text-lg mb-4 font-semibold">Sign Up for Newsletter</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-2">
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="your@email.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-700 text-black font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Subscribe
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-md ${
              status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
        </div>


        {/* Conditionally Render Map */}
        {showMap && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-64 bg-gray-200 rounded-md overflow-hidden">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.637132472818!2d85.34384587519509!3d27.728487924559197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb196796c2dde3%3A0x36a3b22f875af582!2sSukedhara%20Communication!5e0!3m2!1sen!2snp!4v1751367998251!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection;