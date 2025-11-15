const RoomCard = ({ title, image, to }) => (
  <Link to={to} className="room-card">
    <img className="room-image" src={image} alt={title} />
    <div className="room-title">{title}</div>
  </Link>
);
export default RoomCard;