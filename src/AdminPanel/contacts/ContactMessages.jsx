import React, { useEffect, useState } from 'react';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Utility to load deleted contact IDs from localStorage
  const getDeletedIds = () => {
    const stored = localStorage.getItem('deleted_contact_ids');
    return stored ? JSON.parse(stored) : [];
  };

  // Utility to save deleted contact IDs to localStorage
  const setDeletedIds = (ids) => {
    localStorage.setItem('deleted_contact_ids', JSON.stringify(ids));
  };

  useEffect(() => {
    // fetch('http://localhost/karmashila/contacts/get_contacts.php')
    fetch('https://karmasila.com.np/karmashila/contacts/get_contacts.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const deletedIds = getDeletedIds();
          const filtered = data.messages.filter(msg => !deletedIds.includes(msg.id));
          setMessages(filtered);
        } else {
          setError('Failed to load messages.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error loading contact messages.');
        setLoading(false);
      });
  }, []);

  // Delete a message (frontend only)
  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this message?");
    if (!confirmed) return;

    const updated = messages.filter(msg => msg.id !== id);
    setMessages(updated);

    const deletedIds = getDeletedIds();
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      setDeletedIds(deletedIds);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Contact Submissions</h2>

      {loading && <p>Loading messages...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && messages.length === 0 && <p>No messages found.</p>}

      {!loading && messages.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Message</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={msg.id} className="hover:bg-yellow-50">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{msg.name}</td>
                  <td className="border px-4 py-2">{msg.email}</td>
                  <td className="border px-4 py-2">{msg.message}</td>
                  <td className="border px-4 py-2">{new Date(msg.submitted_at).toLocaleString()}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(msg.id)}
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

export default ContactMessages;
