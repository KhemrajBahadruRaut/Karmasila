import { BrowserRouter, Route, Routes } from "react-router-dom"
import RequestQuote from "../components/Catalog/RequestQuote";
import ConsultForm from "../components/ImportExport/ConsultForm";
import AdminPanel from "../AdminPanel/AdminPanel";
import Dashboard from "../AdminPanel/Dashbard";
import AddPartForm from "../AdminPanel/cms/parts/AddPartForm";
import PartDetails from "../components/navParts/PartDetails";
import Home from "../pages/Home";
import BlogSection from "../components/blogs/BlogSection";
import AdminBlogUpload from "../AdminPanel/cms/BlogControls/AdminBlogUpload";
import AdminLogin from "../AdminPanel/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import About from "../pages/About";
import Contact from "../pages/Contact";
const MyRoutes = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/request-quote" element={<RequestQuote />} />
          <Route path="/consult" element={<ConsultForm />} />

          <Route path="/dashboard" element={<Dashboard />} />

          {/* for dynamic part section  */}
          <Route path="/parts/add" element={<AddPartForm />} />
          <Route path="/parts/:id" element={<PartDetails />} />

          {/* for Blog section */}
          <Route path="/blog" element={<BlogSection />} />
          <Route path="/blog/add" element={<AdminBlogUpload />} />

          {/*this is for admin panel  */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MyRoutes;
