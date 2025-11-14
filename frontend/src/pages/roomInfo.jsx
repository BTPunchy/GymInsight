import { useParams } from "react-router-dom";

export function RoomInfo() {
  const { roomType } = useParams();

  const roomData = {
    yoga: {
      title: "Yoga Room",
      description:
        "A calming space with soft lighting, yoga mats, cushions, and plants. Perfect for mindfulness and flexibility training.",
      image: "/images/yoga-room.jpg",
    },
    pilates: {
      title: "Pilates Room",
      description:
        "Modern pilates reformer machines, clean design, and supportive atmosphere for core strength and posture.",
      image: "/images/pilates-room.jpg",
    },
    dance: {
      title: "Dance Fitness Room",
      description:
        "Spacious wooden floor, vibrant lighting, mirrors, and sound system for high-energy dance workouts.",
      image: "/images/dance-room.jpg",
    },
  };

  const room = roomData[roomType];

  if (!room) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#04073E] text-white text-2xl font-bold">
        ❌ Room type not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04073E] flex items-center justify-center px-6 py-10">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img
            src={room.image}
            alt={room.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="md:w-1/2 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#B93382] mb-4">
              {room.title}
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              {room.description}
            </p>
          </div>

          <button
            className="mt-8 self-start bg-[#B93382] text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-pink-600 transition"
            onClick={() => {
              window.location.href = `/rooms/${roomType}/booking`;
            }}
          >
            Booking
          </button>
        </div>
      </div>
    </div>
  );
}
