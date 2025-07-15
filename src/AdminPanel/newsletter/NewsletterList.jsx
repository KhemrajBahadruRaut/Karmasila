import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


const NewsletterList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load deleted IDs from localStorage
  const getDeletedIds = () => {
    const stored = localStorage.getItem('deleted_subscriber_ids');
    return stored ? JSON.parse(stored) : [];
  };
  // Save updated deleted IDs to localStorage
  const setDeletedIds = (ids) => {
    localStorage.setItem('deleted_subscriber_ids', JSON.stringify(ids));
  };

  // Initial data fetch
  useEffect(() => {
    // fetch('https://karmasila.com.np/karmashila/newsletter/get_newsletter.php')
    fetch('http://localhost/karmashila/newsletter/get_newsletter.php')
      .then(async res => {
        const contentType = res.headers.get("content-type");
        if (!res.ok) throw new Error("Server error");

        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          if (data.success) {
            const deletedIds = getDeletedIds();
            const filtered = data.subscribers.filter(sub => !deletedIds.includes(sub.id));
            setSubscribers(filtered);
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

  // Handle delete (persist using localStorage)
   const handleDelete = async (id) => {
  const result = await Swal.fire({
   text: "Do you really want to delete?",
   showCancelButton: true,
   confirmButtonColor: "#3085d6",
   cancelButtonColor: "#d33",
   confirmButtonText: "Yes, delete it!",
   width: 250,
   padding: "1em",
   customClass: {
     confirmButton: 'swal2-small-btn',
     cancelButton: 'swal2-small-btn'
   }
 });
 

  if (!result.isConfirmed) return;

  const updated = subscribers.filter(sub => sub.id !== id);
  setSubscribers(updated);

  const deletedIds = getDeletedIds();
  if (!deletedIds.includes(id)) {
    deletedIds.push(id);
    setDeletedIds(deletedIds);
  }

  
  Swal.fire({
    text: "The message has been deleted.",
    icon: "success",
    confirmButtonColor: "#3085d6",
    width: 350,
    padding: "1em",
    customClass: {
      confirmButton: 'swal2-small-btn',
      icon: 'swal2-small-icon'
    }
  });};



  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Newsletter Subscribers</h2>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && subscribers.length === 0 && (
        <p className="text-gray-500">No subscribers to display.</p>
      )}

      {!loading && !error && subscribers.length > 0 && (
        <div className="overflow-x-auto text-black">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Id</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Subscribed At</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub, index) => (
                <tr key={sub.id} className="hover:bg-yellow-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{sub.email}</td>
                  <td className="border px-4 py-2">{new Date(sub.subscribed_at).toLocaleString()}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="text-red-600 hover:underline"
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

export default NewsletterList;
