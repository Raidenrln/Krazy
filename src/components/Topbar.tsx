import { useState, useRef, useEffect, type CSSProperties } from "react";
import { NavLink, type NavLinkRenderProps } from "react-router-dom";
import {
  House,
  User,
  Trophy,
  ScrollText,
  CalendarCheck,
  Laptop,
  MonitorDown,
  CircleQuestionMark,
  Menu,
  X,
  LogOut,
  UserCircle
} from "lucide-react";
import { useTotalServerPlayers } from "../context/TotalPlayersContext";

const navItems = [
  { to: "/home", label: "Home", icon: House },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/leaderboard", label: "Ranks", icon: Trophy },
  { to: "/community", label: "Community", icon: ScrollText },
  { to: "/events", label: "Events", icon: CalendarCheck },
  { to: "/updates", label: "Updates", icon: MonitorDown },
  { to: "/status", label: "Status", icon: Laptop },
  { to: "/support", label: "Support", icon: CircleQuestionMark },
];

const Topbar = () => {
  const { players } = useTotalServerPlayers();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkStyles = ({ isActive }: NavLinkRenderProps): CSSProperties => ({
    color: isActive ? "white" : "var(--violet-dim)",
    background: isActive ? "var(--violet-dim)" : "none",
    border: isActive ? "1px solid #a855f7" : "1px solid var(--border-light)",
    fontWeight: isActive ? "bold" : "normal",
    padding: "5px 10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  });

  const mobileNavLinkStyles = ({ isActive }: NavLinkRenderProps): CSSProperties => ({
    color: isActive ? "white" : "var(--violet-dim)",
    background: isActive ? "var(--violet-dim)" : "none",
    border: isActive ? "1px solid #a855f7" : "1px solid var(--border-light)",
    fontWeight: isActive ? "bold" : "normal",
    padding: "10px 14px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "8px",
    whiteSpace: "nowrap"
  });

  const handleLogout = () => {
    console.log("logging out...");
    setProfileOpen(false);
  };

  return (
    <div
      className="
        fixed min-[880px]:sticky
        top-0 left-0
        z-50
        w-full
        max-[880px]:top-3 max-[880px]:px-3
      "
    >
      <div
        className="
          flex items-center h-20 p-2 justify-between
          bg-(--panel-raised)
          border-b border-(--border)
          max-[880px]:border max-[880px]:rounded-2xl
          max-[880px]:shadow-lg max-[880px]:shadow-black/40
          max-[880px]:h-16
        "
      >
        <div className="flex items-center gap-2 text-white font-pixel">
          <div className="h-10 w-10 border ">
            <img className="h-auto"></img>
          </div>
          <h1 className="text-[12px] font-extrabold">KRAZY</h1>
        </div>

        {/* Desktop nav: hidden below 840px, visible from 840px up */}
        <div className="hidden min-[880px]:block bg-(--bg-deep) border-2 border-(--border) p-1">
          <div className="font-pixel text-[8px] border-2">
            <nav className="flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} style={navLinkStyles}>
                  <Icon size={18} />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* right side */}
        <div className="h-full text-white flex gap-2 items-center">
          <div className="flex items-center px-4 border border-(--border-light) bg-(--bg-deep) font-mono text-[12px] h-8">
            <span>{`${players.online} / ${players.max}`}</span>
          </div>

          {/* profile button with logout dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center justify-center h-8 w-8 border border-(--border-light) bg-(--bg-deep)"
              onClick={() => setProfileOpen((prev) => !prev)}
              aria-label="Toggle profile menu"
              aria-expanded={profileOpen}
            >
              <UserCircle size={20} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-(--bg-deep) border border-(--border-light) shadow-lg font-pixel text-[10px] z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-white hover:bg-(--violet-dim) transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* hamburger button: only visible below 880px */}
          <button
            className="min-[880px]:hidden flex items-center justify-center"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown panel: only below 840px, floats below the pill bar */}
      {menuOpen && (
  <div
    className="
      min-[880px]:hidden
      w-fit ml-auto mt-2
      bg-(--bg-deep) border border-(--border-light)
      rounded-2xl shadow-lg shadow-black/40
      p-2
    "
  >
    <nav className="flex flex-col gap-1 font-pixel text-[10px]">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          style={mobileNavLinkStyles}
          onClick={() => setMenuOpen(false)}
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  </div>
)}
    </div>
  );
};

export default Topbar;