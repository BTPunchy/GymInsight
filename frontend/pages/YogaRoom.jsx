import { Link } from "react-router-dom";
import yogaImg from "../assets/yogaR.jpg";

export default function YogaRoom() {
  return (
    <div className="room-detail">
      <header className="room-header">
        <Link className="back" to="/reserve">
          ← Back
        </Link>
        <h1>Yoga Room</h1>
      </header>

      <img src={yogaImg} alt="Yoga Room" className="room-banner" />

      <div className="room-info">
        <p>
          A peaceful yoga space with natural light, mats, and calming ambiance.
        </p>
        <p>Available time slots: 08:00–10:00, 14:00–16:00, 18:00–20:00</p>
        <button className="btn-primary">Reserve Now</button>
      </div>
    </div>
  );
}
