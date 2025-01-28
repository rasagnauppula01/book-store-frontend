import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  // Animation Variants
  const containerVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, duration: 1 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Lazy Load Trigger
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger only once
    threshold: 0.1, // Fire when 10% of the component is visible
  });

  return (
    <div className="py-16 bg-gray-50">
      {/* Header Section */}
      <motion.div
        className="max-w-7xl mx-auto px-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          About Our Bookstore
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Welcome to our online bookstore! We are passionate about providing a
          wide selection of books for readers of all ages and interests. Whether
          you're looking for the latest bestsellers, classic literature, or
          hidden gems, we have something for everyone. Our mission is to promote
          the joy of reading and help you discover your next great book.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="mt-12 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        variants={containerVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        ref={ref}
      >
        {/* Mission */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          variants={itemVariant}
        >
          <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
          <p className="mt-4 text-gray-600">
            Our mission is to provide a diverse collection of books to readers
            worldwide. We aim to create a platform where book lovers can easily
            find, purchase, and enjoy their favorite titles.
          </p>
        </motion.div>
        {/* Values */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          variants={itemVariant}
        >
          <h3 className="text-2xl font-bold text-gray-800">Our Values</h3>
          <p className="mt-4 text-gray-600">
            We believe in the power of books to inspire, educate, and entertain.
            We are committed to offering books that enrich the minds and hearts
            of readers, all while providing exceptional service and support.
          </p>
        </motion.div>
        {/* Why Choose Us */}
        <motion.div
          className="bg-white shadow-lg rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          variants={itemVariant}
        >
          <h3 className="text-2xl font-bold text-gray-800">Why Choose Us?</h3>
          <p className="mt-4 text-gray-600">
            With a curated selection of titles, user-friendly shopping
            experience, and competitive prices, we strive to make your book
            shopping experience both easy and enjoyable. We are here to help you
            find your next great read.
          </p>
        </motion.div>
      </motion.div>

      {/* Optional Community Section */}
      <motion.div
        className="mt-16 text-center px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-2xl font-bold text-gray-800">Join Our Community</h3>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with fellow book lovers, share reviews, and stay updated with
          the latest book releases. Follow us on our social media platforms to
          join a vibrant community of readers.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
