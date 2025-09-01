import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { AuthContext } from "../providers/AuthProvider";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState<
    { label: string; to: string; onClick?: () => void }[]
  >([]);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (auth?.signOutUser) {
        await auth.signOutUser();
        setMenuOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Update navLinks whenever `user` changes
  useEffect(() => {
    if (!auth?.user) {
      // user is not logged in
      setNavLinks([
        { label: "Home", to: "/" },
        { label: "Top Donor", to: "/topDonor" },
        // { label: "Requests", to: "/requests" },
        { label: "Contact Us", to: "/contact" },
        { label: "About Us", to: "/about" },
        { label: "Login", to: "/login" },
        { label: "Register", to: "/register" },
      ]);
    } else {
      // user is logged in
      const links: { label: string; to: string; onClick?: () => void }[] = [
        { label: "Home", to: "/" },
        { label: "Top Donor", to: "/topDonor" },
        { label: "Contact Us", to: "/contact" },
        { label: "About Us", to: "/about" },
      ];

      if (auth.user.role === "donor")
        links.push({
          label: "Donor Dashboard",
          to: "/dashboard/donor/profile",
        });
      if (auth.user.role === "recipient")
        links.push({
          label: "Recipient Dashboard",
          to: "/dashboard/recipient/profile",
        });
      if (auth.user.role === "admin")
        links.push({
          label: "Admin Dashboard",
          to: "/dashboard/admin/profile",
        });

      links.push({ label: "Logout", to: "#", onClick: handleLogout });

      setNavLinks(links);
    }
  }, [auth?.user, auth?.signOutUser]);

  // Show loading state while auth is initializing
  if (auth?.loading) {
    return (
      <div className="sticky top-0 bg-black text-white py-4 z-50 shadow-md">
        <div className="flex items-center justify-center px-5">
          <img
            className="w-32 h-16 object-contain animate-pulse"
            src="https://i.ibb.co/HD77xCgw/Screenshot-617-removebg-preview.png"
            alt=""
          />
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 bg-black text-white py-4 z-50 shadow-md">
      <div className="flex items-center justify-between px-5">
        <div>
          <Link to="/">
            <img
              className="w-32 h-16 object-contain"
              src="https://i.ibb.co/HD77xCgw/Screenshot-617-removebg-preview.png"
              alt="logo"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 font-bold">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={link.onClick ? link.onClick : undefined}
              className="relative after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Tablet Toggle Button */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Tablet Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute left-0 w-full h-screen bg-black flex flex-col items-center justify-center gap-10 font-bold text-lg">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={() => {
                setMenuOpen(false);
                if (link.onClick) link.onClick();
              }}
              className="relative after:bg-white after:absolute after:h-[2px] after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300 cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
