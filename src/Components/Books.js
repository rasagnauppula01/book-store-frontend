import React, { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    axios
      .get("https://book-store-database.onrender.com/book/get-book")
      .then((response) => {
        setBooks(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="px-4 md:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mt-8 text-center">
          Explore Our Collection
        </h1>
        <p className="text-gray-500 text-center mt-2 text-base">
          Handpicked books just for you!
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader border-t-4 border-b-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div
          className="mt-6"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={15}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 15 },
              1024: { slidesPerView: 2, spaceBetween: 20 },
              1280: { slidesPerView: 3, spaceBetween: 25 },
            }}
            className="mySwiper"
          >
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <motion.div
                  ref={ref}
                  className={`group relative p-4 border rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 transform ${
                    inView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  variants={cardVariant}
                  whileHover={{ scale: 1.05 }}
                >
                  <Link to={`/view-details/${book._id}`}>
                    <div className="flex justify-center">
                      <motion.img
                        alt={book.title}
                        src={book.file}
                        className="w-24 h-36 sm:w-32 sm:h-44 lg:w-40 lg:h-56 rounded-md bg-gray-100 object-cover"
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.3 },
                        }}
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {book.title.length > 20
                          ? `${book.title.slice(0, 17)}...`
                          : book.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        <b>Author:</b> {book.author}
                      </p>
                      <p className="text-sm font-medium text-gray-900 mt-2">
                        ₹{book.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      )}
    </div>
  );
};

export default Books;
