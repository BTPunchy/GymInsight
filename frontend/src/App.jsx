import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import SignUp from "./pages/signup.jsx";
import Signin from "./pages/signin.jsx";
import Services from "./pages/services.jsx";
import RoomReservation from "./pages/roomReservation.jsx";
import TrainerSelection from "./pages/trainer.jsx";
import { RoomInfo } from "./pages/roomInfo.jsx";
import { BookingRooms } from "./pages/bookingRooms.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/rooms" element={<RoomReservation />} />
        <Route path="/service" element={<Services />} />
        <Route path="/trainer" element={<TrainerSelection />} />
        <Route path="/rooms/:roomType" element={<RoomInfo />} />
        <Route path="/rooms/:roomType/booking" element={<BookingRooms />} />
      </Routes>
    </Router>
  );
}

export default App;
