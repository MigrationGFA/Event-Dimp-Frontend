import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../features/authentication";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/DIMP logo colored.png";
import OverviewImg from "../../assets/overview.svg";
import AttendeeImg from "../../assets/Attendee.svg";
import GiftImg from "../../assets/Gift.svg";
import PaymentImg from "../../assets/wallet.png";
import SubImg from "../../assets/UpgradeSub.svg";
import MyWebsiteImg from "../../assets/myWebsite.svg";
import EditTemplateImg from "../../assets/editTemplate2.svg";
import ProfileImg from "../../assets/profile.svg";
import BookingImg from "../../assets/CalendarDots.svg";
import logOutImg from "../../assets/SignOut.svg";
import NotificationIcon from "../../assets/notification.svg";
import ThemeSwitchIcon from "../../assets/themeswitch.svg";
import { Heading } from "../../component/Text";
import { useSelector } from "react-redux";
import api from "../../api/DashboardApi";
import Avatar from "../../assets/person.png";
import { setEcosystemType } from "../../features/ecosystemType";
import { setEcosystemDomain } from "../../features/ecosystemDomain";

const GeneralSteps = [
  {
    label: "Overview",
    link: "/creator/dashboard/general-overview",
    icon: OverviewImg,
  },
  {
    label: "Bookings",
    link: "/creator/dashboard/general-booking",
    icon: BookingImg,
  },
  {
    label: "Payments",
    link: "/creator/dashboard/general-payment",
    icon: PaymentImg,
  },
  {
    label: "Manage Website",
    link: "/creator/dashboard/general-edit-website",
    icon: EditTemplateImg,
  },
  {
    label: "Manage Service",
    link: "/creator/dashboard/general-service",
    icon: MyWebsiteImg,
  },
  {
    label: "My Websites",
    link: "/creator/dashboard/my-website",
    icon: MyWebsiteImg,
  },

  {
    label: "Subscription",
    link: "/creator/dashboard/Subscription",
    icon: SubImg,
  },
  {
    label: "Profile",
    link: "/creator/dashboard/profile",
    icon: ProfileImg,
  },
];

const TicketSteps = [
  {
    label: "Overview",
    link: "/creator/dashboard/overview",
    icon: OverviewImg,
  },
  {
    label: "Attendees",
    link: "/creator/dashboard/attendees",
    icon: AttendeeImg,
  },
  {
    label: "Tickets",
    link: "/creator/dashboard/tickets",
    icon: GiftImg,
  },
  {
    label: "Tickets Plan",
    link: "/creator/dashboard/tickets-plan",
    icon: GiftImg,
  },
  {
    label: "Wallet",
    link: "/creator/dashboard/wallet",
    icon: PaymentImg,
  },
  {
    label: "My Website",
    link: "/creator/dashboard/my-website",
    icon: MyWebsiteImg,
  },
  {
    label: "Edit Website",
    link: "/creator/dashboard/edit-website",
    icon: EditTemplateImg,
  },

  {
    label: "Subscription",
    link: "/creator/dashboard/Subscription",
    icon: SubImg,
  },
  {
    label: "Profile",
    link: "/creator/dashboard/profile",
    icon: ProfileImg,
  },
];
const GiFtSteps = [
  {
    label: "Overview",
    link: "/creator/dashboard/overview",
    icon: OverviewImg,
  },
  {
    label: "Attendees",
    link: "/creator/dashboard/attendees",
    icon: AttendeeImg,
  },
  {
    label: "Gift",
    link: "/creator/dashboard/gifts",
    icon: GiftImg,
  },
  {
    label: "Gift Plan",
    link: "/creator/dashboard/gifts-plan",
    icon: GiftImg,
  },
  {
    label: "Wallet",
    link: "/creator/dashboard/wallet",
    icon: PaymentImg,
  },
  {
    label: "My Website",
    link: "/creator/dashboard/my-website",
    icon: MyWebsiteImg,
  },
  {
    label: "Edit Website",
    link: "/creator/dashboard/edit-website",
    icon: EditTemplateImg,
  },

  {
    label: "Subscription",
    link: "/creator/dashboard/Subscription",
    icon: SubImg,
  },
  {
    label: "Profile",
    link: "/creator/dashboard/profile",
    icon: ProfileImg,
  },
];

const CreatorDashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const userImage = useSelector((state) => state.auth.user?.image);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const ecosystemType = useSelector((state) => state.ecosystemType.type);
  const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const DashboardSwitch = ecosystemType;
  const [websites, setWebsites] = useState([]);
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dynamically assign steps based on DashboardSwitch
  let steps;
  if (DashboardSwitch === "Booking") {
    steps = GeneralSteps;
  } else if (DashboardSwitch === "Ticketing") {
    steps = TicketSteps;
  } else if (DashboardSwitch === "Gift") {
    steps = GiFtSteps;
  } else {
    steps = GeneralSteps;
  }

  useEffect(() => {
    getNotification();
    getAllWebsites();
  }, [accessToken, refreshToken, ecosystemDomain]);

  const getAllWebsites = async () => {
    setLoading(true);
    try {
      const response = await api.creatorGetRecentEcosystem({
        creatorId,
        accessToken,
        refreshToken,
      });
  
      const ecosystems = response.data.ecosystems || [];
      setWebsites(ecosystems);
  
      // Extract both ecosystemName and type
      const dashboardData = ecosystems.map((website) => ({
        name: website.ecosystemName,
        type: website.type,
        ecosystemDomain: website.ecosystemDomain,
      }));
      setDashboards(dashboardData);
  
    } catch (error) {
      console.error("Could not get websites:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const getNotification = async () => {
    try {
      //Ensure tokens exist before making the API call
      if (!accessToken || !refreshToken) return;

      const response = await api.creatorNotification({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setNotifications(response.data.message);
    } catch (error) {
      console.error("Could not get notifications:", error);
    }
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle the sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isNotificationOpen, setNotificationOpen] = useState(false);

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  const [isResSidebarOpen, setResIsSidebarOpen] = useState(false);

  // Function to handle the button click
  const toggleResSidebar = () => {
    setResIsSidebarOpen(!isResSidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  // Utility function to truncate messages
  const truncateMessage = (message, maxLength = 60) => {
    return message.length > maxLength
      ? `${message.slice(0, maxLength)}...`
      : message;
  };

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  };

  const handleDashboardSwitch = (dashboard, type, ecosystemDomain) => {
    setIsDropdownOpen(false);
    dispatch(setEcosystemDomain(ecosystemDomain)); 
    dispatch(setEcosystemType(type));
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-primary1 font-body">
      {/* Sidebar */}
      <div
        className={`hidden lg:block h-full transition-all relative duration-300 p-3 ${
          isSidebarOpen ? "w-2/12" : "w-20 "
        } bg-sec1 border-r border-gray-200 flex flex-col`}
      >
        {/* Logo */}
        <div
          className={`pb-6 ${
            isSidebarOpen ? "flex justify-start" : "flex justify-center mt-8"
          }`}
        >
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className={`transition-all duration-300 ${
                isSidebarOpen ? "w-24" : "hidden"
              }`}
            />
          </Link>
        </div>

        {/* Sidebar Links */}
        <div className="flex-grow flex flex-col items-start space-y-4">
          {steps.map((step, index) => {
            const isActive = step.isActive
              ? step.isActive(location.pathname)
              : location.pathname === step.link;

            return (
              <Link
                to={step.link}
                key={index}
                className={`flex items-center w-full p-2 transition-all duration-300 ${
                  isActive ? "bg-sec6 rounded-lg" : ""
                }`}
              >
                <img
                  src={step.icon}
                  alt={step.label}
                  className={`w-6 h-6 transition-all duration-300 ${
                    isSidebarOpen ? "mr-4" : ""
                  }`}
                />
                {isSidebarOpen && (
                  <Heading
                    level={4}
                    size="lg"
                    lineHeight="leading-1"
                    color={isActive ? "primary4" : "primary4"}
                    className={`font-semibold xl:text-[13px] lg:text-[11px] ${
                      isActive ? "font-bold" : "font-normal"
                    }`}
                  >
                    {step.label}
                  </Heading>
                )}
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <div className="bottom-6 absolute border-b-2 ">
          <button
            onClick={handleLogout}
            className={`flex items-center p-2 text-red-700 transition-all duration-300 ${
              isSidebarOpen ? "justify-start" : "justify-center"
            }`}
          >
            <img
              src={logOutImg}
              alt="Logout"
              className="w-6 h-6 transition-all duration-300 mr-4"
            />
            {isSidebarOpen && (
              <Heading
                level={4}
                size="lg"
                lineHeight="leading-1"
                className="font-semibold xl:text-[13px] lg:text-[11px]"
              >
                Log Out
              </Heading>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:mx-8 h-screen flex-grow flex flex-col font-body ">
        <div className="hidden lg:block">
          <div className=" w-full flex items-center justify-between bg-white p-4 border-b-2">
            <div className="flex justify-between w-4/12">
              <button
                onClick={toggleSidebar}
                className="flex items-center text-xl"
              >
                <i className="fas fa-bars"></i>
              </button>

              {/* Navigation Links */}
              <div className="flex items-center lg:space-x-4 ">
                <Link
                  to="/creator/dashboard/watch-demo"
                  className="text-sec6 hover:text-primary5"
                >
                  Watch Demo
                </Link>
                <Link
                  to="/creator/dashboard/help-center"
                  className="text-sec6 hover:text-primary5"
                >
                  Help Desk
                </Link>
              </div>
            </div>

            {/* User Controls (Notification, Theme Switch, Profile) */}
            <div className="flex items-center space-x-4">
              {/* Switch Dashboard Button */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 bg-transparent border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <span>Switch Dashboard</span>
                  {/* Font Awesome Dropdown Icon */}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-gray-700"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-12 left-0 bg-white shadow-lg rounded-lg w-48 py-2 z-10">
                    {dashboards.map((dashboard, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleDashboardSwitch(dashboard.name, dashboard.type, dashboard.ecosystemDomain)
                        }
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {dashboard.name} ({dashboard.type})
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Notification Icon */}
              <img
                src={NotificationIcon}
                alt="Notifications"
                className="w-6 h-6 cursor-pointer"
                onClick={toggleNotification}
              />
              <div className="bg-gray-300 rounded-full w-8 h-8">
                <img
                  src={
                    // userImage ? userImage :
                    Avatar
                  }
                  alt="user image"
                  className="rounded-full"
                />
              </div>{" "}
              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div
                  className="absolute right-20 top-12 bg-white bg-opacity-100 shadow-lg border border-gray-200 rounded-lg w-80 p-4"
                  style={{ zIndex: 999 }}
                >
                  <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <button
                      onClick={toggleNotification}
                      className="text-gray-500"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="border-b py-4">
                    <p className="text-gray-700 font-semibold mb-2">Today</p>
                    {/* Check if there are notifications */}
                    {notifications.length === 0 ? (
                      <p className="text-gray-500 text-center">
                        No new notifications
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {notifications
                          .slice(0, 3)
                          .map((notification, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="w-5 h-5 text-gray-600"
                              />
                              <div className="flex-1">
                                <p className="font-semibold">
                                  {notification.type}
                                </p>
                                <p className="text-[12px] text-gray-500">
                                  {truncateMessage(notification.message, 60)}
                                </p>
                              </div>
                              <p className="text-xs text-gray-400">
                                {getRelativeTime(notification.date)}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <Link
                    to="/creator/dashboard/notification"
                    className="block text-center text-purple-500 mt-3"
                  >
                    View all notifications
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          {/* Header with logo and menu button */}
          <div className="w-full lg:hidden flex items-center justify-between bg-white p-4 border-b-2">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className={`transition-all duration-300 w-24`}
              />
            </Link>
            <button
              onClick={toggleResSidebar}
              className="flex items-center text-xl"
            >
              <i
                className={`fas ${isResSidebarOpen ? "fa-times" : "fa-bars"}`}
              ></i>
            </button>
          </div>

          {/* Fullscreen overlay menu */}
          {isResSidebarOpen && (
            <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8">
              {/* Cancel button */}
              <button
                onClick={toggleResSidebar}
                className="absolute top-4 right-4 text-3xl"
              >
                <i className="fas fa-times"></i>
              </button>

              {/* Navigation items */}
              <nav className="text-center">
                <ul className="text-lg space-y-5">
                  <li>
                    <Link
                      to="/creator/dashboard/overview"
                      onClick={toggleResSidebar}
                    >
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creator/dashboard/booking"
                      onClick={toggleResSidebar}
                    >
                      Bookings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creator/dashboard/payments"
                      onClick={toggleResSidebar}
                    >
                      Payment
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creator/dashboard/edit-template"
                      onClick={toggleResSidebar}
                    >
                      Edit Website
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creator/dashboard/edit-service"
                      onClick={toggleResSidebar}
                    >
                      Edit Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creator/dashboard/Subscription"
                      onClick={toggleResSidebar}
                    >
                      Subscription
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creator/dashboard/profile"
                      onClick={toggleResSidebar}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creator/dashboard/help-center"
                      onClick={toggleResSidebar}
                    >
                      Help Desk
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creator/dashboard/watch-demo"
                      onClick={toggleResSidebar}
                    >
                      Watch Demo
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creator/dashboard/notification"
                      onClick={toggleResSidebar}
                    >
                      Notification
                    </Link>
                  </li>
                  <li>
                    <Link className="text-red-600" onClick={handleLogout}>
                      Log Out
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboardLayout;
