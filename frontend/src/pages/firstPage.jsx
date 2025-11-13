import Header from "../components/header.jsx";

function FirstPage() {
  return (
    <>
      <Header />

      <section
        className="
        relative flex h-screen w-full items-center
        bg-[#04073E] px-[6vw] overflow-hidden
        max-md:flex-col max-md:justify-center max-md:px-6 max-md:py-10
        "
      >
        {/* LEFT: TEXT */}
        <div
          className="
            z-10 basis-[50%] max-w-[560px]
            text-white text-left
            max-md:basis-auto max-md:max-w-full max-md:text-center
          "
        >
          <h1
            className="
              font-bebas
              text-[40px] md:text-[48px]
              tracking-[0.12em] uppercase leading-[1.1]
              /* เอา nowrap ออกเพื่อให้มันตัดบรรทัดได้เอง */
            "
          >
            YOUR WELLNESS JOURNEY STARTS HERE.
          </h1>

          <h1
            className="
              mt-2 font-bebas
              text-[40px] md:text-[48px]
              tracking-[0.12em] uppercase leading-[1.1]
            "
          >
            SIMPLE BOOKING POWERFUL RESULTS.
          </h1>

          <div className="mt-8 flex items-center gap-4 flex-wrap max-md:justify-center">
            <button
              className="
                rounded-full border-2 border-[#19B94A] bg-[#19B94A]
                px-8 py-2.5 text-2xl font-semibold uppercase tracking-[0.08em]
                text-white transition-transform duration-150
                hover:-translate-y-0.5 hover:opacity-95
              "

              onClick={() => {
              window.location.href = "/gym";
              }}
            >
              RESERVE ROOM
            </button>

            <span className="text-base uppercase text-white max-md:order-3">
              or
            </span>

            <button
              className="
                rounded-full border-2 border-[#FF0F7B] bg-transparent
                px-8 py-2.5 text-2xl font-semibold uppercase tracking-[0.08em]
                text-[#FF0F7B] transition-transform duration-150
                hover:-translate-y-0.5 hover:opacity-95
              "
              onClick={() => {
              window.location.href = "/trainer";
              }}
            >
              BOOKING YOUR PERSONAL TRAINER
            </button>
          </div>
        </div>

        {/* RIGHT: IMAGE SHAPE */}
        <div className="flex-1 h-[120%] flex justify-end items-stretch max-md:hidden">
          <div
            className="
            w-[120%] h-full bg-[url('/images/treadmill.jpg')]
            bg-cover bg-center
            [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]
            "
          />
        </div>
      </section>
    </>
  );
}

export default FirstPage;
