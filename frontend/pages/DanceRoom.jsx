import { Link } from "react-router-dom";
import danceImg from "../assets/danceR.jpg";

export default function DanceRoom() {
  return (
    <div className="room-detail">
      <header className="room-header">
        <Link className="back" to="/reserve">
          ← Back
        </Link>
        <h1>Dance Fitness Room</h1>
      </header>

      <img src={danceImg} alt="Dance Room" className="room-banner" />

      <div className="room-info">
        <p>
          Spacious dance room with mirrors, sound system, and vibrant energy.
        </p>
        <p>Available time slots: 10:00–12:00, 17:00–19:00</p>
        <button className="btn-primary">Reserve Now</button>
      </div>
    </div>
  );
}
