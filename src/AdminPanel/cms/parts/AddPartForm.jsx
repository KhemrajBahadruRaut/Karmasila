import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const AddPartForm = () => {
  const [form, setForm] = useState({ name: "", slug: "", status: "1" });
  const [parts, setParts] = useState([]);
  const [editingPartId, setEditingPartId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const fetchParts = async () => {
    try {
      const res = await fetch("https://karmasila.com.np/karmashila/parts/get_nav_parts.php");
      // const res = await fetch("http://localhost/karmashila/parts/get_nav_parts.php");
      const data = await res.json();
      setParts(data);
    } catch (err) {
      console.error("Failed to fetch parts:", err);
    }
  };

  useEffect(() => {
    fetchParts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");
    try {
      let url = "https://karmasila.com.np/karmashila/parts/add_part.php";
      // let url = "http://localhost/karmashila/parts/add_part.php";
      let method = "POST";

      if (editingPartId) {
        url = `https://karmasila.com.np/karmashila/parts/update_part.php?id=${editingPartId}`;
        // url = `http://localhost/karmashila/parts/update_part.php?id=${editingPartId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          status: parseInt(form.status),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFeedback(editingPartId ? "✅ Part updated successfully!" : "✅ Part added successfully!");
        setForm({ name: "", slug: "", status: "1" });
        setEditingPartId(null);
        fetchParts();
      } else {
        setFeedback("❌ Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      setFeedback("❌ Failed to submit.");
    }
    setLoading(false);
  };

  const handleEdit = (part) => {
    setForm({
      name: part.name,
      slug: part.slug,
      status: part.status.toString(),
    });
    setEditingPartId(part.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this part?")) return;
    setLoading(true);
    try {
      const res = await fetch(`https://karmasila.com.np/karmashila/parts/delete_part.php?id=${id}`, {
      // const res = await fetch(`http://localhost/karmashila/parts/delete_part.php?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setFeedback("✅ Part deleted successfully!");
        fetchParts();
        if (editingPartId === id) {
          setEditingPartId(null);
          setForm({ name: "", slug: "", status: "1" });
        }
      } else {
        setFeedback("❌ Failed to delete part: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      setFeedback("❌ Please delete sub-details first.");
    }
    setLoading(false);
  };

  const activeParts = parts.filter((p) => parseInt(p.status) === 1);
  const inactiveParts = parts.filter((p) => parseInt(p.status) === 0);

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-black mb-4">
        {editingPartId ? "✏️ Edit Part" : "➕ Add New Part"}
      </h2>

      {feedback && (
        <div
          className={`mb-4 p-3 text-sm font-medium rounded-lg shadow-md ${
            feedback.startsWith("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {feedback}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 text-black space-y-3">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Part Name"
          className="border border-gray-300 p-2 w-full rounded"
          required
          disabled={loading}
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          disabled={loading}
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${loading && "opacity-50 cursor-not-allowed"}`}
            disabled={loading}
          >
            {editingPartId ? "Update Part" : "Add Part"}
          </button>
          {editingPartId && (
            <button
              type="button"
              onClick={() => {
                setEditingPartId(null);
                setForm({ name: "", slug: "", status: "1" });
              }}
              className="px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h3 className="text-md font-semibold mb-2 text-black/80">🟢 Active Navbar Items</h3>
        <PartList parts={activeParts} handleEdit={handleEdit} handleDelete={handleDelete} loading={loading} />

        <h3 className="text-md font-semibold mt-6 mb-2 text-black/80">🔴 Inactive Navbar Items</h3>
        <PartList parts={inactiveParts} handleEdit={handleEdit} handleDelete={handleDelete} loading={loading} inactive />
      </div>
    </div>
  );
};

const PartList = ({ parts, handleEdit, handleDelete, loading, inactive }) => {
  if (parts.length === 0) {
    return <p className="text-gray-500">No {inactive ? "inactive" : "active"} parts.</p>;
  }

  return (
    <ul className={`list-disc pl-5 space-y-2 ${inactive ? "text-red-600" : "text-green-700"}`}>
      {parts.map((part) => (
        <li key={part.id} className="flex justify-between items-center">
          <span>{part.name}</span>
          <div className="flex gap-2">
            <button
              onClick={() => handleEdit(part)}
              className="text-yellow-600 hover:text-yellow-800"
              disabled={loading}
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(part.id)}
              className="text-red-600 hover:text-red-800"
              disabled={loading}
            >
              <FaTrashAlt />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AddPartForm;
