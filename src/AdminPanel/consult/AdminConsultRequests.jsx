import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminConsultRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch('http://localhost/karmashila/consult/fetch_consult_requests.php')
    fetch(
      "https://karmasila.com.np/karmashila/consult/fetch_consult_requests.php"
    )
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        localStorage.setItem("adminConsultRequests", JSON.stringify(data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch consult requests:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 text-black">
      <h2 className="text-xl font-bold mb-4">Consultation Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Company</th>
                <th className="p-2 border">Message</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2 border">{r.name}</td>
                  <td className="p-2 border">{r.email}</td>
                  <td className="p-2 border">{r.phone}</td>
                  <td className="p-2 border">{r.company}</td>
                  <td className="p-2 border">{r.message}</td>
                  <td className="p-2 border">
                    {new Date(r.submitted_at).toLocaleString("en-US", {
                      timeZone: "Asia/Kathmandu",
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={async () => {
                        const confirm = await Swal.fire({
                          title: "Delete Request?",
                          text: "Are you sure you want to delete this request? This cannot be undone.",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#f87171",
                          cancelButtonColor: "#d1d5db",
                          confirmButtonText: "Yes, delete",
                          cancelButtonText: "Cancel",
                        });
                        if (!confirm.isConfirmed) return;
                        setRequests((prev) => {
                          const updated = prev.filter((_, i) => i !== idx);
                          localStorage.setItem(
                            "adminConsultRequests",
                            JSON.stringify(updated)
                          );
                          return updated;
                        });
                        Swal.fire({
                          icon: "success",
                          title: "Deleted!",
                          text: "The request has been removed from the consult data.",
                          confirmButtonColor: "#facc15",
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

export default AdminConsultRequests;
