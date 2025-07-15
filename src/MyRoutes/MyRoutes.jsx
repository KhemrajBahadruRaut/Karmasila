import { BrowserRouter, Route, Routes } from "react-router-dom"
import RequestQuote from "../components/Catalog/RequestQuote";
import ConsultForm from "../components/ImportExport/ConsultForm";
import AdminPanel from "../AdminPanel/AdminPanel";
import Dashboard from "../AdminPanel/Dashbard";
import PartDetails from "../components/navParts/PartDetails";
import Home from "../pages/Home";
import BlogSection from "../components/blogs/BlogSection";
import AdminLogin from "../AdminPanel/AdminLogin";
import ProtectedRoute from "./ProtectedRoute";
import About from "../pages/About";
import Contact from "../pages/Contact";
// import CrusherCatalogAdmin from "../AdminPanel/cms/crusherCatalog/CrusherCatalogAdmin";
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
          <Route path="/parts/:id" element={<PartDetails />} />

          {/* for Blog section */}
          <Route path="/blog" element={<BlogSection />} />

          {/* for catalog section */}
          {/* <Route path="/catalogs/add" element={<CrusherCatalogAdmin/>}/> */}

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
