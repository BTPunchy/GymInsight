import { useState } from "react";
import { Link } from "react-router-dom";

const SERVICE_ITEMS = [
  {
    id: "yoga",
    title: "Yoga Room",
    desc: "Calm space for yoga, stretching and breath work.",
  },
  {
    id: "pilates",
    title: "Pilates Room",
    desc: "Reformer & mat pilates for posture and rehab.",
  },
  {
    id: "dance",
    title: "Dance Fitness",
    desc: "High-energy studio for dance and group classes.",
  },
];

const TIME_SLOTS = ["07:00", "09:00", "11:30", "14:00", "16:30", "18:00"];

export default function Home() {
  const [activeService, setActiveService] = useState(SERVICE_ITEMS[0].id);
  const [activeTime, setActiveTime] = useState(TIME_SLOTS[1]);

  const selectedService = SERVICE_ITEMS.find((s) => s.id === activeService);

const handleBookNow = async () => {
  try {
    const res = await fetch("http://localhost:5000/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ serviceId: activeService, time: activeTime }),
})


    const data = await res.json();
    if (data.success) {
      alert(`Booked ${selectedService.title} at ${activeTime}. ID: ${data.bookingId}`);
    } else {
      alert("Booking failed: " + data.message);
    }
  } catch (err) {
    console.error("Frontend fetch error:", err);
    alert("Network or server error");
  }
};



  return (
    <div className="home">
      {/* HERO */}
      <section className="home-hero">
        <div className="hero-left">
          <p className="eyebrow">FITNESS • WELLNESS • BOOKING</p>
          <h1 className="headline">
            YOUR WELLNESS JOURNEY
            <br />
            STARTS HERE.
          </h1>
          <p className="subhead">
            Simple booking. Powerful results. Reserve rooms, book trainers, and
            manage your schedule in one place.
          </p>

          <div className="cta-row">
            <Link to="/reserve" className="chip green">
              Reserve Room
            </Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-card main">
            <h3>Today&apos;s Classes</h3>
            <ul>
              <li>
                <span>Yoga Flow</span>
                <span>09:00</span>
              </li>
              <li>
                <span>HIIT Burn</span>
                <span>11:30</span>
              </li>
              <li>
                <span>Pilates Core</span>
                <span>18:00</span>
              </li>
            </ul>
          </div>

          <div className="hero-card mini">
            <p>Active reservations</p>
            <strong>3</strong>
          </div>
        </div>
      </section>

      {/* SERVICE SECTION + SCHEDULE */}
      <section id="service" className="section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>
            Pick a room and time slot that works for you. Quick booking straight
            from the home screen — just like in the design.
          </p>
        </div>

        <div className="service-layout">
          {/* LEFT: SERVICE LIST */}
          <div className="service-list">
            {SERVICE_ITEMS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={
                  s.id === activeService
                    ? "service-row service-row-active"
                    : "service-row"
                }
                onClick={() => setActiveService(s.id)}
              >
                <div className="service-row-header">
                  <h3>{s.title}</h3>
                  {s.id === activeService && (
                    <span className="service-pill">Selected</span>
                  )}
                </div>
                <p>{s.desc}</p>
              </button>
            ))}
          </div>

          {/* RIGHT: SCHEDULE CARD */}
          <div className="schedule-card">
            <div className="schedule-header">
              <div>
                <p className="schedule-label">Quick booking</p>
                <h3 className="schedule-title">{selectedService.title}</h3>
              </div>
              <div className="schedule-date-pill">Today · Mon</div>
            </div>

            <p className="schedule-sub">
              Choose a time slot to reserve this room. This is a mock schedule
              UI from Figma — logic can be connected later.
            </p>

            <div className="time-grid">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={
                    t === activeTime
                      ? "time-slot time-slot-active"
                      : "time-slot"
                  }
                  onClick={() => setActiveTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="btn schedule-book-btn"
              onClick={handleBookNow}
            >
              Book this time
            </button>

            <p className="schedule-footer">
              Need more options? Go to{" "}
              <Link to="/booking" className="inline-link">
                Booking
              </Link>{" "}
              or{" "}
              <Link to="/reserve" className="inline-link">
                full room reservation
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* TRAINER SECTION */}
      {/* <section id="trainer" className="section trainer-section">
        <div className="section-header">
          <h2>Personal Trainers</h2>
          <p>Choose the right coach for strength, conditioning, or recovery.</p>
        </div>

        <div className="trainer-grid">
          <TrainerCard
            name="Alex Carter"
            tag="Strength & Conditioning"
            desc="Perfect for beginners who want to build a solid foundation."
          />
          <TrainerCard
            name="Mina Lee"
            tag="Yoga & Mobility"
            desc="Improve flexibility, posture, and breathing."
          />
          <TrainerCard
            name="Diego Silva"
            tag="HIIT & Weight Loss"
            desc="High-energy sessions focused on fat burn."
          />
        </div>
      </section> */}
    </div>
  );
}

// function TrainerCard({ name, tag, desc }) {
//   return (
//     <div className="trainer-card">
//       <div className="trainer-avatar" />
//       <h3>{name}</h3>
//       <p className="trainer-tag">{tag}</p>
//       <p className="trainer-desc">{desc}</p>
//       <button type="button" className="btn-xs">
//         Book session
//       </button>
//     </div>
//   );
// }
