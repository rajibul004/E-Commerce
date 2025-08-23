import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

// Contact Form with state management
const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white"
            placeholder="your.email@example.com"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white"
          placeholder="+91 98765 43210"
        />
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
          Subject *
        </label>
        <select 
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white"
        >
          <option value="">Select a topic</option>
          <option value="test-drive">Test Drive</option>
          <option value="purchase">Purchase Inquiry</option>
          <option value="support">Technical Support</option>
          <option value="partnership">Partnership</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows="5"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
          placeholder="Tell us how we can help you..."
        ></textarea>
      </div>
      
      <button 
        type="button"
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Send Message
      </button>
    </div>
  );
};

const ShowroomCard = ({ city, address, phone, timing, mapLink, featured }) => {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border ${
      featured ? 'ring-2 ring-blue-500 relative' : 'border-gray-100'
    }`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            Flagship Store
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{city}</h3>
        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
      </div>
      
      <div className="space-y-3 mb-6 text-gray-600 text-sm">
        <p className="flex items-start">
          <MapPin className="mr-2 mt-1 text-blue-500 flex-shrink-0" size={16} />
          <span>{address}</span>
        </p>
        <p className="flex items-center">
          <Phone className="mr-2 text-green-500 flex-shrink-0" size={16} />
          <span>{phone}</span>
        </p>
        <p className="flex items-center">
          <Clock className="mr-2 text-orange-500 flex-shrink-0" size={16} />
          <span>{timing}</span>
        </p>
      </div>
      
      <a 
        href={mapLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg text-sm"
      >
        Get Directions 
        <ArrowRight className="ml-2" size={14} />
      </a>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white py-20 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6 border border-white/20">
            <Mail className="mr-2 w-4 h-4" />
            Let's Connect
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300 leading-relaxed">
            Get in touch with our team for any inquiries, feedback, or to schedule a test ride.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">50+</div>
              <div className="text-sm text-gray-400">Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info + Form Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-bold mb-1 text-gray-900">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-1">
                  Whether you're interested in a test drive or have questions about our vehicles, we're here to help.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-3 text-gray-900">
                    <div className="p-2 bg-blue-500 text-white rounded-lg">
                      <MapPin size={20} />
                    </div>
                    Our Location
                  </h3>
                  <div className="ml-11 text-gray-700">
                    <p>Fancy Market 2nd Floor, Tinkonia Bus Stand,</p>
                    <p>Bardhaman, West Bengal, 713101, India</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-3 text-gray-900">
                    <div className="p-2 bg-green-500 text-white rounded-lg">
                      <Phone size={20} />
                    </div>
                    Call Us
                  </h3>
                  <div className="ml-11 text-gray-700">
                    <p>+91 98765 43210</p>
                    <p>+91 98765 43211</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-3 text-gray-900">
                    <div className="p-2 bg-purple-500 text-white rounded-lg">
                      <Mail size={20} />
                    </div>
                    Email Us
                  </h3>
                  <div className="ml-11 text-gray-700">
                    <p>info@rijiyaev.com</p>
                    <p>support@rijiyaev.com</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-2xl border border-orange-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-lg font-semibold mb-1 flex items-center gap-3 text-gray-900">
                    <div className="p-2 bg-orange-500 text-white rounded-lg">
                      <Clock size={20} />
                    </div>
                    Working Hours
                  </h3>
                  <div className="ml-11 text-gray-700">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-3xl border border-gray-100 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Showrooms Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm mb-4">
              <MapPin className="mr-2 w-4 h-4" />
              Our Locations
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Visit Our Showrooms</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience our electric vehicles in person at any of our flagship showrooms across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ShowroomCard
              city="Kolkata"
              address="123 EV Boulevard, Park Street, Kolkata - 700016"
              phone="+91 98765 43210"
              timing="10:00 AM - 7:00 PM"
              mapLink="https://goo.gl/maps/example1"
              featured={true}
            />

            <ShowroomCard
              city="Delhi"
              address="456 Green Avenue, Connaught Place, Delhi - 110001"
              phone="+91 98765 43211"
              timing="10:00 AM - 7:00 PM"
              mapLink="https://goo.gl/maps/example2"
            />

            <ShowroomCard
              city="Mumbai"
              address="789 Innovation Street, Bandra West, Mumbai - 400050"
              phone="+91 98765 43212"
              timing="10:00 AM - 7:00 PM"
              mapLink="https://goo.gl/maps/example3"
            />
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Find Us on the Map</h3>
            <p className="text-lg text-gray-600">Located in the heart of Bardhaman, West Bengal</p>
          </div>
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d460.9435572801327!2d87.86890564769762!3d23.245332565237003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f849c3d042e55d%3A0x8cb19836a8ea999b!2sFancy%20Market%2C%20Grand%20Trunk%20Rd%2C%20Khosbagan%2C%20Bardhaman%2C%20West%20Bengal%20713101!5e1!3m2!1sen!2sin!4v1748845458644!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Fancy Market, Bardhaman Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;