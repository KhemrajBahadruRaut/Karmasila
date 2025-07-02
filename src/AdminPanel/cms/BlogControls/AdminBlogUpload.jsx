import { useState, useEffect } from "react";

const AdminBlogUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEditSection, setShowEditSection] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // New state for editing
  const [editingBlog, setEditingBlog] = useState({
    id: null,
    title: "",
    content: "",
    image: null,
    imageChanged: false, // track if user updated image
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (editingBlog.id !== null) {
      // If editing mode
      if (name === "image") {
        setEditingBlog((prev) => ({
          ...prev,
          image: files[0],
          imageChanged: true,
        }));
      } else {
        setEditingBlog((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      // Normal new blog mode
      if (name === "image") {
        setFormData((prev) => ({ ...prev, image: files[0] }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", image: null });
    setEditingBlog({ id: null, title: "", content: "", image: null, imageChanged: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");
    setStatusType("");

    try {
      // let url = "http://localhost/karmashila/blogs/api/upload_blog.php";
      let url = "https://karmasila.com.np/karmashila/blogs/api/upload_blog.php";
      let bodyData = new FormData();

      if (editingBlog.id !== null) {
        // Update existing blog
        // url = "http://localhost/karmashila/blogs/api/update_blog.php";
        url = "https://karmasila.com.np/karmashila/blogs/api/update_blog.php";
        bodyData.append("id", editingBlog.id);
        bodyData.append("title", editingBlog.title);
        bodyData.append("content", editingBlog.content);
        if (editingBlog.imageChanged && editingBlog.image) {
          bodyData.append("image", editingBlog.image);
        }
      } else {
        // New blog upload
        bodyData.append("title", formData.title);
        bodyData.append("content", formData.content);
        bodyData.append("image", formData.image);
      }

      const response = await fetch(url, {
        method: "POST",
        body: bodyData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus(editingBlog.id !== null ? "✅ Blog updated successfully!" : "✅ Blog uploaded successfully!");
        setStatusType("success");

        // Refresh blogs list after operation
        fetchBlogs();

        resetForm();
      } else {
        setStatus("❌ Operation failed: " + (result.error || "Unknown error"));
        setStatusType("error");
      }
    } catch (error) {
      setStatus("❌ Operation failed: " + error.message);
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setStatus("");
        setStatusType("");
      }, 4000);
    }
  };

  const toggleEditSection = () => {
    setShowEditSection((prev) => !prev);
    if (!showEditSection) fetchBlogs();
  };

  const fetchBlogs = () => {
    setLoadingBlogs(true);
    // fetch("http://localhost/karmashila/blogs/api/blogs.php")
    fetch("https://karmasila.com.np/karmashila/blogs/api/blogs.php")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoadingBlogs(false);
      })
      .catch(() => setLoadingBlogs(false));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this blog?");
    if (!confirmDelete) return;

    setDeletingId(id);
    // fetch("http://localhost/karmashila/blogs/api/delete_blog.php", {
    fetch("https://karmasila.com.np/karmashila/blogs/api/delete_blog.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        } else {
          alert("Error deleting blog");
        }
        setDeletingId(null);
      })
      .catch(() => {
        alert("Server error");
        setDeletingId(null);
      });
  };

  // Start editing a blog
  const startEditing = (blog) => {
    setEditingBlog({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      image: null,
      imageChanged: false,
    });
    // Show edit section if hidden
    if (!showEditSection) setShowEditSection(true);
  };

  // Cancel editing
  const cancelEditing = () => {
    resetForm();
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl! font-bold text-gray-800">
          {editingBlog.id !== null ? "✏️ Edit Blog" : "✍️ Upload New Blog"}
        </h2>
        <button
          onClick={toggleEditSection}
          className="bg-gray-100 hover:bg-gray-200 border px-4 py-2 text-sm rounded-lg shadow-sm"
        >
          {showEditSection ? "Hide Blogs" : "🛠️ Edit Blogs"}
        </button>
      </div>

      {/* Upload/Edit Blog Form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Blog Title</label>
          <input
            type="text"
            name="title"
            value={editingBlog.id !== null ? editingBlog.title : formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            value={editingBlog.id !== null ? editingBlog.content : formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            required
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            {editingBlog.id !== null ? "Choose Image *" : "Upload Image"}
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm"
            // required only when adding new blog
            required={editingBlog.id === null}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-grow py-3 font-semibold rounded-lg transition duration-300 ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isSubmitting
              ? editingBlog.id !== null
                ? "Updating..."
                : "Uploading..."
              : editingBlog.id !== null
              ? "💾 Save Changes"
              : "🚀 Submit Blog"}
          </button>
          {editingBlog.id !== null && (
            <button
              type="button"
              onClick={cancelEditing}
              disabled={isSubmitting}
              className="flex-grow py-3 font-semibold rounded-lg border border-gray-400 hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Status Message */}
      {status && (
        <div
          className={`mt-5 text-center py-3 px-4 rounded-lg shadow-md text-sm ${
            statusType === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {status}
        </div>
      )}

      {/* Edit Blogs Section */}
      {showEditSection && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">📝 Your Blogs</h3>
          {loadingBlogs ? (
            <div className="text-center text-sm text-gray-500">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="text-center text-sm text-gray-400">No blogs available</div>
          ) : (
            <ul className="space-y-4">
              {blogs.map((blog) => (
                <li
                  key={blog.id}
                  className="border rounded-lg p-4 flex justify-between items-start gap-4"
                >
                  <div>
                    <h4 className="font-medium text-gray-800">{blog.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{blog.content}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(blog.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => startEditing(blog)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      disabled={deletingId === blog.id}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg"
                    >
                      {deletingId === blog.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBlogUpload;
