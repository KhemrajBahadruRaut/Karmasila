import React, { useEffect, useState } from "react";
import axios from "axios";

const CrusherCatalogAdmin = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: "", alt: "", id: null });
  const [imageFile, setImageFile] = useState(null);

//   const BASE_URL = "http://localhost/karmashila/crusher_catalogs";
  const BASE_URL = "https://karmasila.com.np/karmashila/crusher_catalogs";

  const fetchItems = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/get_all.php`);
    console.log("Fetched Items:", res.data); // 👈 Add this
    setItems(res.data);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    setItems([]); // fallback to empty array on error
  }
};


  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };
const handleSubmit = async () => {
  const confirmed = window.confirm(form.id ? "Are you sure you want to update this item?" : "Are you sure you want to add this item?");
  if (!confirmed) return;

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("alt", form.alt);
  if (imageFile) formData.append("image", imageFile);
  if (form.id) formData.append("id", form.id);

  const endpoint = form.id ? `${BASE_URL}/update.php` : `${BASE_URL}/add.php`;

  try {
    await axios.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setForm({ title: "", alt: "", id: null });
    setImageFile(null);

    // ✅ Wait until fresh items are fetched before re-enabling UI
    await fetchItems();
  } catch (error) {
    console.error("Failed to submit form:", error);
  }
};


  const handleEdit = (item) => {
    setForm({ title: item.title, alt: item.alt, id: item.id });
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  try {
    await axios.post(`${BASE_URL}/delete.php`, { id });
    fetchItems();
  } catch (error) {
    console.error("Failed to delete item:", error);
  }
};


  return (
    <div className="p-6 max-w-5xl mx-auto text-black">
      <h2 className="text-2xl font-bold mb-6">Manage Crusher Catalog</h2>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8 space-y-4">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="alt"
          value={form.alt}
          onChange={handleChange}
          placeholder="Alt Text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />

        <div className="flex items-center gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {form.id ? "Update Item" : "Add Item"}
          </button>
          {form.id && (
            <button
              onClick={() => {
                setForm({ title: "", alt: "", id: null });
                setImageFile(null);
              }}
              className="text-gray-600 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Alt</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
         <tbody>
  {Array.isArray(items) && items.map((item) => (
    <tr key={item.id} className="border-t">
      <td className="py-2 px-4">{item.title}</td>
      <td className="py-2 px-4">{item.alt}</td>
      <td className="py-2 px-4">
        <img src={`${BASE_URL}/uploads/${item.image}`} alt={item.alt} className="h-12 object-contain" />
      </td>
      <td className="py-2 px-4">
        <button
          onClick={() => handleEdit(item)}
          className="text-blue-600 hover:underline mr-3"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(item.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
  {Array.isArray(items) && items.length === 0 && (
    <tr>
      <td colSpan="4" className="text-center py-6 text-gray-500">
        No items available.
      </td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default CrusherCatalogAdmin;
