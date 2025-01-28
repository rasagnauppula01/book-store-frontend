import React, { useState, useEffect } from "react";
import Hero from "../Components/Hero";
import Books from "../Components/Books";
import ScrollingAuthors from "../Components/ScrollingAuthors";
import About from "../Components/About";
import FamousAuthorsCarousel from "../Components/FamousAuthorsCarousel.js";
import Services from "../Components/Services";
import FAQs from "../Components/FAQs.js";
import Loader from "../Components/Loader.js";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the timeout duration as needed (e.g., 2000ms = 2 seconds)

    return () => clearTimeout(timer); // Cleanup timeout to avoid memory leaks
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Replace this div with your loader component */}

        <Loader />
      </div>
    );
  }

  return (
    <div className="px-10 py-8">
      <Hero />
      <hr />
      <ScrollingAuthors />
      <hr className="my-8 border-gray-300" />
      {/* <FamousAuthorsCarousel /> */}
      <Books />
      <hr className="my-8 border-gray-300" />
      <About />
      <Services />
      <FAQs />
    </div>
  );
};

export default Home;
