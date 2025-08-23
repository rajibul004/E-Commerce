import React from "react";
import { Layers, Users, Zap, Star, Award, TrendingUp, Check } from "lucide-react";

// Accent color for electric blue
const electric = "bg-gradient-to-tr from-indigo-500 via-sky-400 to-green-400";

const About = () => {
  const features = [
    "Zero emissions electric mobility solutions",
    "Cutting-edge battery technology for extended range",
    "Affordable transportation for everyday commuters",
    "Advanced safety features for optimal protection",
    "Smart connectivity with mobile application",
    "Minimal maintenance requirements",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1626000115135-c1de1556ed42?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow mb-5 animate-fadeIn">
            About Riji EV
          </h1>
          <p className="text-2xl max-w-2xl mx-auto font-medium opacity-90 animate-fadeIn delay-75">
            We're on a mission to transform mobility with sustainable, affordable electric vehicles designed for India.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
            <p className="text-gray-600 mb-4 text-lg">
              Founded in 2016, Rijiya Pvt. Ltd. began with a simple yet powerful vision: to create sustainable and affordable electric mobility solutions designed specifically for Indian roads and consumers.
            </p>
            <p className="text-gray-600 mb-4 text-lg">
              Our founder, Rajesh Sharma, experienced firsthand the challenges of daily commuting in urban India – from traffic congestion to air pollution and rising fuel costs. He envisioned a future where electric vehicles would transform not just how people move, but also improve environmental quality and reduce dependency on fossil fuels.
            </p>
            <p className="text-gray-600 text-lg">
              After two years of research and development, we unveiled our first prototype at a national mobility exhibition in 2018. The positive response from consumers and industry experts alike confirmed our belief that India was ready for an EV revolution.
            </p>
          </div>
          <div className="relative">
            <div className="rounded-3xl shadow-2xl overflow-hidden border border-white/70 backdrop-blur-md bg-white/40">
              <img
                src="https://images.unsplash.com/photo-1621360241143-5cc408eeb9b7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Rijiya EV Factory"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-indigo-400/30 rounded-full -z-10 blur-3xl"></div>
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-green-400/20 rounded-full -z-10 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-r from-indigo-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Our Mission & Vision</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We're driven by a clear purpose to create a sustainable future through innovation in electric mobility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <GlassCard>
              <div className="bg-gradient-to-tr from-indigo-400 to-sky-400 p-4 rounded-full inline-block mb-6 shadow-lg">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600 text-lg">
                To accelerate India's transition to sustainable mobility by developing affordable, reliable and high-performance electric vehicles that meet the diverse needs of Indian consumers while reducing environmental impact.
              </p>
            </GlassCard>
            <GlassCard>
              <div className="bg-gradient-to-tr from-green-400 to-indigo-400 p-4 rounded-full inline-block mb-6 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 text-lg">
                To become India's leading electric vehicle manufacturer, recognized for innovation, quality, and customer-centric solutions. We envision an India where electric mobility is accessible to all, contributing to cleaner air and reduced dependency on fossil fuels.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Revolutionizing Transportation in India
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              At Rijiya Pvt. Ltd., we're on a mission to transform the way India moves. Our commitment to sustainable mobility drives our innovation in electric vehicle technology, bringing affordable and clean transportation solutions to everyone.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <span className="bg-gradient-to-tr from-indigo-400 to-green-400 text-white p-2 rounded-full mr-3 mt-1 shadow-md">
                    <Check className="h-4 w-4" />
                  </span>
                  <p className="text-gray-800 text-base">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-10 aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/70 backdrop-blur-lg bg-white/40">
              <img
                src="https://images.unsplash.com/photo-1626000115135-c1de1556ed42?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Rijiya EV Factory"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-52 h-52 bg-indigo-400/30 rounded-full -z-10 blur-3xl"></div>
            <div className="absolute bottom-10 -left-10 w-44 h-44 bg-green-400/20 rounded-full -z-10 blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-r from-white via-indigo-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Our Core Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              These principles guide everything we do at Rijiya EV.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <ValueCard
              icon={<Star className="h-8 w-8 text-indigo-500" />}
              title="Innovation"
              description="We continuously seek new ideas and solutions to push the boundaries of electric vehicle technology and design."
            />
            <ValueCard
              icon={<Award className="h-8 w-8 text-sky-500" />}
              title="Quality"
              description="We commit to excellence in every aspect of our vehicles, from materials selection to manufacturing processes."
            />
            <ValueCard
              icon={<Users className="h-8 w-8 text-green-500" />}
              title="Customer-Centric"
              description="We put our customers at the heart of our decision-making, designing products that truly meet their needs."
            />
            <ValueCard
              icon={<TrendingUp className="h-8 w-8 text-indigo-500" />}
              title="Sustainability"
              description="We are dedicated to reducing environmental impact through our products and operations."
            />
            <ValueCard
              icon={<Zap className="h-8 w-8 text-sky-500" />}
              title="Accessibility"
              description="We believe electric mobility should be accessible to all, regardless of economic background."
            />
            <ValueCard
              icon={<Layers className="h-8 w-8 text-green-500" />}
              title="Integrity"
              description="We operate with transparency, honesty and ethical conduct in all our relationships and transactions."
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Our Leadership Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Meet the experienced professionals driving Rijiy's innovation and growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <TeamMember
              name="Rajesh Sharma"
              position="Founder & CEO"
              bio="With over 20 years of experience in automotive engineering, Rajesh founded Rijiya EV with a vision to revolutionize mobility in India."
              imageUrl="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
            />
            <TeamMember
              name="Priya Mehta"
              position="Chief Technology Officer"
              bio="A former lead engineer at a major global EV manufacturer, Priya brings cutting-edge technical expertise to our product development."
              imageUrl="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Glassmorphism Card
const GlassCard = ({ children }) => (
  <div className="rounded-3xl shadow-xl border border-white/40 bg-white/60 backdrop-blur-md p-10 hover:shadow-2xl transition-all duration-300">
    {children}
  </div>
);

const ValueCard = ({ icon, title, description }) => (
  <div className="rounded-3xl shadow-xl border border-white/60 bg-white/70 backdrop-blur-md p-8 hover:shadow-2xl transition-all duration-300">
    <div className="mb-6">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600 text-base">{description}</p>
  </div>
);

const TeamMember = ({ name, position, bio, imageUrl }) => (
  <div className="rounded-3xl shadow-xl border border-white/60 bg-white/70 backdrop-blur-md overflow-hidden group hover:shadow-2xl transition-all duration-300">
    <div className="h-64 overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-1 text-gray-900">{name}</h3>
      <p className="text-sky-500 font-medium mb-3">{position}</p>
      <p className="text-gray-600">{bio}</p>
    </div>
  </div>
);

export default About;
