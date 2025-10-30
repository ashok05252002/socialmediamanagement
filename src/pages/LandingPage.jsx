import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { CheckCircle, Zap, Users, BarChart3, Calendar, ShieldCheck, MessageSquare, ArrowRight, Star, ChevronDown, ChevronUp } from 'lucide-react';

const NavLinkItem = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-600 dark:text-gray-300 hover:text-theme-primary dark:hover:text-theme-primary transition-colors"
  >
    {children}
  </a>
);

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center justify-center w-12 h-12 bg-theme-primary/10 dark:bg-theme-primary/20 rounded-full mb-4 text-theme-primary">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
  </motion.div>
);

const StepCard = ({ number, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="text-center p-6"
  >
    <div className="relative mb-4">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-theme-primary/10 dark:bg-theme-primary/20 rounded-full animate-ping-slow"></div>
      </div>
      <div className="relative w-20 h-20 mx-auto bg-theme-primary text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
        {number}
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
  </motion.div>
);

const PricingCard = ({ plan, price, features, ctaText, popular, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className={`bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 ${popular ? 'border-theme-primary' : 'border-transparent dark:border-gray-700'} relative`}
  >
    {popular && (
      <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-theme-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
        Most Popular
      </div>
    )}
    <h3 className="text-2xl font-semibold mb-2">{plan}</h3>
    <p className="text-4xl font-bold mb-1 text-theme-primary">${price}<span className="text-base font-normal text-gray-500 dark:text-gray-400">/mo</span></p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Billed annually or ${parseInt(price) + 10}/mo monthly.</p>
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center text-gray-600 dark:text-gray-400">
          <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <Link to="/login">
      <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${popular ? 'bg-theme-primary text-white hover:bg-opacity-90' : 'bg-theme-primary/10 text-theme-primary hover:bg-theme-primary/20 dark:bg-theme-primary/20 dark:hover:bg-theme-primary/30'}`}>
        {ctaText}
      </button>
    </Link>
  </motion.div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <motion.div 
      layout 
      className="border-b border-gray-200 dark:border-gray-700 py-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-medium"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-theme-primary" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0, marginTop: isOpen ? '1rem': '0rem' }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const LandingPage = () => {
  const { isDarkMode, themeColors } = useTheme();
  const navigate = useNavigate();

  const features = [
    { icon: <Zap className="w-6 h-6" />, title: "Unified Dashboard", description: "Manage all your social media accounts from a single, intuitive dashboard." },
    { icon: <Calendar className="w-6 h-6" />, title: "Smart Scheduling", description: "Plan and schedule your posts in advance with our intelligent content calendar." },
    { icon: <BarChart3 className="w-6 h-6" />, title: "In-Depth Analytics", description: "Track your performance, understand your audience, and gain actionable insights." },
    { icon: <Users className="w-6 h-6" />, title: "Team Collaboration", description: "Work seamlessly with your team, assign roles, and approve content effortlessly." },
    { icon: <MessageSquare className="w-6 h-6" />, title: "Engagement Tools", description: "Monitor mentions, respond to comments, and engage with your audience effectively." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "Secure & Reliable", description: "Your data is safe with us. We prioritize security and platform reliability." }
  ];

  const pricingPlans = [
    { plan: "Starter", price: "29", features: ["3 Social Accounts", "Basic Scheduling", "Core Analytics", "Email Support"], ctaText: "Choose Starter" },
    { plan: "Pro", price: "79", features: ["10 Social Accounts", "Advanced Scheduling", "Full Analytics Suite", "Priority Support", "Team Collaboration (3 users)"], ctaText: "Choose Pro", popular: true },
    { plan: "Business", price: "149", features: ["Unlimited Accounts", "AI-Powered Scheduling", "Custom Reporting", "Dedicated Account Manager", "Team Collaboration (10 users)"], ctaText: "Choose Business" }
  ];

  const faqs = [
    { question: "What social media platforms do you support?", answer: "We support all major platforms including Facebook, Instagram, Twitter, LinkedIn, YouTube, Pinterest, and TikTok. We are constantly adding support for new platforms." },
    { question: "Is there a free trial available?", answer: "Yes, we offer a 14-day free trial for our Pro plan. No credit card required to get started!" },
    { question: "Can I cancel my subscription at any time?", answer: "Absolutely. You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period." },
    { question: "How does the AI-Powered Scheduling work?", answer: "Our AI analyzes your audience engagement patterns and suggests optimal posting times for maximum reach and impact across different platforms." }
  ];

  const sectionTitle = (title, subtitle) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-primary-dark text-primary-light' : 'bg-gray-50 text-primary-dark'} font-poppins overflow-x-hidden`}>
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-primary-dark/80 backdrop-blur-md shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/landing" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-theme-primary">Demo Name</h1>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <NavLinkItem href="#features">Features</NavLinkItem>
              <NavLinkItem href="#how-it-works">How It Works</NavLinkItem>
              <NavLinkItem href="#pricing">Pricing</NavLinkItem>
              <NavLinkItem href="#faq">FAQ</NavLinkItem>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <button className="px-4 py-2 text-sm font-medium text-theme-primary hover:text-theme-primary/80 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Login
                </button>
              </Link>
              <Link to="/login">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 text-sm font-medium text-white bg-theme-primary rounded-lg shadow-md hover:bg-opacity-90 transition-colors"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-theme-primary/5 dark:from-theme-primary/10 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
          >
            Supercharge Your <span className="text-theme-primary">Social Media</span> Presence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Effortlessly manage, schedule, analyze, and grow all your social media accounts from one powerful platform. Save time and achieve better results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-semibold text-white bg-theme-primary rounded-lg shadow-lg hover:bg-opacity-90 transition-colors"
              >
                Get Started For Free
              </motion.button>
            </Link>
            <a href="#features" className="px-8 py-4 text-lg font-semibold text-theme-primary dark:text-gray-300 hover:underline">
              Learn More <ArrowRight className="inline w-5 h-5 ml-1" />
            </a>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16"
          >
            <img 
              src="https://img-wrapper.vercel.app/image?url=https://placehold.co/1000x500/F97316/FFF?text=Product+Showcase" 
              alt="Product Showcase" 
              className="rounded-xl shadow-2xl mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {sectionTitle("Everything You Need, All in One Place", "Discover powerful features designed to streamline your social media workflow and boost your engagement.")}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-100 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {sectionTitle("Get Started in 3 Simple Steps", "Launch your social media strategy with Demo Name quickly and easily.")}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard number="1" title="Connect Accounts" description="Securely link all your social media profiles in minutes." delay={0.1} />
            <StepCard number="2" title="Create & Schedule" description="Craft compelling posts and schedule them with our intuitive tools." delay={0.2} />
            <StepCard number="3" title="Analyze & Grow" description="Track performance, gain insights, and optimize your strategy for growth." delay={0.3} />
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {sectionTitle("Flexible Plans for Every Need", "Choose a plan that fits your goals, whether you're just starting out or managing multiple brands.")}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-100 dark:bg-gray-800/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {sectionTitle("Frequently Asked Questions", "Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us.")}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Demo Name. All rights reserved.
          </p>
          <div className="mt-4 space-x-6">
            <NavLinkItem href="#">Privacy Policy</NavLinkItem>
            <NavLinkItem href="#">Terms of Service</NavLinkItem>
            <NavLinkItem href="#">Contact Us</NavLinkItem>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
