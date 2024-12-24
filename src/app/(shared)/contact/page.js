import React from "react";

function Contact() {
  return (
    <section className="body-font relative ">
      <div className="container mx-auto px-5 py-24">
        <div className="mb-12 flex w-full flex-col text-center text-xs text-gray-700">
          <h1 className="title-font mb-4 text-2xl font-medium  sm:text-3xl tracking-widest">
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
                  className="peer w-full rounded border border-gray-700  bg-opacity-40 py-1 px-3 text-base leading-8 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-none focus:ring-2 focus:ring-indigo-900"
                  placeholder="Name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-gray-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500"
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
                  className="peer w-full rounded border border-gray-700  bg-opacity-40 py-1 px-3 text-base leading-8 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-none focus:ring-2 focus:ring-indigo-900"
                  placeholder="Email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-gray-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-gray-400"
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
                  className="peer h-32 w-full resize-none rounded border border-gray-700  bg-opacity-40 py-1 px-3 text-base leading-6 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-none focus:ring-2 focus:ring-indigo-900"
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
            <div className="w-full p-2">
              <button className=" tracking-wider mx-auto flex rounded border-0 bg-orange-400 py-2 px-8 text-lg text-white hover:bg-orange-500 focus:outline-none items-center justify-center w-full">
                SEND MESSAGE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
