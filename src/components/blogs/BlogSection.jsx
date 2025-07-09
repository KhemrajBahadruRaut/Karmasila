import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // fetch("http://localhost/karmashila/blogs/api/blogs.php")
    fetch("https://karmasila.com.np/karmashila/blogs/api/blogs.php")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Loading blogs...
      </div>
    );
  }

  return (
    <>
    <div className="bg-white">
    <Navbar/>
      <section className="min-h-screen container mx-auto bg-gradient-to-b from-white to-gray-100 px-4 md:px-20 pb-16 ">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 relative inline-block">
            Latest Blogs
        
          </h1>
          <h2 className="text-gray-500 mt-2 text-sm md:text-base">
            Stay updated with our newest insights and stories.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all  flex flex-col"
            >
              {blog.image && (
                <img
                  // src={`http://localhost/karmashila/blogs/uploads/${blog.image}`}
                  src={`https://karmasila.com.np/karmashila/blogs/uploads/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                />
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4 line-clamp-4 flex-grow">
                  {blog.content}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-gray-500">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => openModal(blog)}
                    className="text-sm text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600 transition px-3 py-1 rounded-lg"
                  >
                    Explore →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedBlog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {selectedBlog.title}
                    </h3>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-700 text-lg"
                      title="Close"
                    >
                      ✕
                    </button>
                  </div>

                  {selectedBlog.image && (
                    <img
                      // src={`http://localhost/karmashila/blogs/uploads/${selectedBlog.image}`}
                      src={`https://karmasila.com.np/karmashila/blogs/uploads/${selectedBlog.image}`}
                      alt={selectedBlog.title}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  )}

                  <div className="prose prose-sm sm:prose text-gray-800">
                    {selectedBlog.content.split("\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-6 text-sm text-gray-500 text-right">
                    Published on{" "}
                    {new Date(selectedBlog.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default BlogSection;
