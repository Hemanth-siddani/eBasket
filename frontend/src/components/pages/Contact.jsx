import React from "react";
import { MdPhoneInTalk } from "react-icons/md";
import { IoMdMail } from "react-icons/io";

function Contact() {
  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 p-3 m-3">

        {/* Image Section */}
        <img
          src="./Images/contact_us.webp"
          alt="Contact"
          className="img-fluid w-50"
        />

        {/* Content Section */}
        <div className="text-center text-md-start">

          <h2 className="bg-dark fs-2 text-light p-2 text-center m-3">
            Contact
          </h2>

          <p className="m-3">
            The shopping contact page provides customers with a reliable channel
            for order support, inquiries, and service assistance through clear
            and accessible communication details.
          </p>

          <div className="d-flex flex-column gap-3 align-items-center align-items-md-start m-3">
            <span className="contact_mobile">
              <MdPhoneInTalk /> : <span>012-3456789</span>
            </span>

            <span className="contact_email">
              <IoMdMail /> : <span>eBasket@gmail.com</span>
            </span>
          </div>

        </div>
      </div>
    </>
  );
}

export default Contact;
