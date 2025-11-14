import { Link } from "react-router-dom";
import "./ReserveRoom.css";

// path ถูกต้องจาก pages -> assets
import yogaImg from "../assets/yogaR.jpg";
import pilatesImg from "../assets/pilateR.jpg";
import danceImg from "../assets/danceR.jpg";

const RoomCard = ({ title, image, to }) => (
  <Link to={to} className="room-card">
    <img className="room-image" src={image} alt={title} />
    <div className="room-title">{title}</div>
  </Link>
);

export default function ReserveRoom() {
  return (
    <div className="reserve">
      <header className="reserve-header">
        <Link className="back" to="/">
          ←
        </Link>
        <h1>Room Reservation</h1>
      </header>

      <div className="room-grid">
        <RoomCard title="Yoga Room" image={yogaImg} to="/reserve/yoga" />
        <RoomCard
          title="Pilates Room"
          image={pilatesImg}
          to="/reserve/pilates"
        />
        <RoomCard
          title="Dance Fitness Room"
          image={danceImg}
          to="/reserve/dance"
        />
      </div>
    </div>
  );
}
