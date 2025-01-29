import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBook = () => {
  // const [form, setForm] = useState({
  //   title: "",
  //   author: "",
  //   price: "",
  //   desc: "",
  //   language: "",
  //   file: null,
  // });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setForm({ ...form, [name]: value });
  // };

  // const handleFileChange = (e) => {
  //   setForm({ ...form, file: e.target.files[0] });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // for (const key in form) {
    //   formData.append(key, form[key]);
    // }


    try {
      await fetch("https://book-store-database.onrender.com/book/add-books", {
        method: "POST",
        body: formData
      })
      toast.success("Book added successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // setForm({
      //   title: "",
      //   author: "",
      //   price: "",
      //   desc: "",
      //   language: "",
      //   file: null,
      // });
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add book", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Book</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6" encType="multipart/form-data">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            // value={form.title}
            // onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            // value={form.author}
            // onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            // value={form.price}
            // onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="desc"
            // value={form.desc}
            // onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <input
            type="text"
            name="language"
            // value={form.language}
            // onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            File
          </label>
          <input
            type="file"
            name="file"
            // onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
