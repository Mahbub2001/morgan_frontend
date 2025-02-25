"use client";
import Button3 from "@/containers/common/Button3/Button3";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setStatus("Please fill out all fields.");
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_PUBLIC_KEY
      )
      .then(
        (response) => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setStatus("Error sending message, please try again.");
          console.error(error.text);
        }
      );
  };

  return (
    <section className="body-font relative -mt-20 lg:mt-24 xl:mt-20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{
          backgroundImage: "url('/nmf_watermark.png')",
          backgroundSize: "100%", 
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%", 
          height: "100%",
          zIndex: -1,
        }}
      ></div>

      <div className="container mx-auto px-5 py-24 relative">
        <div className="mb-12 flex w-full flex-col text-center text-xs text-gray-700">
          <h1 className="title-font mb-4 text-2xl font-medium sm:text-3xl tracking-widest">
            CONTACT
          </h1>
          <p className="mx-auto leading-relaxed lg:w-2/3 my-6">
            Please fill out the form below or email at info@gmail.com
          </p>
          <p>
            Studio Telephone:16546 565 566{" "}
            <span className="italic">Office Hours Only</span>{" "}
          </p>
        </div>

        <div className="mx-auto md:w-2/3 lg:w-1/2">
          <div className="-m-2 flex flex-wrap">
            <div className="w-1/2 p-2">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="peer w-full rounded border border-gray-700 bg-opacity-40 py-1 px-3 text-base leading-8 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-none focus:ring-2 focus:ring-indigo-900"
                  placeholder="Name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-gray-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-gray-500"
                >
                  Name
                </label>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full rounded border border-gray-700 bg-opacity-40 py-1 px-3 text-base leading-8 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-none focus:ring-2 focus:ring-indigo-900"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-gray-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-gray-500"
                >
                  E-mail
                </label>
              </div>
            </div>
            <div className="mt-4 w-full p-2">
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="peer h-32 w-full resize-none rounded border border-gray-700 bg-opacity-40 py-1 px-3 text-base leading-6 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-none focus:ring-2 focus:ring-indigo-900"
                  placeholder="Message"
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-gray-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-gray-500"
                >
                  Message
                </label>
              </div>
            </div>
            <div onClick={handleSubmit} className="w-full p-2">
              <Button3
                text="SEND MESSAGE"
                backgroundColor="orange"
                borderColor="orange"
                textColor="white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
