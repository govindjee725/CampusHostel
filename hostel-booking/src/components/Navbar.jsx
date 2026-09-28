import {
  FaHotel,
  FaPlusCircle,
} from "react-icons/fa";
import { FiMenu, FiLogOut, FiLogIn } from "react-icons/fi";
import { MdTravelExplore } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, role,logout} = useAuth(); // 👈 user added
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const visible =
        prevScrollPos > currentScrollPos || currentScrollPos < 10;
      setIsVisible(visible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`z-50 fixed top-0 left-0 right-0 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } bg-white shadow-sm`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center px-4 py-3">

        {/* LOGO */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
          >
            <img
              src="/assets/hostel_logo.jpg"
              alt="Campus Hostel"
              className="h-12 w-12 mr-2"
            />
            <div>
              <span className="font-bold text-[#4d9af2] text-lg">Campus</span>{" "}
              <span className="font-bold text-[#64b191] text-lg">Hostel</span>
            </div>
          </div>

          {/* MOBILE MENU */}
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 border rounded-full hover:bg-gray-100"
          >
            <FiMenu />
          </button>
        </div>

        {/* MENU */}
        <div
          className={`${
            isMobileMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center gap-4 mt-3 md:mt-0`}
        >
          {/* ALL HOSTELS */}
          <button
            onClick={() => {
              navigate("/all-hostels");
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-500"
          >
            <FaHotel />
            {t("All Hostels")}
          </button>

          {/* CONNECT */}
          <button
            onClick={() => {
              const el = document.getElementById("connect-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-500"
          >
            <MdTravelExplore />
            {t("Connect & Help")}
          </button>

          {/* ADMIN ONLY */}
          {user&&role === "admin" && (
            <button
              onClick={() => {
                navigate("/upload-hostel");
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
            >
              <FaPlusCircle />
              Add Hostel
            </button>
          )}

          {/* USER / AUTH */}
          {/* AUTH SECTION */}
<div className="relative">
  {/* NOT LOGGED IN */}
  {!user && (
    <div className="flex gap-2">
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/signup")}
        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Sign Up
      </button>
    </div>
  )}

  {/* LOGGED IN (USER OR ADMIN) */}
  {user && (
    <>
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img
          src={user.profileImage || "/assets/avatar.png"}
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover border"
        />
      </button>

      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-md overflow-hidden">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>

          <button
            onClick={() => {
              navigate("/profile");
              setShowUserMenu(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile
          </button>

          <button
            onClick={() => {
              logout();
              setShowUserMenu(false);
              navigate("/");
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      )}
    </>
  )}
</div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
