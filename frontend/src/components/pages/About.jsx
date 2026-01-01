import React from "react";

function About() {
  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 p-3 m-3">

        {/* Image Section */}
        <img
          src="./Images/about_us_picture.png"
          alt="About"
          className="img-fluid w-50"
        />

        {/* Content Section */}
        <div className="text-center text-md-start">

          <h2 className="bg-dark fs-2 text-light p-2 text-center m-3">
            About
          </h2>

          <p className="m-3">
            This shopping application is designed to provide users with a simple
            and smooth online shopping experience. It allows customers to browse
            products, view details, and place orders easily.
          </p>

          <p className="m-3">
            The app focuses on user-friendly design, fast performance, and
            reliable service to make online shopping convenient and secure.
          </p>

        </div>
      </div>
    </>
  );
}

export default About;
