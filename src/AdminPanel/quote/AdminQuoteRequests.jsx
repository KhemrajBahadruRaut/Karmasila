import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AdminQuoteRequests = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch if not already in localStorage
    const saved = localStorage.getItem('adminQuoteRequests');
    if (saved) {
      setQuotes(JSON.parse(saved));
      setLoading(false);
      return;
    }
    // fetch('http://localhost/karmashila/quote/fetch_quote_requests.php')
    fetch('http://karmasila.com.np/karmashila/quote/fetch_quote_requests.php')
      .then(res => res.json())
      .then(data => {
        setQuotes(data);
        localStorage.setItem('adminQuoteRequests', JSON.stringify(data));
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch quote requests:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-4">Quote Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Product ID</th>
                <th className="p-2 border">Message</th>
                <th className="p-2 border">Submitted</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q, idx) => (
                <tr key={q.id} className="border-t">
                  <td className="p-2 border">{q.name}</td>
                  <td className="p-2 border">{q.email}</td>
                  <td className="p-2 border">{q.phone}</td>
                  <td className="p-2 border">{q.company}</td>
                  <td className="p-2 border">{q.item_id}</td>
                  <td className="p-2 border whitespace-pre-wrap">{q.message}</td>
                  <td className="p-2 border">{q.submitted_at}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={async () => {
                        const confirm = await Swal.fire({
                          title: 'Delete Request?',
                          text: 'Are you sure you want to delete this quote request? This cannot be undone.',
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#f87171',
                          cancelButtonColor: '#d1d5db',
                          confirmButtonText: 'Yes, delete',
                          cancelButtonText: 'Cancel',
                        });
                        if (!confirm.isConfirmed) return;
                        setQuotes(prev => {
                          const updated = prev.filter((_, i) => i !== idx);
                          localStorage.setItem('adminQuoteRequests', JSON.stringify(updated));
                          return updated;
                        });
                        Swal.fire({
                          icon: 'success',
                          title: 'Deleted!',
                          text: 'The quote request has been removed from this Quote data',
                          confirmButtonColor: '#facc15',
                        });
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminQuoteRequests;
