import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const storedName = localStorage.getItem("userName");
      if (!storedName) return;

      try {
        const res = await axios.get(
          `http://localhost:1234/users/${storedName}`
        );
        if (res.data && res.data.fName && res.data.lName) {
          const name = res.data.fName + " " + res.data.lName;
          setName(name);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setName("");
    window.location.href = "/";
  };

  return (
    <header className="h-24 w-full bg-[#B93382] shadow-lg">
      <nav className="flex items-center justify-between px-10 h-full">
        {/* LEFT: Navigation */}
        <div className="flex items-center gap-10">
          <a
            href="/"
            className="text-white text-xl font-bold hover:underline transition duration-150"
          >
            Home
          </a>
          <a
            href="/service"
            className="text-white text-xl font-bold hover:underline transition duration-150"
          >
            Service
          </a>
          {name && (
            <a
              href="/mybooking"
              className="text-white text-xl font-bold hover:underline transition duration-150"
            >
              My Booking
            </a>
          )}
        </div>

        {/* RIGHT: Auth or Welcome */}
        <div className="flex items-center gap-4">
          {name ? (
            <>
              <span className="text-white text-xl font-bold">
                Welcome, {name} 👋
              </span>
              <button
                className="bg-white text-[#B93382] px-6 py-2.5 rounded-full font-bold 
                       shadow-md hover:bg-pink-100 hover:shadow-lg 
                       transition-all duration-200 text-xl"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-white text-[#B93382] px-6 py-2.5 rounded-full font-bold 
                       shadow-md hover:bg-pink-100 hover:shadow-lg 
                       transition-all duration-200 text-xl"
                onClick={() => {
                  window.location.href = "/signin";
                }}
              >
                Sign In
              </button>
              <button
                className="bg-[#61FF7E] text-[#1F2937] px-6 py-2.5 rounded-full font-bold 
                       shadow-md hover:opacity-90 hover:shadow-lg 
                       transition-all duration-200 text-xl"
                onClick={() => {
                  window.location.href = "/signup";
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
