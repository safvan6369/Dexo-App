import React, { useState } from 'react';
import './forms.css'; // Use shared form styles

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    console.log('Contact form submitted:', { name, email, message });
    alert('Thank you for your message! We will get back to you shortly. (Functionality is front-end only for now)');
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <p>Have questions, feedback, or suggestions? We'd love to hear from you!</p>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contact-name">Your Name</label>
          <input
            type="text"
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">Your Email</label>
          <input
            type="email"
            id="contact-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="form-button">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;