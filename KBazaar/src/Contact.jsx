import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './Contact.css';
import { Link } from 'react-router-dom';

function Contact() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const storedUser = JSON.parse(sessionStorage.getItem("user"));
  if (storedUser) {
    setUser(storedUser);
    setFormData(prev => ({
      ...prev,
      name: storedUser.firstName + " " + storedUser.lastName,
      email: storedUser.email
    }));
  }
}, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      if (res.data.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      setStatus("Server error. Please try again.");
    }
      window.location="/contact"
  };

  return (
    <div className="contact-page">
      <div className="contact-back-home">
        <Link to="/" className="back-home-button">← Back to Home</Link>
      </div>

      <h1>Contact KBazaar</h1>
      <p>We’d love to hear from you. Please fill out the form below or reach us directly.</p>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name"  className="name" value={formData.name} onChange={handleChange} required   readOnly/>

          <label htmlFor="email">Email</label>
          <input type="email" id="email"className="email" value={formData.email} onChange={handleChange} required  readOnly/>

          <label htmlFor="message">Message</label>
          <textarea id="message" value={formData.message} onChange={handleChange} rows="5" placeholder='Type your message here...' required />

          <button type="submit">Send Message</button>
          {status && <p className="form-status">{status}</p>}
        </form>

        <div className="contact-info">
          <h2>Reach Us At</h2>
          <p><strong>Email:</strong> support@kbazaar.com</p>
          <p><strong>Phone:</strong> +91 77777 77777</p>
          <p><strong>Address:</strong> 14, Laxmi Enclave 2, Katargam, Surat, Gujarat.</p>
          <p><strong>Hours:</strong> Mon - Sat: 8 am - 10 pm</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
