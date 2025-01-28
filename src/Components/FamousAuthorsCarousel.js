import React, { useState } from "react";

const FamousAuthorsCarousel = () => {
  const authors = [
    {
      name: "J.K. Rowling",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/330px-J._K._Rowling_2010.jpg",
    },
    {
      name: "George Orwell",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/George_Orwell_press_photo.jpg/330px-George_Orwell_press_photo.jpg",
    },
    {
      name: "Agatha Christie",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Agatha_Christie.png/330px-Agatha_Christie.png",
    },
    {
      name: "Jane Austen",
      image: "https://via.placeholder.com/150?text=Jane+Austen",
    },
    {
      name: "Mark Twain",
      image: "https://via.placeholder.com/150?text=Mark+Twain",
    },
  ];

  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? authors.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === authors.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-gray-50 p-6">
      <h2 className="text-center text-2xl font-bold mb-4">Famous Authors</h2>
      <div className="relative flex items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-2 bg-gray-800 text-white px-4 py-2 rounded-full"
        >
          {"<"}
        </button>
        <div className="w-64 h-80 flex items-center justify-center">
          <img
            src={authors[current].image}
            alt={authors[current].name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <button
          onClick={handleNext}
          className="absolute right-2 bg-gray-800 text-white px-4 py-2 rounded-full"
        >
          {">"}
        </button>
      </div>
      <p className="text-center mt-4 text-lg font-semibold">
        {authors[current].name}
      </p>
    </div>
  );
};

export default FamousAuthorsCarousel;
