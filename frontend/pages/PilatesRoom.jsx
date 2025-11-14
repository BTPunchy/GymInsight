import { Link } from "react-router-dom";
import pilatesImg from "../assets/pilateR.jpg";

export default function PilatesRoom() {
  return (
    <div className="room-detail">
      <header className="room-header">
        <Link className="back" to="/reserve">
          ← Back
        </Link>
        <h1>Pilates Room</h1>
      </header>

      <img src={pilatesImg} alt="Pilates Room" className="room-banner" />

      <div className="room-info">
        <p>
          A modern pilates studio with reformer machines and guided sessions.
        </p>
        <p>Available time slots: 09:00–11:00, 15:00–17:00</p>
        <button className="btn-primary">Reserve Now</button>
      </div>
    </div>
  );
}
