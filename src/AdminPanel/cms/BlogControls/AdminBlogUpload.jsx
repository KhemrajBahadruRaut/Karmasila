import { useState, useEffect } from "react";

const AdminBlogUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [editingBlog, setEditingBlog] = useState({
    id: null,
    title: "",
    content: "",
    image: null,
    imageChanged: false,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (editingBlog.id !== null) {
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
      // url = "http://localhost/karmashila/blogs/api/update_blog.php";
      url = "https://karmasila.com.np/karmashila/blogs/api/update_blog.php";
      bodyData.append("id", editingBlog.id);
      bodyData.append("title", editingBlog.title);
      bodyData.append("content", editingBlog.content);
      if (editingBlog.imageChanged && editingBlog.image) {
        bodyData.append("image", editingBlog.image);
      }
    } else {
      bodyData.append("title", formData.title);
      bodyData.append("content", formData.content);
      if (formData.image) {
        bodyData.append("image", formData.image);
      }
    }

    const response = await fetch(url, {
      method: "POST",
      body: bodyData,
    });

    let result;
    try {
      const text = await response.text();
      console.log("🔍 Server response:", text); // Optional debug
      result = JSON.parse(text);
    } catch (err) {
      throw new Error("Invalid JSON returned from server.");
    }

    if (result.success) {
      setStatus(editingBlog.id ? "✅ Blog updated!" : "✅ Blog uploaded!");
      setStatusType("success");
      fetchBlogs();
      resetForm();
    } else {
      setStatus("❌ " + (result.error || "Operation failed"));
      setStatusType("error");
    }
  } catch (error) {
    setStatus("❌ Error: " + error.message);
    setStatusType("error");
  } finally {
    setIsSubmitting(false);
    setTimeout(() => {
      setStatus("");
      setStatusType("");
    }, 4000);
  }
};

  const fetchBlogs = () => {
    setLoadingBlogs(true);
    // fetch("http://localhos/t/karmashila/blogs/api/blogs.php")
    fetch("https://karmasila.com.np/karmashila/blogs/api/blogs.php")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoadingBlogs(false);
      })
      .catch(() => setLoadingBlogs(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this blog?")) return;

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
          alert("Error deleting blog.");
        }
        setDeletingId(null);
      })
      .catch(() => {
        alert("Server error.");
        setDeletingId(null);
      });
  };

  const startEditing = (blog) => {
    setEditingBlog({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      image: null,
      imageChanged: false,
      existingImage: blog.image,
    });
  };

  const cancelEditing = () => {
    resetForm();
  };

  return (
    <div className="w-full p-4 bg-white rounded-2xl">
      {/* Status Message */}
      {status && (
        <div
          className={`mb-4 text-center py-3 px-4 rounded-lg shadow-md text-sm ${
            statusType === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          {status}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="text-black w-full lg:w-2/3"
        >
          <div className="mb-4">
            <label className="block font-medium mb-1">Blog Title</label>
            <input
              type="text"
              name="title"
              value={editingBlog.id !== null ? editingBlog.title : formData.title}
              onChange={handleChange}
              required
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Content</label>
            <textarea
              name="content"
              value={editingBlog.id !== null ? editingBlog.content : formData.content}
              onChange={handleChange}
              rows={6}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
              placeholder="Write your blog content..."
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">
              {editingBlog.id !== null ? "Update Image (optional)" : "Upload Image"}
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm"
              required={editingBlog.id === null}
            />
            {/* Preview current image */}
            {editingBlog.id && !editingBlog.imageChanged && editingBlog.existingImage && (
              <img
                // src={`http://localhost/karmashila/blogs/uploads/${editingBlog.existingImage}`}
                src={`https://karmasila.com.np/karmashila/blogs/uploads/${editingBlog.existingImage}`}
                alt="Current"
                className="mt-2 h-24 object-contain"
              />
            )}
            {/* Preview newly selected image */}
            {editingBlog.image && (
              <img
                src={URL.createObjectURL(editingBlog.image)}
                alt="Preview"
                className="mt-2 h-24 object-contain"
              />
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`py-3 px-5 font-semibold rounded-lg transition ${
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
            {editingBlog.id && (
              <button
                type="button"
                onClick={cancelEditing}
                className="py-3 px-4 font-semibold rounded-lg border border-gray-400 hover:bg-gray-100"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Blog List */}
        <div className="w-full lg:w-1/3 border border-gray-300 rounded-lg p-4 max-h-[600px] overflow-y-auto">
          <h3 className="text-xl font-semibold text-center mb-4 text-black">📝 Your Blogs</h3>
          {loadingBlogs ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center text-gray-400">No blogs found.</p>
          ) : (
            <ul className="space-y-4">
              {blogs.map((blog) => (
                <li
                  key={blog.id}
                  className="border border-gray-300 rounded-lg p-4 flex justify-between gap-4 items-start"
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
                      className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      disabled={deletingId === blog.id}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
                    >
                      {deletingId === blog.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogUpload;
