"use client";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        // Redirect or set auth state here
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen bg-white shadow-lg overflow-hidden"> 
      {/* Left Side: Login Form (50%) */}
      {/* Updated: Adjusted mt-32, ml-32, and pt-10 to move logo up and left */}
      <div className="flex flex-col justify-center items-center w-1/2 h-full px-[30px] pt-[43px] pb-[48px] min-h-full">
        {/* Logo - Removed justify-start as it's default now */}
        <div className="mb-8 flex mr-120"> 
          <Image
            src="/logo.svg"
            alt="Brewly Logo"
            width={61}
            height={61}
            
          />
        </div>
        {/* Heading */}
        <h2 className="text-[32px] font-lato font-bold text-[#1E1E1E] mb-4 mr-22 text-left leading-[40px]">
          Login to, <span className="text-[#00674E]">Brewly!</span>
        </h2>
        {/* Form */}
        <form
          className="flex flex-col gap-[32px] w-[336px]"
          onSubmit={handleSubmit}
        >
          <div className="relative w-[336px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#787777]">
              <Mail size={22} />
            </span>
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 border border-[#E5E7EB] rounded-[10px] font-lato text-[17px] focus:outline-none focus:ring-2 focus:ring-[#00674E]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative w-[336px]">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#787777]">
              <Lock size={22} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-3 border border-[#E5E7EB] rounded-[10px] font-lato text-[17px] focus:outline-none focus:ring-2 focus:ring-[#00674E]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#787777] focus:outline-none"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
          <div className="flex items-center justify-between text-[15px] font-lato w-[336px] h-[24px]">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#00674E] w-4 h-4" />
              <span className="text-[#787777]">Remember me</span>
            </label>
            <a href="#" className="text-[#00674E] font-medium hover:underline">
              Forgot Password?
            </a>
          </div>
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 bg-[#00674E] text-white rounded-[10px] font-lato font-semibold text-[18px] mt-2 hover:bg-[#00553e] transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
      {/* Right Side: Image (50%) */}
      <div className="h-full relative flex items-center justify-center overflow-hidden rounded-tl-3xl rounded-bl-3xl rounded-tr-none rounded-br-none w-[70%]">
        <Image
          src="/icons/login-sideimage.svg"
          alt="Login Side"
          fill
          className="object-cover h-full w-full"
          priority
        />
      </div>
    </div>
  );
}
