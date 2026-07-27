import { useState } from 'react'
import Button from '../../components/Button/Button.jsx'
import './Contact.css'

const initialForm = { name: '', email: '', subject: '', message: '' }

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setForm(initialForm)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="page-fade-in contact-page">
      <div className="contact-hero">
        <div className="container">
          <span className="eyebrow">We're Here to Help</span>
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle">
            Questions about an order, a product, or just want to say hi? Send us a message.
          </p>
        </div>
      </div>

      <div className="container contact-body">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-info-card">
              <span>📍</span>
              <div>
                <h3>Visit Us</h3>
                <p>Flat No. 402, Tower B, Sunshine Apartments, Sector 62, Noida, Uttar Pradesh, 201301</p>
              </div>
            </div>
            <div className="contact-info-card">
              <span>📞</span>
              <div>
                <h3>Call Us</h3>
                <p>+1 (91) XXXXXXX072</p>
              </div>
            </div>
            <div className="contact-info-card">
              <span>✉️</span>
              <div>
                <h3>Email Us</h3>
                <p>support@shopzone.com</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label className="form-field">
                Name
                <input name="name" required value={form.name} onChange={handleChange} placeholder="Ravikant " />
              </label>
              <label className="form-field">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ravikant@gmail.com"
                />
              </label>
              <label className="form-field" style={{ gridColumn: 'span 2' }}>
                Subject
                <input
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Order inquiry"
                />
              </label>
              <label className="form-field" style={{ gridColumn: 'span 2' }}>
                Message
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                />
              </label>
            </div>

            {submitted && <p className="contact-success">✅ Message sent — we'll reply within 24 hours.</p>}

            <Button type="submit" variant="primary" size="lg">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
