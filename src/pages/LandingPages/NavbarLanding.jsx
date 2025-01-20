import { useState } from "react";
import Logo from "./images/dimp-blue.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavbarLanding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Hamburger menu toggle state
  const [dropdownOpen, setDropdownOpen] = useState({
    features: false,
    useCases: false,
    support: false,
  });

  const handleMouseEnter = (dropdown) => {
    setDropdownOpen((prev) => ({ ...prev, [dropdown]: true }));
  };

  const handleMouseLeave = (dropdown) => {
    setDropdownOpen((prev) => ({ ...prev, [dropdown]: false }));
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleSignUp = () => {
    if (location.pathname === "/barbers") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Barber Shop");
      navigate("/auth/personal-information");
    } else if (location.pathname === "/hairdressers") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Hair Salon");
      navigate("/auth/personal-information");
    } else {
      sessionStorage.removeItem("Category");
      sessionStorage.removeItem("SubCategory");
      navigate("/auth/personal-information");
    }
  };

  return (
    <nav className="font-sen bg-white px-4 py-2 lg:px-10 fixed top-0 left-0 w-full z-50">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto py-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-8" alt="Logo" />
        </Link>
        <div className="flex items-center md:order-2 space-x-1  md:space-x-3 rtl:space-x-reverse">
          <Link
            to="/auth/login"
            className="btn btn-outline-primary text-primary3 text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-lg flex items-center justify-between border border-primary3 hover:bg-primary3 hover:text-white transition"
          >
            Sign In
          </Link>
          <button
            onClick={handleSignUp}
            className="bg-gradient-to-r from-[#183fb9] via-[#4f41df] via-[#ae2eb9] via-[#ef3f59] to-[#e9522d] hover:bg-gradient-to-l from-[#183fb9] via-[#4f41df] via-[#ae2eb9] via-[#ef3f59] to-[#e9522d] text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Sign Up
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
            {/* Dropdown for Features */}
            <li>
              <Link
                to="https://dimpified.com/#features"
                onClick={() => scrollToElement("features")}
                className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary3 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Features
              </Link>
            </li>

            {/* Dropdown for Use Cases */}
            <li
              onMouseEnter={() => handleMouseEnter("useCases")}
              onMouseLeave={() => handleMouseLeave("useCases")}
              className="relative"
            >
              <button
                onClick={() => toggleDropdown("useCases")}
                className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary3 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Use Cases
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                className={`absolute z-10 grid lg:w-[500px] sm:w-[200px] grid-cols-2 sm:grid-cols-1 gap-4 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700 transition-all duration-300 ${
                  dropdownOpen.useCases
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
                style={{
                  top: "40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                  <ul className="space-y-4">
                    <li>
                      <Link
                        to="https://dimpified.com/barbers"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Barbers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="https://dimpified.com/hairdressers"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Hairdressers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="https://dimpified.com/makeup"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Make-Up Artists
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="https://dimpified.com/nails"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Nail Salons
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            {/* Other links */}
            <li>
              <Link
                to="https://dimpified.com/pricing"
                className="block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary3 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Pricing
              </Link>
            </li>

            {/* Dropdown for Support */}
            <li
              onMouseEnter={() => handleMouseEnter("support")}
              onMouseLeave={() => handleMouseLeave("support")}
              className="relative"
            >
              <button
                onClick={() => toggleDropdown("support")}
                className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-900 border-b border-gray-100 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary3 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Support
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                className={`absolute z-10 grid lg:w-[500px] sm:w-[200px] grid-cols-2 sm:grid-cols-1 gap-4 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 md:grid-cols-3 dark:bg-gray-700 transition-all duration-300 ${
                  dropdownOpen.support
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
                style={{
                  top: "40px", // Adjust this for vertical placement
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                  <ul className="space-y-4">
                    <li>
                      <Link
                        to="https://dimpified.com/help-center"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Help Center
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;
