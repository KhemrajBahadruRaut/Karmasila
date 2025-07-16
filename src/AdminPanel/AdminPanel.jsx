import { useState } from "react";

// this is parts section
import AddPartForm from "./cms/parts/AddPartForm";
import Details from "./cms/parts/Details";

// this is blog section
import {
  FaChevronDown,
  FaChevronUp,
  FaCogs,
  FaBoxes,
  FaTachometerAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiDashboardFill } from "react-icons/ri";
import AdminBlogUpload from "./cms/BlogControls/AdminBlogUpload";
import { LiaBlogSolid } from "react-icons/lia";
import Dashboard from "./Dashbard";
import { LuContact } from "react-icons/lu";
import NewsletterList from "./newsletter/NewsletterList";
import ContactMessages from "./contacts/ContactMessages";
import { BsNewspaper } from "react-icons/bs";
import CrusherCatalogAdmin from "./cms/crusherCatalog/CrusherCatalogAdmin";
import AdminConsultRequests from "./consult/AdminConsultRequests";
import AdminQuoteRequests from "./quote/AdminQuoteRequests";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [expandedSections, setExpandedSections] = useState({
    cms: false,
    parts: false,
    blogs: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex h-screen font-sans bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-6 overflow-y-auto shadow-xl flex flex-col">
        {/* Logo/Branding */}
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold tracking-tight flex items-center">
            <RiDashboardFill className="text-blue-600 mr-3 text-3xl" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
              Admin
            </span>
          </h1>
          <p className="text-xs text-gray-300 mt-1">Management Console</p>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-2">
          {/* Dashboard */}
          <button
            onClick={() => setActiveSection("dashboard")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
              ${
                activeSection === "dashboard"
                  ? "bg-gray-700 text-blue-300 font-medium shadow-md"
                  : "hover:bg-gray-700 hover:text-blue-300"
              }
            `}
          >
            <FaTachometerAlt className="mr-3 text-lg" />
            <span>Dashboard</span>
          </button>

          {/* newsletter */}
          <button
            onClick={() => setActiveSection("newsletter")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
              ${
                activeSection === "newsletter"
                  ? "bg-gray-700 text-blue-300 font-medium shadow-md"
                  : "hover:bg-gray-700 hover:text-blue-300"
              }
            `}
          >
            <BsNewspaper className="mr-3 text-lg" />
            <span>Newsletter Data</span>
          </button>
          {/* contacts */}
          <button
            onClick={() => setActiveSection("contacts")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
              ${
                activeSection === "contacts"
                  ? "bg-gray-700 text-blue-300 font-medium shadow-md"
                  : "hover:bg-gray-700 hover:text-blue-300"
              }
            `}
          >
            <LuContact className="mr-3 text-lg" />
            <span>Contacts Data</span>
          </button>


          {/* consult */}
          <button
            onClick={() => setActiveSection("consult")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
              ${
                activeSection === "consult"
                  ? "bg-gray-700 text-blue-300 font-medium shadow-md"
                  : "hover:bg-gray-700 hover:text-blue-300"
              }
            `}
          >
            <LuContact className="mr-3 text-lg" />
            <span>Consult Data</span>
          </button>

          {/* quote */}
          <button
            onClick={() => setActiveSection("quote")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
              ${
                activeSection === "quote"
                  ? "bg-gray-700 text-blue-300 font-medium shadow-md"
                  : "hover:bg-gray-700 hover:text-blue-300"
              }
            `}
          >
            <LuContact className="mr-3 text-lg" />
            <span>Quote Data</span>
          </button>

          {/* CMS Section */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSection("cms")}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200
                ${
                  expandedSections.cms || activeSection.startsWith("cms")
                    ? "bg-gray-700 text-blue-400 font-medium"
                    : "hover:bg-gray-700 hover:text-blue-300"
                }
              `}
            >
              <div className="flex items-center ">
                <FaCogs className="mr-3 text-lg" />
                <span>CMS</span>
              </div>
              <span>
                {expandedSections.cms ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>

            {expandedSections.cms && (
              <div className="pl-8 space-y-1 mt-1 mb-2">
                {/* Parts Subsection */}
                <div className="space-y-1">
                  <button
                    onClick={() => toggleSection("parts")}
                    className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all duration-200
                      ${
                        expandedSections.parts ||
                        activeSection.startsWith("parts")
                          ? "bg-gray-600 text-blue-300 font-medium"
                          : "hover:bg-gray-600 hover:text-blue-200"
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <FaBoxes className="mr-3" />
                      <span className="text-[13px]">Parts Management</span>
                    </div>
                    <span>
                      {expandedSections.parts ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  </button>

                  {expandedSections.parts && (
                    <div className="pl-8 space-y-1 mt-1">
                      {/* Add New Part button */}
                      <button
                        onClick={() => setActiveSection("parts/add")}
                        className={`block w-full text-left px-4 py-1 rounded-lg transition-all duration-200
        ${
          activeSection === "parts/add"
            ? "bg-blue-400 text-gray-900 font-medium shadow-inner"
            : "hover:bg-gray-500 hover:text-white"
        }
      `}
                      >
                        <span className="text-[11px]">Add New Part</span>
                      </button>

                      {/* ➕ Add Product Details button */}
                      <button
                        onClick={() => setActiveSection("parts/details")}
                        className={`block w-full text-left px-4 py-1 rounded-lg transition-all duration-200
        ${
          activeSection === "parts/details"
            ? "bg-blue-400 text-gray-900 font-medium shadow-inner"
            : "hover:bg-gray-500 hover:text-white"
        }
      `}
                      >
                        <span className="text-[11px]">Add Product Details</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* blogs */}
                <div className="space-y-1">
                  <button
                    onClick={() => toggleSection("blogs")}
                    className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all duration-200
                      ${
                        expandedSections.parts ||
                        activeSection.startsWith("blogs")
                          ? "bg-gray-600 text-blue-300 font-medium"
                          : "hover:bg-gray-600 hover:text-blue-200"
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <LiaBlogSolid className="mr-3" />
                      <span className="text-[13px]">Blogs</span>
                    </div>
                    <span>
                      {expandedSections.blogs ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  </button>

                  {expandedSections.blogs && (
                    <div className="pl-8 space-y-1 mt-1">
                      {/* Add New Part button */}
                      <button
                        onClick={() => setActiveSection("blogs/add")}
                        className={`block w-full text-left px-4 py-1 rounded-lg transition-all duration-200
        ${
          activeSection === "blogs/add"
            ? "bg-blue-400 text-gray-900 font-medium shadow-inner"
            : "hover:bg-gray-500 hover:text-white"
        }
      `}
                      >
                        <span className="text-[11px]">Add New Blogs</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Product Catalog */}
                <div className="space-y-1">
                  <button
                    onClick={() => toggleSection("catalogs")}
                    className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all duration-200
                      ${
                        expandedSections.parts ||
                        activeSection.startsWith("catalogs")
                          ? "bg-gray-600 text-blue-300 font-medium"
                          : "hover:bg-gray-600 hover:text-blue-200"
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <LiaBlogSolid className="mr-3" />
                      <span className="text-[13px]">Catalogs</span>
                    </div>
                    <span>
                      {expandedSections.catalogs ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </span>
                  </button>

                  {expandedSections.catalogs && (
                    <div className="pl-8 space-y-1 mt-1">
                      {/* Add New Part button */}
                      <button
                        onClick={() => setActiveSection("catalogs/add")}
                        className={`block w-full text-left px-4 py-1 rounded-lg transition-all duration-200
        ${
          activeSection === "catalogs/add"
            ? "bg-blue-400 text-gray-900 font-medium shadow-inner"
            : "hover:bg-gray-500 hover:text-white"
        }
      `}
                      >
                        <span className="text-[11px]">Add catalogs</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Users Section */}
          {/* <button
            onClick={() => setActiveSection("users")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
              ${
                activeSection === "users"
                    ? "bg-gray-700 text-blue-400 font-medium shadow-md"
                    : "hover:bg-gray-700 hover:text-blue-300"
              }
            `}
          >
            <FaUsers className="mr-3 text-lg" />
            <span>User Management</span>
          </button> */}

          {/* Analytics Section */}
          {/* <button
            onClick={() => setActiveSection("analytics")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
              ${
                activeSection === "analytics"
                    ? "bg-gray-700 text-blue-400 font-medium shadow-md"
                    : "hover:bg-gray-700 hover:text-blue-300"
              }
            `}
          >
            <FaChartLine className="mr-3 text-lg" />
            <span>Analytics</span>
          </button> */}
        </nav>

        {/* Bottom Settings/Logout */}
        <div className="mt-auto pt-4 border-t border-gray-700 space-y-2">
          <button
            onClick={() => setActiveSection("settings")}
            className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200
              ${
                activeSection === "settings"
                  ? "bg-gray-700 text-blue-400 font-medium"
                  : "hover:bg-gray-700 hover:text-blue-300"
              }
            `}
          >
            <FaCog className="mr-3 text-lg" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("isAdminLoggedIn");
              window.location.href = "/adminlogin";
            }}
            className="flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-900 hover:text-red-200"
          >
            <FaSignOutAlt className="mr-3 text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {activeSection.replace("/", " ")}
            </h2>
            <div className="flex items-center space-x-4">
              {/* <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
                </button>
              </div> */}
              <div className="flex items-center space-x-2">
                {/* <div className="h-20 w-20 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 flex items-center justify-center text-white font-bold">
                  <img src="/image-removebg-preview.png" alt="" />
                </div> */}
                <span className="text-gray-700 font-medium">
                  Welcome! Admin
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {activeSection === "parts/add" ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Add New Part
                </h3>
                <p className="text-gray-500">
                  Fill out the form to add a new part to inventory
                </p>
              </div>
              <AddPartForm />
            </div>
          ) : activeSection === "parts/details" ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  Add Product Details
                </h3>
                <p className="text-gray-500">
                  Upload pictures and descriptions for the selected part.
                </p>
              </div>
              <Details />
            </div>
          ) : activeSection === "blogs/add" ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <AdminBlogUpload />
            </div>
          ) : activeSection === "dashboard" ? (
            <div className="space-y-6">
              <Dashboard />
            </div>
          ) : activeSection === "consult" ? (
            <div className="space-y-6">
              <AdminConsultRequests />
            </div>
          ) : activeSection === "newsletter" ? (
            <div className="space-y-6">
              <NewsletterList />
            </div>
          ) : activeSection === "contacts" ? (
            <div className="space-y-6">
              <ContactMessages />
            </div>
          ) : activeSection === "quote" ? (
            <div className="space-y-6">
              <AdminQuoteRequests />
            </div>
          ) :  activeSection === "catalogs/add" ? (
            <div className="space-y-6">
              <CrusherCatalogAdmin />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {activeSection === "dashboard"
                    ? "Welcome to Admin Dashboard"
                    : `${activeSection.replace("/", " ")} Management`}
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {activeSection === "dashboard"
                    ? "Select a section from the sidebar to manage your content"
                    : "This section is under development. Coming soon!"}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
