import React from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import {
  AiOutlinePhone,
  AiOutlineRedo,
  AiOutlineCheckCircle,
  AiOutlineCar,
} from "react-icons/ai";
import { useInView } from "react-intersection-observer"; // Import the hook

const ServiceCard = ({ service, index }) => {
  // Using the useInView hook here for each individual service card
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger only once when the element enters the viewport
    threshold: 0.5, // Trigger when 50% of the element is visible
  });

  return (
    <motion.div
      ref={ref} // Attach ref to the service card
      className={`flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.3 }}
    >
      <div className="text-blue-500 mb-4">{service.icon}</div>
      <motion.h3
        className="text-xl font-bold text-gray-800 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {service.title}
      </motion.h3>
      <motion.p
        className="text-gray-600 text-center mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        {service.description}
      </motion.p>
    </motion.div>
  );
};

const Services = () => {
  const services = [
    {
      icon: <AiOutlinePhone size={32} />,
      title: "24/7 Customer Service",
      description:
        "We're here to help you with any questions or concerns you have, 24/7. WhatsApp Only!",
    },
    {
      icon: <AiOutlineRedo size={32} />,
      title: "Return & Refund",
      description:
        "If you've received damaged books or wrong items, we will replace them immediately.",
    },
    {
      icon: <AiOutlineCheckCircle size={32} />,
      title: "Our Guarantee",
      description:
        "We stand behind our products and services and guarantee the best quality & satisfaction.",
    },
    {
      icon: <AiOutlineCar size={32} />,
      title: "Shipping All India",
      description:
        "We ship our products all over India, making them accessible to customers everywhere.",
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <motion.h2
          className="text-4xl font-extrabold text-center text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Our Services
        </motion.h2>
        <motion.p
          className="text-lg text-center text-gray-600 mt-2 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          We aim to provide the best service to ensure customer satisfaction at
          every step.
        </motion.p>

        {/* Services Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
