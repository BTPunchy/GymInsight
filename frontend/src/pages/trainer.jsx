import React from "react";

const trainers = [
  {
    name: "SHIME JODAI",
    height: "150 cm",
    weight: "50 kg",
    specialty: "Pilates Trainer",
    image: "/images/shime-jodai.jpg", // เปลี่ยนเป็น path ที่ถูกต้อง
  },
  {
    name: "GING GONG",
    height: "145 cm",
    weight: "40 kg",
    specialty: "Yoga Trainer",
    image: "/images/ging-gong.jpg",
  },
  {
    name: "JOHNY BRAVO",
    height: "183 cm",
    weight: "120 kg",
    specialty: "Weight Training",
    image: "/images/johny-bravo.jpg",
  },
];

const TrainerSelection = () => {
  return (
    <section className="min-h-screen bg-blue-900 text-white py-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        CHOOSE YOUR TRAINER
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {trainers.map((trainer, index) => (
          <div
            key={index}
            className="bg-pink-300 text-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center"
          >
            <img
              src={trainer.image}
              alt={trainer.name}
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white"
            />
            <h3 className="text-xl font-bold mb-2">{trainer.name}</h3>
            <p className="text-sm mb-1">Height: {trainer.height}</p>
            <p className="text-sm mb-1">Weight: {trainer.weight}</p>
            <p className="text-sm mb-4">{trainer.specialty}</p>
            <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition">
              BOOKING
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrainerSelection;
