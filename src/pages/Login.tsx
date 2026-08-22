import { Wifi, Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useProfile } from "../context/ProfileContext";

const Login = () => {
  const navigate = useNavigate();
  const { fetchProfile } = useProfile();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("https://spatial-drawings-board-profession.trycloudflare.com/api/login", {
        username,
        password,
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        await fetchProfile(); // Fetch the new user's profile before navigating
        navigate("/home");
      } else {
        setError("Token missing in response.");
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Invalid credentials.");
      } else {
        setError("An error occurred during login.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page min-h-screen w-full inset-0 flex items-center justify-center text-white p-4">
      <div className="flex flex-col w-full max-w-sm h-auto bg-(--panel-raised) border-(--border-light) border rounded">
        
        {/* Top Section */}
        <div className="flex justify-center items-center gap-2 py-12">
          <h1 className="font-pixel font-extrabold text-[16px]">KRAZY</h1>
        </div>

        <div className="flex justify-center">
          <hr className="w-full border-t border-(--border)" />
        </div>

        {/* Username and Password Input */}
        <div className="w-full gap-4 p-6 flex flex-col font-body">
          {error && (
            <div className="p-2.5 bg-red-950/80 border border-red-500/60 text-red-300 text-[11px] font-mono rounded">
              {error}
            </div>
          )}

          <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex w-full flex-col text-[12px] gap-2">
              <span className="text-(--text-muted) font-bold">USERNAME</span>
              <input 
                className="font-body text-[14px] border h-12 border-(--border) bg-(--bg-deep) p-2 text-white focus:outline-none focus:border-(--violet) transition-colors" 
                onChange={(e) => setUsername(e.target.value)} 
                value={username}
                required
              />
            </div>

            <div className="flex flex-col text-[12px] gap-2">
              <span className="text-(--text-muted) font-bold">PASSWORD</span>
              <div className="relative flex items-center">
                <input 
                  className="w-full font-body text-[12px] border h-12 border-(--border) bg-(--bg-deep) p-2 pr-10 text-white focus:outline-none focus:border-(--violet) transition-colors" 
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-(--text-muted) hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`text-[12px] bg-(--violet-dim) hover:bg-(--violet) h-12 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-center">
          <hr className="w-[90%] border-t border-(--border)" />
        </div>

        <div className="flex flex-col gap-1.5 items-center justify-center">
          <div className="flex justify-center items-center gap-1 px-2 py-6">
            <Wifi size={16} className="text-(--violet)" />
            <p className="text-[12px] font-body text-(--text-muted)">
              124 players online right now
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;