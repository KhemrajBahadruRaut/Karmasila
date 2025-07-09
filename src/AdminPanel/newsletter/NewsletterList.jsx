import React, { useEffect, useState } from 'react';

const NewsletterList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  fetch('https://karmasila.com.np/karmashila/newsletter/get_newsletter.php')
  // fetch('http://localhost/karmashila/newsletter/get_newsletter.php')
    .then(async res => {
      const contentType = res.headers.get("content-type");
      if (!res.ok) throw new Error("Server error");

      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (data.success) {
          setSubscribers(data.subscribers);
        } else {
          setError('Failed to fetch subscribers');
        }
      } else {
        throw new Error("Invalid JSON response");
      }
    })
    .catch(err => {
      console.error(err);
      setError('An error occurred');
    })
    .finally(() => {
      setLoading(false);
    });
}, []);


  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Newsletter Subscribers</h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto text-black">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, index) => (
                <tr key={sub.id} className="hover:bg-yellow-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{sub.email}</td>
                  <td className="border px-4 py-2">{new Date(sub.subscribed_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewsletterList;
