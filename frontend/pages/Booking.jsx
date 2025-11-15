import axios from "axios";
import { useEffect, useState } from "react";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userName = localStorage.getItem("userName");

    async function fetchUserData() {
      try {
        // 🔹 Get user ID
        const res = await axios.get(`http://localhost:1234/users/${userName}`);
        const id = res.data.id;
        setUserId(id);

        // 🔹 Get bookings for this user
        const bookingsRes = await axios.get(
          `http://localhost:1234/rooms/bookings/user/${id}`
        );
        const rawBookings = bookingsRes.data.data;

        // 🔹 Fetch room details for each booking
        const roomMap = {};
        for (const booking of rawBookings) {
          const rid = booking.rid;
          if (!roomMap[rid]) {
            const roomRes = await axios.get(
              `http://localhost:1234/rooms/user/${rid}`
            );
            const roomData = roomRes.data.data;

            const room = Array.isArray(roomData) ? roomData[0] : roomData;

            roomMap[rid] = {
              type: room.room_type,
              name: room.description,
            };
          }
        }

        // 🔹 Merge room info into bookings
        const bookingsWithRoomInfo = rawBookings.map((booking) => ({
          ...booking,
          roomType: mapRoomType(roomMap[booking.rid]?.type),
          roomName: roomMap[booking.rid]?.name || `Room ${booking.rid}`,
        }));

        setBookings(bookingsWithRoomInfo);
      } catch (err) {
        console.error("Error fetching user or bookings:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function cancelBooking(bookingId, rid) {
    axios
      .delete(`http://localhost:1234/rooms/bookings/${bookingId}`)
      .then(() => {
        // อัปเดตสถานะห้องเป็น available
        return axios.put(`http://localhost:1234/rooms/${rid}/status`, {
          status: "available",
        });
      })
      .then(() => {
        const updatedBookings = bookings.filter(
          (b) => b.booking_id !== bookingId
        );
        setBookings(updatedBookings);
      })
      .catch((err) => {
        console.error("Error cancelling booking or updating room status:", err);
      });
  }

  function mapRoomType(type) {
    const map = {
      yoga: "Yoga",
      pilates: "Pilates",
      dance: "Dance",
    };
    return map[type] || "Unknown";
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Booking</h1>
        <p>Track and manage all your room reservations in one place.</p>
      </div>

      <div className="pill-tabs">
        <button type="button" className="pill active">
          All
        </button>
        <button type="button" className="pill">
          Upcoming
        </button>
        <button type="button" className="pill">
          Completed
        </button>
        <button type="button" className="pill">
          Cancelled
        </button>
      </div>

      <div className="card surface">
        {loading ? (
          <p>Loading bookings...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Room Name</th>
                <th>Room Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.booking_id}>
                  <td>{b.booking_id}</td>
                  <td>{b.roomName}</td>
                  <td>{b.roomType}</td>
                  <td>{formatDate(b.date)}</td>
                  <td>{b.time_slot}</td>
                  <td>
                    <span className={`badge badge-${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="table-actions">
                    <button
                      type="button"
                      className="btn-xs ghost btn-red"
                      onClick={() => cancelBooking(b.booking_id, b.rid)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
