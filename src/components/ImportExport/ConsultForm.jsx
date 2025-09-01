import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer/Footer';
import WhatsAppBtn from '../Home_sub/WhatsappBtn';
import Swal from 'sweetalert2';
import DOMPurify from 'dompurify';

const ConsultForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemId: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Sanitize input to prevent XSS
  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    // Remove HTML tags and potentially dangerous characters
    return DOMPurify.sanitize(input, { 
      ALLOWED_TAGS: [], 
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true 
    }).trim();
  };

  // Enhanced validation with XSS protection
  const isValidInput = (input) => {
    // Check for potential script injections
    const dangerousPatterns = [
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe/gi,
      /<object/gi,
      /<embed/gi,
      /<link/gi,
      /<meta/gi,
      /vbscript:/gi,
      /data:/gi
    ];
    
    return !dangerousPatterns.some(pattern => pattern.test(input));
  };

  useEffect(() => {
    Object.keys(formData).forEach(field => {
      if (touched[field]) validateField(field, formData[field]);
    });
  }, [formData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input and check for XSS attempts
    const sanitizedValue = sanitizeInput(value);
    
    if (!isValidInput(sanitizedValue)) {
      setErrors(prev => ({ 
        ...prev, 
        [name]: 'Invalid characters detected. Please remove any HTML or script content.' 
      }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (field, value) => {
    let error = '';
    
    // First check for XSS attempts
    if (!isValidInput(value)) {
      error = 'Invalid characters detected. Please remove any HTML or script content.';
      setErrors(prev => ({ ...prev, [field]: error }));
      return false;
    }

    const sanitizedValue = sanitizeInput(value);

    switch (field) {
      case 'name':
        if (!sanitizedValue) {
          error = 'Full name is required';
        } else if (sanitizedValue.length > 100) {
          error = 'Name must be less than 100 characters';
        } else if (!/^[a-zA-Z\s\-'\.]+$/.test(sanitizedValue)) {
          error = 'Name can only contain letters, spaces, hyphens, apostrophes, and periods';
        }
        break;
        
      case 'email':
        if (!sanitizedValue) {
          error = 'Email is required';
        } else if (sanitizedValue.length > 254) {
          error = 'Email must be less than 254 characters';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedValue)) {
          error = 'Invalid email format';
        }
        break;
        
      case 'phone':
        if (!sanitizedValue) {
          error = 'Phone number is required';
        } else if (!/^[\d\-\+\(\)\s]+$/.test(sanitizedValue)) {
          error = 'Phone number can only contain digits, spaces, and basic formatting characters';
        } else if (sanitizedValue.replace(/\D/g, '').length < 7 || sanitizedValue.replace(/\D/g, '').length > 15) {
          error = 'Phone number must contain 7-15 digits';
        }
        break;
        
      case 'company':
        if (sanitizedValue && sanitizedValue.length > 200) {
          error = 'Company name must be less than 200 characters';
        } else if (sanitizedValue && !/^[a-zA-Z0-9\s\-&\.,\(\)]+$/.test(sanitizedValue)) {
          error = 'Company name contains invalid characters';
        }
        break;
        
      case 'message':
        if (!sanitizedValue) {
          error = 'Message is required';
        } else if (sanitizedValue.length > 2000) {
          error = 'Message must be less than 2000 characters';
        }
        break;
        
      case 'itemId':
        if (sanitizedValue && !/^[a-zA-Z0-9\-_]+$/.test(sanitizedValue)) {
          error = 'Invalid item ID format';
        }
        break;
        
      default:
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = () => {
    let valid = true;
    const newTouched = {};
    
    Object.keys(formData).forEach(field => {
      newTouched[field] = true;
      const isValid = validateField(field, formData[field]);
      if (!isValid) valid = false;
    });
    
    setTouched(newTouched);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fix the errors in the form before submitting.',
        confirmButtonColor: '#f87171',
      });
      return;
    }

    const confirm = await Swal.fire({
      title: 'Confirm Submission',
      text: 'Are you sure you want to submit your consult request?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#facc15',
      cancelButtonColor: '#d1d5db',
      confirmButtonText: 'Yes, submit',
      cancelButtonText: 'Cancel',
    });

    if (!confirm.isConfirmed) return;

    try {
      // Double-sanitize form data before sending
      const sanitizedFormData = {};
      Object.keys(formData).forEach(key => {
        sanitizedFormData[key] = sanitizeInput(formData[key]);
      });

      const response = await fetch('https://karmasila.com.np/karmashila/consult/submit_consult.php', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          // Add CSRF protection if available
          // 'X-CSRF-Token': csrfToken
        },
        body: JSON.stringify(sanitizedFormData)
      });

      const result = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Submitted!',
          text: 'Thank you for submitting your consult request.',
          confirmButtonColor: '#facc15',
        }).then(() => navigate('/'));
      } else {
        // Sanitize error message from server
        const errorMessage = sanitizeInput(result.error) || 'Submission failed.';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          confirmButtonColor: '#f87171',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Unable to submit form. Please try again later.',
        confirmButtonColor: '#f87171',
      });
    }
  };

  const renderError = (field) => {
    return errors[field] && touched[field] ? (
      <p className="text-red-500 text-sm mt-1" role="alert">
        {/* Error messages are already sanitized in validateField */}
        {errors[field]}
      </p>
    ) : null;
  };

  const getFieldLabel = (field) => {
    const labels = {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      company: 'Company (Optional)',
      message: 'Message'
    };
    return labels[field] || field.charAt(0).toUpperCase() + field.slice(1);
  };

  const isRequired = (field) => ['name', 'email', 'phone', 'message'].includes(field);

  return (
    <>
      <div className="bg-white">
        <Navbar />
      </div>
      <WhatsAppBtn />
      <div className="min-h-screen bg-gray-50 flex flex-col mx-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden px-6 py-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>
              <div className="md:col-span-2">
                <h1 className="text-2xl font-bold text-black mb-4">Request a Consult</h1>
                <h2 className="text-gray-600">Fill out the form below and we'll get back to you soon</h2>
              </div>

              {['name', 'email', 'phone', 'company', 'message'].map((field) => (
                <div key={field} className={field === 'message' ? 'md:col-span-2' : ''}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {getFieldLabel(field)}
                    {isRequired(field) && <span className="text-red-500 ml-1" aria-label="required">*</span>}
                  </label>
                  {field !== 'message' ? (
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={isRequired(field)}
                      maxLength={field === 'name' ? 100 : field === 'email' ? 254 : field === 'company' ? 200 : undefined}
                      autoComplete={field === 'name' ? 'name' : field === 'email' ? 'email' : field === 'phone' ? 'tel' : field === 'company' ? 'organization' : 'off'}
                      className={`mt-1 text-black block w-full px-3 py-2 border ${errors[field] && touched[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                      aria-invalid={errors[field] && touched[field] ? 'true' : 'false'}
                      aria-describedby={errors[field] && touched[field] ? `${field}-error` : undefined}
                    />
                  ) : (
                    <textarea
                      id={field}
                      name={field}
                      rows="4"
                      value={formData[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required={isRequired(field)}
                      maxLength={2000}
                      className={`mt-1 text-black block w-full px-3 py-2 border ${errors[field] && touched[field] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                      aria-invalid={errors[field] && touched[field] ? 'true' : 'false'}
                      aria-describedby={errors[field] && touched[field] ? `${field}-error` : undefined}
                    />
                  )}
                  {errors[field] && touched[field] && (
                    <div id={`${field}-error`}>
                      {renderError(field)}
                    </div>
                  )}
                </div>
              ))}

              <div className="md:col-span-2 flex justify-between mt-6 mb-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ConsultForm;