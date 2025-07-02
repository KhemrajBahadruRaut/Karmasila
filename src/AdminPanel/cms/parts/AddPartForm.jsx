import { useState, useEffect } from "react";

const AddPartForm = () => {
  const [form, setForm] = useState({ name: "", slug: "", status: "1" });
  const [parts, setParts] = useState([]);
  const [editingPartId, setEditingPartId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch parts on component mount and after updates
  const fetchParts = async () => {
    try {
      // const res = await fetch("http://localhost/karmashila/parts/get_nav_parts.php");
      const res = await fetch("https://karmasila.com.np/karmashila/parts/get_nav_parts.php");
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
    try {
      // let url = "http://localhost/karmashila/parts/add_part.php";
      let url = "https://karmasila.com.np/karmashila/parts/add_part.php";
      let method = "POST";

      if (editingPartId) {
        // url = `http://localhost/karmashila/parts/update_part.php?id=${editingPartId}`;
        url = `https://karmasila.com.np/karmashila/parts/update_part.php?id=${editingPartId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          // slug: form.slug,
          status: parseInt(form.status),
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(editingPartId ? "Part updated successfully!" : "Part added successfully!");
        setForm({ name: "", slug: "", status: "1" });
        setEditingPartId(null);
        fetchParts();
      } else {
        alert("Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Failed to submit. See console for details.");
      console.error(err);
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
      // const res = await fetch(`http://localhost/karmashila/parts/delete_part.php?id=${id}`, {
      const res = await fetch(`https://karmasila.com.np/karmashila/parts/delete_part.php?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        alert("Part deleted successfully!");
        fetchParts();
        // Clear form if the deleted part was being edited
        if (editingPartId === id) {
          setEditingPartId(null);
          setForm({ name: "", status: "1" });
        }
      } else {
        alert("Failed to delete part: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Please Delete sub details first.");
      console.error(err);
    }
    setLoading(false);
  };

  // Separate parts by status
  const activeParts = parts.filter((p) => parseInt(p.status) === 1);
  const inactiveParts = parts.filter((p) => parseInt(p.status) === 0);

  return (
    <div className="p-4 bg-white shadow rounded max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-4">{editingPartId ? "Edit Part" : "Add New Part"}</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Part Name"
          className="border p-2 w-full mb-3"
          required
          disabled={loading}
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          disabled={loading}
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>

        <button
          type="submit"
          className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
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
            className="ml-3 px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-100"
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </form>

      <div>
        <h3 className="text-md font-semibold mb-2">Active Navbar Items</h3>
        {activeParts.length === 0 ? (
          <p className="text-gray-500">No active parts.</p>
        ) : (
          <ul className="list-disc pl-5 text-green-700">
            {activeParts.map((part) => (
              <li key={part.id} className="flex justify-between items-center mb-1">
                <span>{part.name}</span>
                <div>
                  <button
                    onClick={() => handleEdit(part)}
                    className="mr-2 text-yellow-600 hover:underline"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(part.id)}
                    className="text-red-600 hover:underline"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <h3 className="text-md font-semibold mt-6 mb-2">Inactive Navbar Items</h3>
        {inactiveParts.length === 0 ? (
          <p className="text-gray-500">No inactive parts.</p>
        ) : (
          <ul className="list-disc pl-5 text-red-600">
            {inactiveParts.map((part) => (
              <li key={part.id} className="flex justify-between items-center mb-1">
                <span>{part.name}</span>
                <div>
                  <button
                    onClick={() => handleEdit(part)}
                    className="mr-2 text-yellow-600 hover:underline"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(part.id)}
                    className="text-red-600 hover:underline"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddPartForm;
