import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/header.jsx";

function Home() {
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const quotes = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Discipline is the bridge between goals and accomplishment.",
    "Your body can stand almost anything. It’s your mind that you have to convince.",
    "Don’t count the days, make the days count.",
  ];

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (!storedName) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1234/users/${storedName}`
        );
        if (res.data && res.data.fName && res.data.lName) {
          const fullName = res.data.fName + " " + res.data.lName;
          setName(fullName);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();

    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  return (
    <>
      <Header />

  

      <section className="relative flex h-screen w-full items-center bg-[#04073E] px-[6vw] overflow-hidden max-md:flex-col max-md:justify-center max-md:px-6 max-md:py-10">
        <div className="z-10 basis-[50%] max-w-[560px] text-white text-left max-md:basis-auto max-md:max-w-full max-md:text-center">
          {name && (
            <h1 className="text-[48px] md:text-[56px] font-extrabold text-[#61FF7E] mb-6 leading-tight tracking-wide">
              Hello, {name} 👋
            </h1>
          )}

          <h2 className="font-bebas text-[36px] md:text-[44px] tracking-[0.12em] uppercase leading-[1.1] text-white">
            YOUR WELLNESS JOURNEY STARTS HERE.
          </h2>

          <h2 className="mt-2 font-bebas text-[36px] md:text-[44px] tracking-[0.12em] uppercase leading-[1.1] text-white">
            SIMPLE BOOKING POWERFUL RESULTS.
          </h2>

          {quote && (
            <h3 className="mt-6 text-[24px] md:text-[28px] font-bold text-[#FFD700] leading-snug">
              “{quote}”
            </h3>
          )}

          {/* แสดงปุ่มเฉพาะเมื่อยังไม่ได้ login */}
          {!name && (
            <div className="mt-8 flex items-center gap-4 flex-wrap max-md:justify-center">
              <button
                className="rounded-full border-2 border-[#19B94A] bg-[#19B94A] px-8 py-2.5 text-2xl font-semibold uppercase tracking-[0.08em] text-white transition-transform duration-150 hover:-translate-y-0.5 hover:opacity-95"
                onClick={() => {
                  window.location.href = "/rooms";
                }}
              >
                RESERVE ROOM
              </button>

              <span className="text-base uppercase text-white max-md:order-3">
                or
              </span>

              <button
                className="rounded-full border-2 border-[#FF0F7B] bg-transparent px-8 py-2.5 text-2xl font-semibold uppercase tracking-[0.08em] text-[#FF0F7B] transition-transform duration-150 hover:-translate-y-0.5 hover:opacity-95"
                onClick={() => {
                  window.location.href = "/trainer";
                }}
              >
                BOOKING YOUR PERSONAL TRAINER
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 h-[120%] flex justify-end items-stretch max-md:hidden">
          <div className="w-[120%] h-full bg-[url('/images/treadmill.jpg')] bg-cover bg-center [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]" />
        </div>
      </section>
    </>
  );
}

export default Home;
