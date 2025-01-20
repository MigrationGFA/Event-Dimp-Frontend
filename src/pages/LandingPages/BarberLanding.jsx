// import node module libraries
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaGlobe,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaPlayCircle,
} from "react-icons/fa";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import {
  BsWindow,
  BsGrid,
  BsCardChecklist,
  BsPeople,
  BsCalendar2Check,
  BsMessenger,
  BsLayoutTextSidebarReverse,
  BsArrowRight,
  BsLayers,
  BsBoxSeam,
  BsCashStack,
} from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

import NavbarLanding from "./NavbarLanding";
import FooterWithLinks from "./FooterWithLinks";

// Import images
import BarberImg from "./images/barber-img.jpg";
import BarberBooking from "./images/barber-booking.jpg";
import BarberMoney from "./images/barber-money.jpg";
import BarberCustomer from "./images/talk-to-customer.jpg";
import Schedule from "./images/schedule.svg";
import VerifySVG from "./images/verify.svg";
import Payment from "./images/paymentSVG.svg";
import GlowBG from "./images/glow-bg.svg";
import GradientBG from "./images/gradient-bg.png";
import ScreenShot from "./images/templatesnoplay.png";
import { Link, useNavigate } from "react-router-dom";
const reviews = [
  {
    name: "Chinedu, Lagos",
    text: "Since using this software, my bookings have doubled, and I’ve seen a significant increase in repeat customers. The ability to manage everything from my phone is a game-changer!",
  },
  {
    name: "Ade, Abuja",
    text: "Building a website was so easy. Now, clients can see my work and book appointments online. My business has never been better!",
  },
  {
    name: "Femi, Port Harcourt",
    text: "The insights I get from the analytics tools have helped me understand my customers better and tailor my services to their needs. Highly recommended!",
  },
];

const BarberLanding = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.className = "bg-white";
  }, []);

  const handleSignUp = () => {
    if (location.pathname === "/barbers") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Barber Shop");
      navigate("/auth/personal-information");
    } else {
      sessionStorage.removeItem("Category");
      sessionStorage.removeItem("SubCategory");
      navigate("/auth/personal-information");
    }
  };

  return (
    <div className="font-jak">
      <NavbarLanding />
      <section
        className="py-24 font-jak px-0 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${GlowBG})` }}
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-col md:flex-row items-center h-full">
            <div className="md:w-1/2 px-3 flex flex-col justify-center h-full">
              <h1 className="lg:text-pXXXL text-[3rem] text-dark font-normal leading-tight mb-6">
                <span>Be among the</span>{" "}
                <span className="font-bold bg-gradient-to-r from-[#183fb9] via-[#4f41df] via-[#ae2eb9] via-[#ef3f59] to-[#e9522d] text-transparent bg-clip-text">
                  top 1% of barbers
                </span>
              </h1>
              <p className="text-lg  text-dark leading-relaxed mb-8 w-4/5">
                Get a website. Get booked. Increase sales. Delight customers.
              </p>
              <div className="flex  md:flex-row  gap-4">
                <button
                  onClick={handleSignUp}
                  className="btn hover:bg-gradient-to-l from-[#183fb9] via-[#4f41df] via-[#ae2eb9] via-[#ef3f59] to-[#e9522d] bg-gradient-to-r from-[#183fb9] via-[#4f41df] via-[#ae2eb9] via-[#ef3f59] to-[#e9522d] text-white py-4 lg:px-6 px-3 rounded-lg flex items-center justify-between hover:bg-white transition"
                >
                  <span className="mr-3">Get started for free</span>
                  <FaArrowRight />
                </button>
                <Link to="/barbers-near-me">
                  {" "}
                  <button className="btn hover:text-white hover:bg-gradient-to-l from-[#183fb9] via-[#4f41df] via-[#ae2eb9] via-[#ef3f59] to-[#e9522d] border-2 border-primary3 text-primary3 py-4 lg:px-6 px-3 rounded-lg flex items-center justify-between transition">
                    <span className="mr-3">Find a barber near me</span>
                    <FaArrowRight />
                  </button>
                </Link>

                {/* <a
                  href="#events"
                  className="btn btn-outline-primary text-primary3 py-4 px-6 rounded-lg flex items-center justify-between border border-primary3 hover:bg-primary3 hover:text-white  transition"
                >
                  <span className="mr-3">Register for the events</span>
                  <FaArrowRight />
                </a> */}
              </div>
            </div>

            <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
              <img
                src={BarberImg}
                className="rounded-3xl w-full max-w-lg h-auto"
                alt="Barber"
              />
              <img
                src={Schedule}
                alt="schedule"
                className="absolute top-1/2 left-[95%] transform -translate-x-1/2 -translate-y-1/2 hidden xl:block pointer-events-none"
              />
              <img
                src={VerifySVG}
                alt="verify"
                className="absolute top-1/2 left-[10%] transform -translate-x-1/2 -translate-y-1/2 hidden xl:block pointer-events-none"
              />
              <img
                src={Payment}
                alt="payment"
                className="absolute top-[35%] left-[10%] transform -translate-x-1/2 translate-y-1/2 hidden xl:block pointer-events-none"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="down-section"
        style={{ backgroundImage: `url(${GradientBG})` }}
        className="border-b text-dark py-8 lg:py-10 px-4 lg:px-16 bg-cover"
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start">
            <div className="xl:w-5/12 lg:w-6/12 md:w-10/12 mb-4">
              <h3 className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-5xl font-medium mb-1 tracking-tighter">
                The Future of barbing business is digital
              </h3>
            </div>
            <div className="xl:w-5/12 lg:w-6/12 md:w-10/12 xl:ml-auto">
              <p className="w-11/12 md:w-4/5 mx-auto md:mx-0">
                In today’s fast-paced world, clients expect more than a great
                haircut. Our software solution helps barbers stay competitive
                with tools to create a website, manage bookings, engage
                customers, and boost sales—all from your phone.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 relative lg:mt-16">
            {/* Feature Box 1 */}
            <div className="self-start">
              <div className="relative lg:px-8 sm:px-4">
                <h1 className="absolute top-0 left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                  01
                </h1>
                <div className="pt-16 sm:pt-10">
                  <span className="block text-xl font-normal mb-2">
                    Get a website
                  </span>
                  <p className="mb-2">
                    Build a professional online presence with a custom website.
                  </p>
                  <span className="block w-16 h-0.5 bg-gray-800"></span>
                </div>
              </div>
            </div>

            {/* Feature Box 2 */}
            <div className="self-end mt-10 lg:mt-0">
              <div className="relative lg:px-8 sm:px-4">
                <h1 className="absolute top-0 left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                  02
                </h1>
                <div className="pt-16 sm:pt-10">
                  <span className="block text-xl font-normal mb-2">
                    Online booking system
                  </span>
                  <p className="mb-2">
                    Manage appointments and reduce no-shows with an easy-to-use
                    booking system.
                  </p>
                  <span className="block w-16 h-0.5 bg-gray-800"></span>
                </div>
              </div>
            </div>

            {/* Feature Box 3 */}
            <div className="self-start">
              <div className="relative lg:px-8 sm:px-4">
                <h1 className="absolute top-0 left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                  03
                </h1>
                <div className="pt-16 sm:pt-10">
                  <span className="block text-xl font-normal mb-2">
                    Get more customers
                  </span>
                  <p className="mb-2">
                    Attract and retain customers with data-driven marketing
                    strategies.
                  </p>
                  <span className="block w-16 h-0.5 bg-gray-800"></span>
                </div>
              </div>
            </div>

            {/* Feature Box 4 */}
            <div className="self-end mt-10">
              <div className="relative lg:px-8 sm:px-4">
                <h1 className="absolute top-0 left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                  04
                </h1>
                <div className="pt-16 sm:pt-10">
                  <span className="block text-xl font-normal mb-2">
                    Make more money
                  </span>
                  <p className="mb-2">
                    Increase sales and get paid with our fluid payment gateways.
                  </p>
                  <span className="block w-16 h-0.5 bg-gray-800"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white font-jak overflow-hidden">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-col lg:flex-row justify-center gap-0">
            <div className="relative h-full">
              {/* Background Image */}
              <div className="absolute right-0 top-0 hidden lg:block -z-[1]">
                <img src="images/crafto-landing-page-bg-03.png" alt="" />
              </div>

              {/* Content Wrapper */}
              <div className="flex flex-col lg:flex-row items-center justify-center h-full lg:h-auto">
                {/* Left Image */}
                <div className="lg:w-6/12 mb-5 lg:mb-0 lg:px-8 lg:py-10">
                  <img
                    src={ScreenShot}
                    className="w-full"
                    alt="Website Screenshot"
                  />
                </div>

                {/* Right Content */}
                <div className="lg:w-6/12 md:w-10/12 py-10 px-8">
                  <span className="text-md font-bold uppercase px-6 py-1 mb-5 inline-flex text-dark bg-gray-100 rounded-full">
                    Showcase your work
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-normal tracking-tight text-dark mb-4">
                    Create a Stunning Website in Minutes
                  </h1>
                  <p className="text-dark text-lg lg:w-4/5 mb-6">
                    <span className="font-normal">Your website</span> is your
                    digital storefront. With our software, you can easily create
                    a professional site to showcase your services, portfolio,
                    and customer testimonials.
                  </p>

                  {/* Feature Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  justify-center">
                    {/* Feature 1 */}
                    <div className="flex items-start mb-4">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 shadow-md mr-4">
                        <BsWindow className="text-yellow-500" size={30} />
                      </div>
                      <p className="text-dark font-medium">
                        Easy-to-use builder with customizable templates.
                      </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 shadow-md mr-4">
                        <BsGrid className="text-blue-500" size={30} />
                      </div>
                      <p className="text-dark font-medium">
                        Portfolio section to display your best work.
                      </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-teal-100 shadow-md mr-4">
                        <BsCardChecklist className="text-teal-500" size={30} />
                      </div>
                      <p className="text-dark font-medium">
                        Services and pricing section to suit your goals.
                      </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 shadow-md mr-4">
                        <BsPeople className="text-green-500" size={30} />
                      </div>
                      <p className="text-dark font-medium">
                        Customer testimonials to build trust and credibility.
                      </p>
                    </div>
                  </div>

                  {/* Optional Button */}
                  {/* <a
                  href="/auth/personal-information"
                  target="_blank"
                  className="inline-block px-8 py-3 mt-6 text-white bg-blue-500 hover:bg-blue-600 rounded-full text-lg"
                >
                  Create your website
                </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="font-jak z-10 ">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24 ">
          <div className="bg-pink-50 rounded-3xl py-10 px-6 lg:py-24">
            <div className="relative h-full">
              <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                <div className="order-1 lg:order-2 mb-4 lg:w-6/12 lg:mb-0 ">
                  <img
                    src={BarberBooking}
                    className="lg:w-4/5 w-full rounded-xl"
                    alt="Booking Management"
                  />
                </div>
                <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-24">
                  <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gradient-to-r from-pink-100 to-transparent rounded-full">
                    Booking made easy
                  </span>
                  <h1 className="font-normal text-4xl text-dark mb-3">
                    Effortless Booking Management
                  </h1>
                  <p className="text-md text-dark mb-4 leading-relaxed">
                    No more double bookings or missed appointments. Our
                    intuitive booking system allows your clients to book
                    appointments online, pay, and receive invoices. You can
                    manage your schedule from your dashboard, ensuring that your
                    chair is always full.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <div className="bg-white p-3 rounded-full flex justify-center items-center">
                        <BsCalendar2Check
                          className="text-green-500"
                          size={30}
                        />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Online booking system integrated with your website.
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white p-3 rounded-full flex justify-center items-center">
                        <BsMessenger className="text-blue-500" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Automated SMS and email reminders to reduce no-shows.
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white p-3 rounded-full flex justify-center items-center">
                        <BsLayers className="text-blue-500" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Real-time dashboard view to manage your schedule.
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white p-3 rounded-full flex justify-center items-center">
                        <BsLayoutTextSidebarReverse
                          className="text-yellow-500"
                          size={30}
                        />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Customizable booking slots and service offerings.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleSignUp}
                    className="inline-flex items-center bg-white hover:bg-gray-900 hover:text-white text-dark py-3 px-5 rounded-full shadow  transition"
                  >
                    <span>Get booked today!</span>
                    <BsArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white p-4 font-jak overflow-hidden">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-col lg:flex-row justify-center gap-0">
            <div className="lg:w-6/12 mb-5 lg:mb-0 lg:px-8 lg:pr-28">
              <div>
                <img
                  src={BarberCustomer}
                  className="w-full lg:4/5 rounded-xl"
                  alt="Customer insights"
                />
              </div>
            </div>
            <div className="lg:w-6/12 md:w-10/12 py-10">
              <span className="font-bold text-xs uppercase text-dark bg-gray-100 rounded-full py-2 px-5 mb-5 inline-block">
                Know your customers
              </span>
              <h1 className="font-normal text-4xl mb-3">
                Understand and engage your customers
              </h1>
              <p className="text-md text-dark mb-4 leading-relaxed w-11/12 lg:w-full">
                Knowing your customers is key to growing your business. Our
                software provides insights into customer behavior, preferences,
                and trends.
              </p>
              {/* Feature Box 1 */}
              <div className="flex items-start mb-4">
                <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                  <FaCheck className="text-green-500" />
                </div>
                <span className="text-lg text-dark">
                  Customer relationship management (CRM) system to store client
                  information.
                </span>
              </div>
              {/* Feature Box 2 */}
              <div className="flex items-start mb-4">
                <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                  <FaCheck className="text-green-500" />
                </div>
                <span className="text-lg text-dark">
                  Analytics dashboard to track customer trends and preferences.
                </span>
              </div>
              {/* Feature Box 3 */}
              <div className="flex items-start mb-4">
                <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                  <FaCheck className="text-green-500" />
                </div>
                <span className="text-lg text-dark">
                  Email and SMS marketing tools to engage clients.
                </span>
              </div>
              {/* Feature Box 4 */}
              <div className="flex items-start">
                <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                  <FaCheck className="text-green-500" />
                </div>
                <span className="text-lg text-dark">
                  Loyalty programs to reward repeat customers.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="font-jak z-10 ">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24 ">
          <div className="bg-gray-100 rounded-3xl py-10 px-6 lg:py-24">
            <div className="relative h-full">
              <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                <div className="order-1 lg:order-2 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                  <img
                    src={BarberMoney}
                    className="w-full rounded-xl"
                    alt="Expand Your Sales Streams"
                  />
                </div>
                <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-16">
                  <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-pink-100 rounded-full">
                    Expand Your Sales Streams
                  </span>
                  <h1 className="font-normal text-4xl text-dark mb-3">
                    Get your money before the client comes to your shop.
                  </h1>
                  <p className="text-md text-dark mb-4 leading-relaxed">
                    Increase your sales by offering multiple services to your
                    clients before they even step into your shop.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsLayers className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Integrated service platform for listing numerous hair
                        services.
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsGrid className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Secure payment gateway for seamless transactions.
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsBoxSeam className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Promotional tools to offer discounts and special deals.
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsCashStack className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Fast and seamless withdrawals.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleSignUp}
                    className="inline-flex items-center hover:bg-white hover:text-gray-900 bg-gray-900 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition"
                  >
                    <span>Start earning now!</span>
                    <BsArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="font-jak bg-gradient-to-t from-gray-100 to-transparent p-4 py-12">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex items-center justify-center text-center mb-6">
            <div className="xl:w-10/12">
              <h2 className="font-alt text-5xl font-normal text-gray-800 tracking-tight mb-0">
                Lots of barbing entrepreneurs use DIMP for their business.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-4 md:p-5 sm:p-3 rounded-lg mb-3 shadow"
              >
                <p className="mb-2 leading-6">{review.text}</p>
                <div>
                  <span className="text-lg text-gray-800 font-normal">
                    {review.name}
                  </span>
                  <div className="text-yellow-400 flex space-x-1 leading-6 text-xl">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="font-jak mx-4 lg:mx-16 my-4 lg:mt-20">
        <div className="bg-[#7d26e9] py-12 px-6 lg:py-40 lg:px-20 lg:mx-20 rounded-3xl text-center">
          <div>
            <h2 className="text-4xl font-light text-white tracking-tight mb-4">
              Your barbing business just got way more easier.
            </h2>
            <p className="text-white text-lg mb-6">
              Get a website. Get booked. Increase sales. Delight customers.
            </p>
            <button
              onClick={handleSignUp}
              className="bg-white text-primary hover:bg-purple-100 rounded-lg px-6 py-4 text-lg font-normal"
            >
              Get Started For Free
            </button>
          </div>
        </div>
      </section>
      {/* <a
        href="#"
        className="fixed right-10 bottom-14 z-50 bg-primary3 font-jak text-white rounded-full py-3 px-6 flex items-center"
      >
        Watch Demo{" "}
        <span className="ml-2">
          <FaPlayCircle size={20} />
        </span>
      </a> */}

      <section className="font-jak px-4 py-12 lg:px-12 lg:py-18 bg-white">
        <div className="">
          <div className="flex items-center justify-center text-center mb-6">
            <div className="w-full max-w-2xl">
              <h2 className="alt-font text-5xl font-light text-dark tracking-tight mb-0">
                Frequently asked questions
              </h2>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="container mx-auto">
              <div className="space-y-4">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          What is the purpose of your ecosystem management
                          platform?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        Our platform is designed to help professional barbers
                        manage their online presence, client interactions, and
                        business growth efficiently. It integrates tools for
                        website building, a booking module, payment management,
                        and more, all in one place.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          How can your platform help me build a professional
                          website?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        Our intuitive website builder, along with customizable
                        no-code templates, allows you to create a polished and
                        professional website quickly. You can showcase your
                        services, expertise, and achievements to attract
                        potential clients.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          Can I customize the templates to fit my brand?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        Yes, our no-code templates are highly customizable. You
                        can tailor the content, layout, and features to match
                        your brand’s identity and specific needs, ensuring a
                        consistent and professional look.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          How does the booking feature benefit my barbershop?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        The booking feature allows your clients to easily
                        schedule appointments online, reducing no-shows and
                        double bookings. It automates appointment management,
                        sends reminders, and helps you maintain a full schedule,
                        which leads to higher efficiency and customer
                        satisfaction.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          What kind of payment methods does your platform
                          support?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        Our platform supports a variety of payment methods,
                        including credit/debit cards, Flutterwave, Paystack, and
                        other popular online payment systems. This flexibility
                        ensures a convenient and secure transaction experience
                        for your clients.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          What kind of support do you offer?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        We offer continuous support to our users. Whether you
                        need technical assistance or business advice, our
                        dedicated support team is here to help you succeed and
                        make the most of our platform.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          How can I get started with your platform?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        Getting started is easy! Simply click "Get Started for
                        free" below, choose the plan that best fits your needs,
                        and begin exploring the features. Our user-friendly
                        interface and comprehensive onboarding resources will
                        guide you through the setup process.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterWithLinks />
    </div>
  );
};

export default BarberLanding;
