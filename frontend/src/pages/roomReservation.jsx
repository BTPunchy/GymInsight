import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header";

export default function RoomReservation() {
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) return;

    axios.get(`http://localhost:1234/users/${storedName}`).then((res) => {
      if (res.data?.fName && res.data?.lName) {
        setName(`${res.data.fName} ${res.data.lName}`);
      }
    });
  }, []);

  const rooms = [
    {
      title: "YOGA ROOM",
      image: "/images/yoga-room.jpg",
      slug: "yoga",
    },
    {
      title: "PILATES ROOM",
      image: "/images/pilates-room.jpg",
      slug: "pilates",
    },
    {
      title: "DANCE FITNESS ROOM",
      image: "/images/dance-room.jpg",
      slug: "dance",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-[#B93382] uppercase tracking-wide">
          Room Reservation
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pb-20">
        {rooms.map((room) => (
          <div key={room.title} className="text-center">
            <div
              className="cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              onClick={() => (window.location.href = `/rooms/${room.slug}`)}
            >
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-64 object-cover"
              />
            </div>
            <h2 className="mt-4 text-xl font-bold text-[#B93382]">
              {room.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
