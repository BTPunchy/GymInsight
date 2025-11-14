import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function BookingRooms() {
  const { roomType } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1234/gyms/type/${roomType}`
        );
        setRooms(res.data.data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [roomType]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-bold text-[#B93382]">
        🔄 Loading room info...
      </div>
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-bold text-red-500">
        ❌ No rooms found for type: {roomType}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-[#B93382] mb-10 capitalize">
        {roomType} Rooms
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <div
            key={room.rid}
            className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
          >
            <img
              src={room.image || "/images/default-room.jpg"}
              alt={room.title || room.room_type}
              className="w-full h-64 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-[#B93382] mb-2 capitalize">
                {room.title || room.room_type} Room
              </h2>
              <p className="text-gray-700 text-base flex-grow">
                {room.description}
              </p>
              <button
                className="mt-6 bg-[#B93382] text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-pink-600 transition"
                onClick={() =>
                  alert(`Booking confirmed for ${room.title || room.room_type}`)
                }
              >
                Confirm Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
