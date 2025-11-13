import React from "react";
import { Link } from "react-router-dom"; // ถ้าใช้ React Router
import Header from "../components/header";

const services = [
  {
    title: "SPORT ROOM",
    image: "/images/sport-room.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    link: "/rooms",
  },
  {
    title: "PRIVATE TRAINER",
    image: "/images/private-trainer.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    link: "/trainer",
  },
];

const Services = () => {
  return (
    <>
      <Header />
      <section className="w-full min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 py-16 px-6 text-white">
        <h2 className="text-4xl font-bold text-center mb-14 tracking-wide">
          OUR SERVICES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
              className="block bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-blue-900">
                  {service.title}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
