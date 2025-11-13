import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "../components/box.jsx";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    fName: "",
    lName: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    diseases: "",
    sex: "",
    BMI: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.age < 0 || form.height < 0 || form.weight < 0) {
      alert("Age, Height, and Weight cannot be negative.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:1234/users/register",
        form
      );
      alert("User registered: " + res.data.userName);
      navigate("/");
    } catch (err) {
      alert("Error: " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  const handlePrevious = () => {
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex items-center justify-center px-4">
      <Box width={420} height={700} backgroundColor="#1F2937" radius={20}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-5 w-full px-6 py-8"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-4 tracking-wide">
            Create Account
          </h2>

          {/* Username */}
          <input
            name="userName"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61FF7E] text-gray-900 placeholder-gray-500 bg-white shadow-sm"
          />

          {/* First & Last Name */}
          <div className="flex space-x-3">
            <input
              name="fName"
              type="text"
              placeholder="First Name"
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61FF7E] text-gray-900 placeholder-gray-500 bg-white shadow-sm"
            />
            <input
              name="lName"
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
              required
              className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61FF7E] text-gray-900 placeholder-gray-500 bg-white shadow-sm"
            />
          </div>

          {/* Password */}
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61FF7E] text-gray-900 placeholder-gray-500 bg-white shadow-sm"
          />

          {/* Age, Height, Weight */}
          <div className="flex space-x-3">
            <input
              name="age"
              type="number"
              placeholder="Age"
              min="0"
              onChange={handleChange}
              required
              className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61FF7E] text-gray-900 placeholder-gray-500 bg-white shadow-sm"
            />
            <input
              name="height"
              type="number"
              placeholder="Height (cm)"
              min="0"
              onChange={handleChange}
              required
              className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61FF7E] text-gray-900 placeholder-gray-500 bg-white shadow-sm"
            />
            <input
              name="weight"
              type="number"
              placeholder="Weight (kg)"
              min="0"
              onChange={handleChange}
              required
              className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61FF7E] text-gray-900 placeholder-gray-500 bg-white shadow-sm"
            />
          </div>

          {/* Sex */}
          <div className="flex flex-col space-y-2 text-white">
            <label className="font-medium text-lg">Sex</label>
            <div className="flex space-x-6">
              {["Male", "Female", "Other"].map((s) => (
                <label key={s} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="sex"
                    value={s}
                    onChange={handleChange}
                    required
                    className="w-4 h-4 text-[#61FF7E] focus:ring-[#61FF7E]"
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Diseases */}
          <textarea
            name="diseases"
            placeholder="Diseases (optional)"
            onChange={handleChange}
            rows={3}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61FF7E] text-gray-900 placeholder-gray-500 bg-white shadow-sm resize-none"
          />

          {/* BMI */}
          <input
            name="BMI"
            type="number"
            placeholder="BMI"
            onChange={handleChange}
            min="0"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#61FF7E] text-gray-900 placeholder-gray-500 bg-white shadow-sm"
          />

          {/* Buttons */}
          <div className="flex justify-between mt-6 space-x-4 ">
            <button
              type="button"
              onClick={handlePrevious}
              className="w-1/2 bg-gray-500 text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200 cursor-pointer"
            >
              Previous
            </button>

            <button
              type="submit"
              className="w-1/2 bg-[#61FF7E] text-gray-900 font-bold py-2 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-200 cursor-pointer"
            >
              Register
            </button>
          </div>
        </form>
      </Box>
    </div>
  );
}
