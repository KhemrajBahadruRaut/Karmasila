import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar";

const PartDetails = () => {
  const { id } = useParams(); // dynamic part ID from route
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // fetch(`http://localhost/karmashila/parts_details/get_detail_by_id.php?id=${id}`)
    fetch(`https://karmasila.com.np/karmashila/parts_details/get_detail_by_id.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setDetails(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch part details");
        setLoading(false);
      });
  }, [id]);

  const openModal = (detail) => {
    setSelectedDetail(detail);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  if (loading) return <div className="text-center py-10 text-gray-600 text-lg">Loading part details...</div>;
  if (error) return <div className="text-red-600 text-center p-4">{error}</div>;

  return (
    <div className="bg-white">
      <Navbar/>
    <section className="min-h-screen bg-gradient-to-b container mx-auto from-white to-gray-100 px-4 md:px-20 pb-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 relative inline-block">
          Part <span className="text-green-900">Details</span>
          <motion.span
            layoutId="highlight"
            className="block h-[4px] w-24 bg-green-700 mt-2 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Explore individual crusher part specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {details.map((detail, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all flex flex-col"
          >
            {detail.image && (
              <img
                // src={`http://localhost/karmashila/uploads/${detail.image}`}
                src={`https://karmasila.com.np/karmashila/uploads/${detail.image}`}
                alt={detail.title}
                className="w-full h-52 object-cover"
              />
            )}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{detail.title}</h3>
              <p className="text-gray-700 text-sm mb-4 line-clamp-4 flex-grow">
                {detail.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-gray-500">
                  {new Date(detail.created_at).toLocaleDateString()}
                </span>
                <button
                  onClick={() => openModal(detail)}
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
        {isModalOpen && selectedDetail && (
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
                  <h3 className="text-2xl font-bold text-gray-900">{selectedDetail.title}</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 text-lg"
                    title="Close"
                  >
                    ✕
                  </button>
                </div>

                {selectedDetail.image && (
                  <img
                    // src={`http://localhost/karmashila/uploads/${selectedDetail.image}`}
                    src={`https://karmasila.com.np/karmashila/uploads/${selectedDetail.image}`}
                    alt={selectedDetail.title}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                )}

                <div className="prose prose-sm sm:prose text-gray-800">
                  {selectedDetail.description.split("\n").map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-6 text-sm text-gray-500 text-right">
                  Added on{" "}
                  {new Date(selectedDetail.created_at).toLocaleDateString("en-US", {
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

  );
};

export default PartDetails;
