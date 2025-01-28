import React from "react";
import "../App.css"; // Include the CSS styles here

const authors = [
  "J.K. Rowling",
  "George Orwell",
  "Jane Austen",
  "Mark Twain",
  "Agatha Christie",
  "J.R.R. Tolkien",
  "Ernest Hemingway",
  "Charles Dickens",
  "William Shakespeare",
  "F. Scott Fitzgerald",
  "Stephen King",
  "Leo Tolstoy",
  "Victor Hugo",
  "Harper Lee",
  "Gabriel García Márquez",
  "Toni Morrison",
  "Emily Dickinson",
  "Homer",
  "Franz Kafka",
  "Virginia Woolf",
  "James Joyce",
  "Oscar Wilde",
  "H.G. Wells",
  "Arthur Conan Doyle",
  "C.S. Lewis",
  "Margaret Atwood",
  "Sylvia Plath",
  "John Steinbeck",
  "Albert Camus",
  "Dante Alighieri",
  "Voltaire",
  "Sun Tzu",
  "Ralph Waldo Emerson",
  "Hermann Hesse",
  "Khaled Hosseini",
  "Isabel Allende",
  "Dan Brown",
  "Paulo Coelho",
  "Maya Angelou",
  "Kurt Vonnegut",
  "Edgar Allan Poe",
  "Louisa May Alcott",
  "Dr. Seuss",
];

const ScrollingAuthors = () => {
  return (
    <div className="relative overflow-hidden bg-gray-100 py-4">
      <div className="text-center text-xl font-medium text-gray-700">
        {/* Apply the scroll animation */}
        <div className="inline-block whitespace-nowrap animate-scroll">
          {authors.map((author, index) => (
            <span
              key={index}
              className="mx-8 inline-block px-4 py-2 bg-blue-100 rounded-full text-blue-700"
            >
              {author}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingAuthors;
