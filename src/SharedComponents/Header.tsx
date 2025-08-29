import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { AuthContext } from "../Auth/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Top Donor", to: "/topDonor" },
    { label: "Requests", to: "/requests" },
    { label: "Contact Us", to: "/contact" },
    { label: "About Us", to: "/about" },
  ];

  return (
    <div className="sticky top-0 bg-black text-white py-4 z-50 shadow-md">
      {/* Header Container */}
      <div className="flex items-center justify-between px-5">
        {/* Logo */}
        <div>
          <Link to="/">
            <img
              className="w-32 h-16 object-contain"
              src="https://i.ibb.co.com/HD77xCgw/Screenshot-617-removebg-preview.png"
              alt="logo"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-bold">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="relative after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
          {!user ? (
            <Link
              to="/register"
              className="relative after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            >
              Login/Register
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">{user.name} ({user.role})</span>
              <button onClick={logout} className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700">
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute  left-0 w-full h-screen bg-black flex flex-col items-center justify-center gap-10 font-bold text-lg">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="relative after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
          {!user ? (
            <Link
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="relative after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
            >
              Login/Register
            </Link>
          ) : (
            <button onClick={() => { logout(); setMenuOpen(false); }} className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700">
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
