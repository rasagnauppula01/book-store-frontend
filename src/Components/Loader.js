import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <div
      className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-white z-50"
      style={{ overflow: "hidden" }}
    >
      <HashLoader color="#0000FF" size={100} />
    </div>
  );
};

export default Loader;
