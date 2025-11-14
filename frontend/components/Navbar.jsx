import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const username = localStorage.getItem("userName");

  useEffect(() => {
    if (!username) return;

    axios
      .get(`http://localhost:1234/users/${username}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserData(null);
    navigate("/signin");
  };

  const isActive = (path) => (pathname === path ? "link active" : "link");

  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">FitQuery</div>

        <nav className="nav-links">
          <Link className={isActive("/")} to="/">
            Home
          </Link>
          <a className="link" href="#service">
            Service
          </a>
          <Link className={isActive("/booking")} to="/booking">
            Booking
          </Link>
          {/* <Link
            className={
              pathname.startsWith("/trainers") ? "link active" : "link"
            }
            to="/trainers"
          >
            Trainer
          </Link> */}

          {userData ? (
            <>
              <Link className="link" to="/users">
                👤 {userData.fName + " " + userData.lName}
              </Link>

              <button
                onClick={handleLogout}
                className="btn outline ml-2"
                style={{ marginLeft: "1rem" }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className={
                  pathname === "/signin" ? "btn outline active" : "btn outline"
                }
                to="/signin"
              >
                Sign In
              </Link>
              <Link className="btn solid" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
