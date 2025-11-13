export default function Header() {
  return (
    <header className="p-4 h-20 w-full" style={{ backgroundColor: "#B93382" }}>
      <nav className="flex justify-end">
        <div className="flex gap-6 items-center text-lg">
          <a
            href="/Home"
            className="text-white font-semibold hover:underline cursor-pointer"
          >
            Home
          </a>
          <a
            href=""
            className="text-white font-semibold hover:underline cursor-pointer"
          >
            Service
          </a>
          <button
            className="bg-white text-[#B93382] px-5 py-2 rounded-lg font-semibold 
                       shadow-sm hover:bg-pink-50 hover:shadow-md 
                       transition-all duration-200 text-lg cursor-pointer"
            onClick={() => {
              window.location.href = "/signin";
            }}
          >
            Sign In
          </button>
          <button
            className="text-[white] px-5 py-2 rounded-lg font-semibold 
                       shadow-sm hover:opacity-90 hover:shadow-md 
                       transition-all duration-200 text-lg cursor-pointer"
            style={{ backgroundColor: "#61FF7E" }}
            onClick={() => {
              window.location.href = "/signup";
            }}
          >
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
}
