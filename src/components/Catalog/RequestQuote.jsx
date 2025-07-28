import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer/Footer';
import WhatsAppBtn from '../Home_sub/WhatsappBtn';
import Swal from 'sweetalert2';

const RequestQuote = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const itemId = location.state?.itemId || '';

  // Refs for form inputs
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const companyRef = useRef();
  const messageRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: 'Confirm Submission',
      text: 'Are you sure you want to submit your quote request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#facc15',
      cancelButtonColor: '#d1d5db',
      confirmButtonText: 'Yes, submit',
      cancelButtonText: 'Cancel',
    });
    if (!confirm.isConfirmed) return;

    const formData = {
      itemId,
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      company: companyRef.current.value,
      message: messageRef.current.value,
    };

    try {
      const response = await fetch('https://karmasila.com.np/karmashila/quote/submit_quote.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Submitted!',
          text: 'Thank you for submitting your quote request.',
          confirmButtonColor: '#facc15',
        }).then(() => navigate('/'));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.error || 'Submission failed.',
          confirmButtonColor: '#f87171',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: error.message,
        confirmButtonColor: '#f87171',
      });
    }
  };

  return (
    <>
      <div className="bg-white"><Navbar /></div>
      <div><WhatsAppBtn /></div>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-6 py-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden px-6 sm:p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h1 className="text-2xl font-bold text-black mb-4">Request a Quote</h1>
                <h2 className="text-gray-600">Fill out the form below and we'll get back to you soon</h2>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  ref={nameRef}
                  className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  ref={emailRef}
                  className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  ref={phoneRef}
                  className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  ref={companyRef}
                  className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              {itemId && (
                <div>
                  <label htmlFor="itemId" className="block text-sm font-medium text-gray-700">
                    Product ID
                  </label>
                  <input
                    type="text"
                    id="itemId"
                    name="itemId"
                    value={itemId}
                    readOnly
                    className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Additional Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  ref={messageRef}
                  className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>

              <div className="flex mt-4 mb-2 justify-between md:col-span-2 pb-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default RequestQuote;
