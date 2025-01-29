import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Import for lazy loading
import { Link } from "react-router-dom"; // Import Link for navigation

const Hero = () => {
  // Animation Variants
  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariant = {
    hover: {
      scale: 1.1,
      backgroundColor: "#1d4ed8",
      color: "#fff",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 }); // Lazy load the image

  return (
    <div className="h-screen flex flex-col lg:flex-row items-center justify-between rounded-2xl px-8 lg:px-20 bg-gradient-to-b from-blue-50 to-white">
      {/* Left Section */}
      <motion.div
        className="w-full lg:w-1/2 text-center lg:text-left space-y-6 text-gray-800"
        initial="hidden"
        animate="visible"
        variants={textVariant}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-blue-800 drop-shadow-md"
          variants={textVariant}
        >
          Discover Your Next Great Read
        </motion.h1>
        <motion.p
          className="text-sm sm:text-base md:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 font-medium tracking-wide text-gray-600"
          variants={textVariant}
        >
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books. Let us guide you on a
          journey through literary worlds that expand your mind and spark your
          imagination.
        </motion.p>
        {/* Link to All Books Page */}
        <motion.div
          className="text-lg md:text-xl font-semibold border-2 px-8 py-3 w-fit mt-6 lg:mt-8 rounded-full cursor-pointer transition-transform bg-white text-blue-600 shadow-xl"
          variants={buttonVariant}
          whileHover="hover"
          whileTap="tap"
        >
          <Link to="/all-book">Discover Books</Link>
        </motion.div>
      </motion.div>

      {/* Right Section - Image with Lazy Loading */}
      <motion.div
        className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center"
        initial="hidden"
        animate="visible"
        variants={imageVariant}
      >
        <motion.img
          ref={ref} // Assign the ref to the image for lazy loading
          src={
            inView
              ? "https://zolostays.com/blog/wp-content/uploads/2024/02/books-stores.jpg"
              : ""
          }
          alt="Books"
          className="w-[100%] sm:w-[90%] md:w-[80%] lg:w-[650px] h-auto rounded-xl shadow-2xl object-cover"
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;
