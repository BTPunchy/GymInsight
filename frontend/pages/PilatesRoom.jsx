import { Link } from "react-router-dom";
import pilaImg from "../assets/pilateR.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

function TimeSlotCard({ timeSlot, status, onBook }) {
  const isOccupied = status === "occupied";

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <p className="text-lg font-medium text-white">{timeSlot}</p>
      <button
        disabled={isOccupied}
        onClick={() => onBook(timeSlot)}
        className={`mt-2 px-3 py-1 rounded ${
          isOccupied
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isOccupied ? "Occupied" : "Book"}
      </button>
    </div>
  );
}

export default function PilatesRoom() {
  const [roomData, setRoomData] = useState([]);

  // ดึงข้อมูลห้อง
  const fetchRoomData = () => {
    axios
      .get("http://localhost:1234/rooms/pilates")
      .then((res) => setRoomData(res.data.data))
      .catch((err) => console.error("Failed to fetch room data:", err));
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  // ฟังก์ชันจองห้อง
  const handleBooking = async (timeSlot, rid) => {
    const username = localStorage.getItem("userName");

    if (!username) {
      alert("Please sign in to book a room.");
      return;
    }

    try {
      const userRes = await axios.get(
        `http://localhost:1234/users/${username}`
      );
      const user_id = userRes.data.id;

      const bookingData = {
        user_id: user_id,
        rid: rid,
        trainer_id: null, // ปรับตามความเหมาะสม
        date: new Date().toISOString().split("T")[0],
        time_slot: timeSlot,
        status: "pending",
      };

      const bookingRes = await axios.post(
        "http://localhost:1234/rooms/bookings/",
        bookingData
      );

      // อัปเดตสถานะ slot เป็น occupied
      const updatedRoomData = roomData.map((room) =>
        room.time_slot === timeSlot && room.rid === rid
          ? { ...room, status: "occupied" }
          : room
      );
      setRoomData(updatedRoomData);

      alert("Booking confirmed!");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 md:flex-row md:items-start">
      {/* ซ้าย */}
      <div className="md:w-1/2 space-y-4">
        <img src={pilaImg} alt="Pilates Room" className="rounded-lg shadow-md" />
        <p className="text-white">
          A serene Pilates studio bathed in natural light, equipped with reformers and a tranquil atmosphere.
        </p>
      </div>

      {/* ขวา */}
      <div className="md:w-1/2 space-y-4">
        <h3 className="text-xl font-semibold">Available time slots:</h3>
        <div className="grid grid-cols-1 gap-4">
          {Array.isArray(roomData) &&
            roomData.map((room, index) => (
              <TimeSlotCard
                key={index}
                timeSlot={room.time_slot}
                status={room.status}
                onBook={() => handleBooking(room.time_slot, room.rid)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
