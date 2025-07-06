import React, { useState, useEffect, useRef } from "react";
import { FaImage } from "react-icons/fa";

const Details = () => {
  const [parts, setParts] = useState([]);
  const [details, setDetails] = useState([]);
  const [form, setForm] = useState({
    part_id: "",
    title: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Track which detail is being edited; store its id or null if none
  const [editingId, setEditingId] = useState(null);
  // Store edited detail data while editing
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    image: null,
  });
  const editFileInputRef = useRef(null);

  useEffect(() => {
    fetchParts();
    fetchDetails();
  }, []);

  const fetchParts = () => {
    // fetch("http://localhost/karmashila/parts/get_nav_parts.php")
    fetch("https://karmasila.com.np/karmashila/parts/get_nav_parts.php")
      .then((res) => res.json())
      .then((data) => setParts(data))
      .catch(() => console.error("Failed to fetch parts"));
  };

 const fetchDetails = () => {
  fetch("https://karmasila.com.np/karmashila/parts_details/get_all.php")
  // fetch("http://localhost/karmashila/parts_details/get_all.php")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Server returned " + res.status);
      }
      return res.json(); // Only try to parse JSON if status is OK (200)
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format");
      }
      setDetails(data);
    })
    .catch((err) => {
      console.error("Fetch error:", err.message);
    });
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("part_id", form.part_id);
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await fetch(
        // "http://localhost/karmashila/parts_details/add_detail.php",
        "https://karmasila.com.np/karmashila/parts_details/add_detail.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      if (data.success) {
        alert("Details saved!");
        setForm({ part_id: "", title: "", description: "", image: null });
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchDetails();
      } else {
        setError(data.error || "Unknown error");
      }
    } catch {
      setError("Failed to save details");
    } finally {
      setLoading(false);
    }
  };

  // --- EDIT HANDLERS ---

  // Start editing a sub-part, fill editForm with current data
  const startEdit = (detail) => {
    setEditingId(detail.id);
    setEditForm({
      title: detail.title,
      description: detail.description,
      image: null,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: "", description: "", image: null });
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFileChange = (e) => {
    setEditForm((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("id", editingId);
    formData.append("title", editForm.title);
    formData.append("description", editForm.description);
    if (editForm.image) formData.append("image", editForm.image);

    try {
      const res = await fetch(
        // "http://localhost/karmashila/parts_details/edit_detail.php",
        "https://karmasila.com.np/karmashila/parts_details/edit_detail.php",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      if (data.success) {
        alert("Details updated!");
        cancelEdit();
        fetchDetails();
      } else {
        setError(data.error || "Unknown error");
      }
    } catch {
      setError("Failed to update details");
    } finally {
      setLoading(false);
    }
  };

  // --- DELETE HANDLER ---
  const deleteDetail = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sub-part?"))
      return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        // "http://localhost/karmashila/parts_details/delete_detail.php",
        "https://karmasila.com.np/karmashila/parts_details/delete_detail.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );
      const data = await res.json();

      if (data.success) {
        alert("Details deleted!");
        // If deleting the currently edited detail, cancel edit mode
        if (editingId === id) cancelEdit();
        fetchDetails();
      } else {
        setError(data.error || "Unknown error");
      }
    } catch {
      setError("Failed to delete details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-3xl mx-auto bg-white rounded shadow-md text-black"
    >
      <h2 className="text-xl font-semibold mb-4 text-black">Add Sub-Part Details</h2>

      <label className="block mb-2">Select Part</label>
      <select
        name="part_id"
        value={form.part_id}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="" disabled hidden>
          -- Choose a Part --
        </option>
        {parts.map((part) => (
          <option key={part.id} value={part.id}>
            {part.name}
          </option>
        ))}
      </select>

      <label className="block mb-2">Title</label>
      <input
        type="text"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border rounded"
      />

      <label className="block mb-2">Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows="4"
        required
        className="w-full p-2 mb-4 border rounded"
      />

      <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <div className="flex items-center">
              <label className="cursor-pointer bg-white border  text-gray-500 border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
                <span className="flex items-center">
                  <FaImage className="mr-2 text-gray-500" />
                  {form.image ? form.image.name : "Choose an image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden  text-black"
                />
              </label>
            </div>
          </div>

        

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 mt-3 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Details"}
      </button>

      {/* Existing sub-parts */}
      {form.part_id && (
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Existing Sub-Parts</h3>
          <ul className="space-y-4">
            {details
              .filter((d) => d.part_id === Number(form.part_id))
              .map((d) => (
                <li
                  key={d.id}
                  className="border p-4 rounded flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  {editingId === d.id ? (
                    <div className="w-full">
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditChange}
                        required
                        className="w-full p-2 mb-2 border rounded"
                        placeholder="Title"
                      />
                      <textarea
                        name="description"
                        value={editForm.description}
                        onChange={handleEditChange}
                        rows="3"
                        required
                        className="w-full p-2 mb-2 border rounded"
                        placeholder="Description"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditFileChange}
                        ref={editFileInputRef}
                        className="mb-2"
                      />
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={submitEdit}
                          disabled={loading}
                          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                        >
                          {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="bg-gray-400 text-black px-4 py-1 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h4 className="font-semibold">{d.title}</h4>
                        <p className="text-sm">{d.description}</p>
                      </div>
                      <div className="space-x-2 mt-2 md:mt-0">
                        <button
                          onClick={() => startEdit(d)}
                          className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteDetail(d.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default Details;
