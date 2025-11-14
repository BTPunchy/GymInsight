import { Link } from 'react-router-dom'

const RoomCard = ({ title, image }) => (
  <div className="room-card">
    <img src={image} alt={title} />
    <div className="room-title">{title}</div>
  </div>
)

export default function ReserveRoom() {
  return (
    <div className="reserve">
      <header className="reserve-header">
        <Link className="back" to="/">←</Link>
        <h1>Room Reservation</h1>
      </header>
      <div className="room-grid">
        <RoomCard title="Yoga Room" image="https://images.unsplash.com/photo-1604346184161-46b4e1b35713?q=80&w=1200&auto=format&fit=crop" />
        <RoomCard title="Pilates Room" image="https://images.unsplash.com/photo-1593810450967-f9c42742e840?q=80&w=1200&auto=format&fit=crop" />
        <RoomCard title="Dance Fitness Room" image="https://images.unsplash.com/photo-1531857415435-5f2a39ec7748?q=80&w=1200&auto=format&fit=crop" />
      </div>
    </div>
  )
}
