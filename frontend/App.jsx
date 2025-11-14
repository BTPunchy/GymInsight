import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ReserveRoom from "./pages/ReserveRoom";
import Booking from "./pages/Booking";
import Trainers from "./pages/Trainers";
import Payment from "./pages/Payment";
import UserManagement from "./pages/UserManagement";
import YogaRoom from "./pages/YogaRoom";
import PilatesRoom from "./pages/PilatesRoom";
import DanceRoom from "./pages/DanceRoom";

function App() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reserve" element={<ReserveRoom />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/reserve/yoga" element={<YogaRoom />} />
          <Route path="/reserve/pilates" element={<PilatesRoom />} />
          <Route path="/reserve/dance" element={<DanceRoom />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
