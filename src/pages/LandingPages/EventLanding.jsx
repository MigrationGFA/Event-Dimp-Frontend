// import node module libraries
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Typewriter } from "react-simple-typewriter";

import { Link } from "react-router-dom";
import {
  BsGrid,
  BsCalendar2Check,
  BsArrowRight,
  BsLayers,
  BsBoxSeam,
  BsCashStack,
  BsCashCoin,
  BsBarChart,
  BsCreditCard,
  BsArrowDownCircle,
  BsBank,
  BsWallet,
  BsBell,
} from "react-icons/bs";

import {
  FaArrowRight,
  FaUserCheck,
  FaEnvelope,
  FaGift,
  FaTicketAlt,
  FaRocket,
  FaPalette,
  FaTools,
  FaClipboardCheck,
  FaUsers,
  FaLaptop,
  FaWallet,
} from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

import NavbarLanding from "./NavbarLanding";
import FooterWithLinks from "./FooterWithLinks";

import Eventtemp from "./images/event-temp.png";
import EventDash from "./images/dashboard.png";
import Attendee from "./images/attendees.png";
import Wallet from "./images/wallet.png";
import Blush1 from "./images/top-blush.png";
import Blush2 from "./images/down-blush.png";
import HeroBg from "./images/cover-hero.jpg";
import CoverR from "./images/cover-review.jpg";
const testimonials = [
  {
    image: "https://gfa-tech.com/dimp-template-images/barber/instructor3.jpg",
    feedback:
      "The platform made it incredibly easy to organize my wedding. From managing RSVPs to receiving monetary gifts, everything was seamless. It saved me so much stress!",
    name: "Chinwe Okeke",
    position: "Bride - Lagos, Nigeria",
  },
  {
    image:
      "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber12.jpg",
    feedback:
      "I used this platform to create an event page for my tech workshop, and the response was overwhelming! The ticketing system and attendee management were game-changers.",
    name: "Tobi Adekunle",
    position: "Tech Event Organizer - Abuja, Nigeria",
  },
  {
    image: "https://gfa-tech.com/dimp-template-images/barber/instructor2.jpg",
    feedback:
      "I was able to create a stunning event page for my daughter's first birthday. The platform allowed guests to RSVP and even send gifts ahead of the party. Highly recommend it!",
    name: "Bola Olatunji",
    position: "Parent - Ibadan, Nigeria",
  },

  {
    image: "https://gfa-tech.com/dimp-template-images/barber/instructor1.jpg",
    feedback:
      "As a small business owner, I used this platform to host a product launch event. The RSVP tracking and ticketing features helped me plan effectively and attract more attendees.",
    name: "Lekan Adeyemi",
    position: "Entrepreneur - Ibadan, Nigeria",
  },
  {
    image: "https://gfa-tech.com/dimp-template-images/barber/instructor4.jpg",
    feedback:
      "Planning my annual charity event was a breeze with this platform. The ability to manage attendees, track donations, and customize the event page made a huge difference!",
    name: "Emeka Obi",
    position: "Non-Profit Organizer - Enugu, Nigeria",
  },
];

const servicesData = [
  {
    title: "Gift Events",
    description:
      "These are events where attendees customarily offer monetary gifts to organizers. Examples include Weddings, Birthdays, Anniversaries, etc.",
    icon: <FaGift className="text-yellow-500 text-4xl" />, // Adjust styles as needed
    bg: "bg-yellow-100",
  },
  {
    title: "Tickets Event",
    description:
      "Organizers set their own prices for gate tickets, allowing attendees to access the event and its perks. Examples include Concerts, Dinner or House parties, Tech events, etc.",
    icon: <FaTicketAlt className="text-purple-500 text-4xl" />, // Adjust styles as needed
    bg: "bg-purple-100",
  },
  // {
  //   title: "Get a dashboard to manage attendees, tickets and gifts.",
  //   description:
  //     "Attract new customers, retain and move existing customers online",
  //   icon: "https://craftohtml.themezaa.com/images/demo-beauty-salon-icon-05.png",
  //   bg: "bg-blue-100",
  // },
  // {
  //   title: "Sit back and watch the magic happens",
  //   description:
  //     "Get bookings, increase sales and get paid through our fast payment gateways",
  //   icon: "https://craftohtml.themezaa.com/images/demo-beauty-salon-icon-03.png",
  //   bg: "bg-green-100",
  // },
];

const EventLanding = () => {
  useEffect(() => {
    document.body.className = "bg-white";
  }, []);
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="font-sen">
      <div>
        {" "}
        <NavbarLanding />
        <section className="pt-48 pb-12 font-jak px-0 relative bg-cover bg-center">
          <div>
            <img
              src={Blush1}
              alt=""
              className="absolute top-0 right-0 opacity-30"
            />
          </div>
          <div className="flex flex-col h-full py-4 lg:py-8 px-4 lg:px-32">
            {/* Heading and Description */}
            <div className="flex justify-center mb-4">
              <div className="w-full lg:w-8/12 text-center">
                <h1 className="text-4xl lg:text-4xl sm:text-[32px] font-bold mb-6 text-primary">
                  <span className="text-dark">
                    You organize the events, we provide the tools to
                  </span>
                  <br />
                  <span className="font-bold bg-gradient-to-r from-[#183fb9] via-[#4f41df] via-[#ae2eb9] via-[#ef3f59] to-[#e9522d] text-transparent bg-clip-text">
                    efficiently manage them.
                  </span>
                </h1>
                <p className="mb-4 text-lg sm:text-base text-dark">
                  Events by Dimpified provides the platform to efficiently
                  create and manage event websites, organize your attendees,
                  gifts or tickets.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center md:flex-row sm:flex-col  gap-4">
              <Link
                to="/auth/personal-information"
                className="btn hover:bg-gradient-to-l from-[#183fb9] via-[#4f41df] via-[#ae2eb9] via-[#ef3f59] to-[#e9522d] bg-gradient-to-r from-[#183fb9] via-[#4f41df] via-[#ae2eb9] via-[#ef3f59] to-[#e9522d] text-white py-4 lg:px-8 px-6 rounded-full flex items-center justify-between hover:bg-white transition"
              >
                <span className="mr-3">Get started for free</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
          <div>
            <img
              src={Blush2}
              alt=""
              className="absolute top-0 left-0 opacity-30"
            />
          </div>
        </section>
        <section className="lg:pt-12 lg:pb-16">
          <div className="container-fluid mx-auto">
            <div className="relative">
              <Swiper
                slidesPerView={2}
                spaceBetween={10}
                centeredSlides={true}
                speed={4000}
                loop={true}
                allowTouchMove={true}
                modules={[Autoplay]}
                autoplay={{ delay: 1 }}
                breakpoints={{
                  1200: { slidesPerView: 6 },
                  992: { slidesPerView: 4 },
                  768: { slidesPerView: 2 },
                  575: { slidesPerView: 2 },
                  0: { slidesPerView: 2 },
                }}
                className="marquee-slide"
              >
                <SwiperSlide>
                  <img
                    className="w-full h-[250px] rounded-xl relative"
                    src="https://linhnga.vn/wp-content/uploads/2022/08/Jumping-the-Broom.png"
                    alt=""
                  />
                  <div className="absolute top-52 left-4 ">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      Weddings
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-[120px] rounded-xl relative"
                    src="https://5.imimg.com/data5/MQ/DP/MY-36899619/dj-setup.jpg"
                    alt=""
                  />
                  <div className="absolute top-20 left-4 ">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      DJ Events
                    </p>
                  </div>
                  <img
                    className="w-full h-[120px] rounded-xl relative mt-2"
                    src="https://media.premiumtimesng.com/wp-content/files/2023/04/image1_1.jpeg"
                    alt=""
                  />
                  <div className="absolute top-52 left-4 ">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      Concerts
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-[250px] rounded-xl relative"
                    src="https://as2.ftcdn.net/jpg/02/50/12/41/1000_F_250124126_u7qxLLjcoIQcKE6AXrgXf7FjWT2kwUth.jpg"
                    alt=""
                  />
                  <div className="absolute top-52 left-4 ">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      Birthdays
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-[120px] rounded-xl relative"
                    src="https://cimages.timbu.com/guides/2019/11/turn-it-up-image-2.jpg"
                    alt=""
                  />
                  <div className="absolute top-20 left-4 ">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      Dinner Parties
                    </p>
                  </div>
                  <img
                    className="w-full h-[120px] rounded-xl relative mt-2"
                    src="https://niteout.ng/wp-content/uploads/2022/11/img_1513.jpg"
                    alt=""
                  />
                  <div className="absolute top-52 left-4 ">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      House Parties
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-[250px] rounded-xl relative"
                    src="https://static.wixstatic.com/media/8e76c0_23e9eb755407484fa8ca7646338e8baa~mv2.jpg/v1/crop/x_120,y_0,w_720,h_720/fill/w_544,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Grand%20Ballroom%20attendees.jpg"
                    alt=""
                  />
                  <div className="absolute top-52 left-4 ">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      Conferences
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-[120px] rounded-xl relative"
                    src="https://cdn.stayhappening.com/events7/banners/84130a818bd281a2eb875b74b33fd303d5e4a5723b4a3cb01e3ed0937737328b-rimg-w960-h537-gmir.jpg?v=1685349675"
                    alt=""
                  />
                  <div className="absolute top-20 left-4">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      Tech Events
                    </p>
                  </div>
                  <img
                    className="w-full h-[120px] rounded-xl relative mt-2"
                    src="https://www.brightidea.com/wp-content/uploads/Who_Participates_in_a_Hackathon.png"
                    alt=""
                  />
                  <div className="absolute top-52 left-4 ">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      Hackathons
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-[250px] rounded-xl relative"
                    src="https://www.7eventzz.com/productsicon/74870f8941b4ae5bc77a9740fad112861715598162.jpg"
                    alt=""
                  />
                  <div className="absolute top-52 left-4 ">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      Anniversaries
                    </p>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    className="w-full h-[120px] rounded-xl relative"
                    src="https://s3.amazonaws.com/a.storyblok.com/f/116532/1440x1440/1ebc56dc83/raspoutine-los-angeles.webp"
                    alt=""
                  />
                  <div className="absolute top-20 left-4 ">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      Clubs
                    </p>
                  </div>
                  <img
                    className="w-full h-[120px] rounded-xl relative mt-2"
                    src="https://cdn.ghanaweb.com/imagelib/pics/245/24530369.jpg"
                    alt=""
                  />
                  <div className="absolute top-52 left-4 ">
                    <p className="text-white text-sm md:text-sm font-normal  bg-black bg-opacity-40 rounded-full px-4 py-1">
                      Live Band
                    </p>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>
      </div>

      <section
        id="down-section"
        className=" m-4 lg:mt-12 lg:mx-16  rounded-3xl py-10 px-6 lg:py-24 font-sen text-dark  lg:px-32 bg-gray-50"
      >
        <div className="flex flex-col h-full  ">
          <div className="flex flex-wrap items-center justify-center mb-5 text-center md:text-center">
            <div className="">
              <h3 className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-4xl font-medium mb-1 tracking-tighter">
                What kind of event are you planing to organize?
              </h3>
            </div>
            <div className="xl:w-7/12 lg:w-7/12 md:w-10/12 ">
              {" "}
              <p className="text-sm ">
                We understand different event requires different management
                approaches. That's why we carefully segment them into two major
                categories based on client needs.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-end sm:justify-center mb-5 mt-5 text-center md:text-start">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {servicesData.map((service, index) => (
                <div
                  key={index}
                  className={`feature-box rounded-lg px-6 py-6 lg:p-12 text-start ${service.bg}`}
                >
                  <div className="feature-box flex items-start mb-4">
                    {/* Icon */}
                    <div className="feature-box-icon mr-4">
                      {service.icon}
                      {/* Adjust size and color as needed */}
                    </div>

                    {/* Content */}
                    <div className="feature-box-content">
                      <span className="block text-lg font-semibold text-gray-800 mb-2">
                        {service.title}
                      </span>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="down-section"
        className="border-b text-dark py-8 lg:py-10 px-4 lg:px-16 bg-cover"
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start">
            <div className="xl:w-5/12 lg:w-6/12 md:w-10/12 mb-4">
              <h3 className="bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-4xl font-medium mb-1 tracking-tighter">
                How does the platform work?
              </h3>
            </div>
            <div className="xl:w-5/12 lg:w-6/12 md:w-10/12 xl:ml-auto">
              <p className="w-11/12 md:w-4/5 mx-auto md:mx-0">
                We streamlined event management in 4 easy to understand
                processes; everything from user selecting type to website
                acquisition, attendee, gift or ticket management and wallet
                withdrawals
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 relative lg:mt-16">
            {/* Feature Box 1 */}
            <div className="self-start">
              <div className="relative lg:px-8 sm:px-4">
                <h1 className="absolute top-[-4rem] left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                  01
                </h1>
                <div className="pt-16 sm:pt-10">
                  <span className="block text-xl font-normal mb-2">
                    Choose a user type
                  </span>
                  <p className="mb-2">
                    Our platform is built for both event planners and
                    individuals.
                  </p>
                  <span className="block w-16 h-0.5 bg-gray-800"></span>
                </div>
              </div>
            </div>

            {/* Feature Box 2 */}
            <div className="self-end mt-10 lg:mt-0">
              <div className="relative lg:px-8 sm:px-4">
                <h1 className="absolute top-[-4rem] left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                  02
                </h1>
                <div className="pt-16 sm:pt-10">
                  <span className="block text-xl font-normal mb-2">
                    Get a customized event website
                  </span>
                  <p className="mb-2">
                    Select from a wide range of websites templates tailored to
                    your event
                  </p>
                  <span className="block w-16 h-0.5 bg-gray-800"></span>
                </div>
              </div>
            </div>

            {/* Feature Box 3 */}
            <div className="self-start">
              <div className="relative lg:px-8 sm:px-4">
                <h1 className="absolute top-[-4rem] left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                  03
                </h1>
                <div className="pt-16 sm:pt-10">
                  <span className="block text-xl font-normal mb-2">
                    Manage attendees, gift or tickets
                  </span>
                  <p className="mb-2">
                    Organized system to manage attendees, issue invitations and
                    accept giftor ticket sales.
                  </p>
                  <span className="block w-16 h-0.5 bg-gray-800"></span>
                </div>
              </div>
            </div>

            {/* Feature Box 4 */}
            <div className="self-end mt-10">
              <div className="relative lg:px-8 sm:px-4">
                <h1 className="absolute top-[-4rem] left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                  04
                </h1>
                <div className="pt-16 sm:pt-10">
                  <span className="block text-xl font-normal mb-2">
                    Withdraw your earnings anytime
                  </span>
                  <p className="mb-2">
                    Get a wallet linked to your bank and get paid with our fluid
                    payment gateways.
                  </p>
                  <span className="block w-16 h-0.5 bg-gray-800"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="font-jak z-10">
        <div className="flex flex-col h-full py-4 px-4 lg:px-20">
          <div className="bg-white rounded-3xl py-10 lg:py-16">
            <div className="relative h-full">
              <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                {/* Image Section */}
                <div className="order-1 lg:order-1 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                  <img
                    src={Eventtemp}
                    className="w-full rounded-xl flex justify-center items-center"
                    alt="Online Booking and Invoicing"
                  />
                </div>
                {/* Content Section */}
                <div className="order-2 lg:order-2 xl:ml-4 lg:w-6/12 lg:px-16">
                  <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gray-100 rounded-full">
                    Get a website
                  </span>
                  <h1 className="font-normal text-4xl text-dark mb-3">
                    Create a fast and customizable website for your event
                  </h1>
                  <p className="text-md text-dark mb-4 leading-relaxed">
                    Simplify your event planning process with a platform
                    designed for event. From customizable templates to RSVP
                    tracking, we’ve got you covered!
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Feature 1: Fast Setup */}
                    <div className="flex items-center">
                      <div className="bg-green-50 p-3 rounded-full flex justify-center items-center">
                        <FaRocket className="text-green-400" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Launch your event site in minutes with no technical
                        skills needed.
                      </span>
                    </div>
                    {/* Feature 2: Event Templates */}
                    <div className="flex items-center">
                      <div className="bg-blue-50 p-3 rounded-full flex justify-center items-center">
                        <FaPalette className="text-blue-400" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Choose from professionally designed event templates.
                      </span>
                    </div>
                    {/* Feature 3: User-Friendly Customization */}
                    <div className="flex items-center">
                      <div className="bg-yellow-50 p-3 rounded-full flex justify-center items-center">
                        <FaTools className="text-yellow-400" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Easily edit and personalize content with our
                        type-to-edit builder.
                      </span>
                    </div>
                    {/* Feature 4: Embedded RSVP */}
                    <div className="flex items-center">
                      <div className="bg-red-50 p-3 rounded-full flex justify-center items-center">
                        <FaClipboardCheck className="text-red-400" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Share a custom website link with built-in RSVP tracking.
                      </span>
                    </div>
                  </div>
                  {/* Call-to-Action */}
                  <Link
                    to="/auth/personal-information"
                    target="_blank"
                    className="inline-flex items-center hover:bg-white hover:text-gray-900 bg-gray-900 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition"
                  >
                    <span>Create your own website!</span>
                    <BsArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="font-jak z-10 ">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24 ">
          <div className="bg-purple-50 rounded-3xl py-10 px-6 lg:py-24">
            <div className="relative h-full">
              <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                <div className="order-1 lg:order-2 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                  <img
                    src={EventDash}
                    className="w-full rounded-xl"
                    alt="Expand Your Sales Streams"
                  />
                </div>
                <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-16">
                  <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-pink-100 rounded-full">
                    Manage your event
                  </span>
                  <h1 className="font-normal text-4xl text-dark mb-3">
                    Get a customized dashboard tailored to your event type
                  </h1>
                  <p className="text-md text-dark mb-4 leading-relaxed">
                    Manage all aspect of your events using a well detailed,
                    easy-to-navigate dashboard.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsLayers className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        General overview section to easily access information
                        about your event
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsGrid className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Customize and edit your website to your satisfaction
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsBoxSeam className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Upgrade your plan to enjoy premium features and tools
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsCashStack className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Easily withdraw your earnings and get paid to your
                        provided account details
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/auth/personal-information"
                    target="_blank"
                    className="inline-flex items-center hover:bg-white hover:text-gray-900 bg-gray-900 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition"
                  >
                    <span>Get started now!</span>
                    <BsArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="font-jak z-10">
        <div className="flex flex-col h-full py-4 px-4 lg:px-20">
          <div className="bg-white rounded-3xl py-10 lg:py-16">
            <div className="relative h-full">
              <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                {/* Image Section */}
                <div className="order-1 lg:order-1 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                  <img
                    src={Attendee}
                    className="w-full rounded-xl flex justify-center items-center"
                    alt="Attendee Management and Ticket Features"
                  />
                </div>
                {/* Content Section */}
                <div className="order-2 lg:order-2 xl:ml-4 lg:w-6/12 lg:px-16">
                  <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gray-100 rounded-full">
                    Attendees & Ticketing
                  </span>
                  <h1 className="font-normal text-4xl text-dark mb-3">
                    Manage attendees, accept monetary gifts, and create ticket
                    plans
                  </h1>
                  <p className="text-md text-dark mb-4 leading-relaxed">
                    Streamline your event planning process with tools to manage
                    RSVPs, collect payments, and customize ticket options—all in
                    one platform.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Feature 1: Attendee Management */}
                    <div className="flex items-center">
                      <div className="bg-green-50 p-3 rounded-full flex justify-center items-center">
                        <FaUserCheck className="text-green-400" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Seamlessly track and manage attendees with acceptance or
                        decline options.
                      </span>
                    </div>
                    {/* Feature 2: Invitation Generation */}
                    <div className="flex items-center">
                      <div className="bg-blue-50 p-3 rounded-full flex justify-center items-center">
                        <FaEnvelope className="text-blue-400" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Automatically generate and send invitations to accepted
                        attendees.
                      </span>
                    </div>
                    {/* Feature 3: Gift Reception */}
                    <div className="flex items-center">
                      <div className="bg-yellow-50 p-3 rounded-full flex justify-center items-center">
                        <FaGift className="text-yellow-400" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Collect monetary gifts during RSVP to support your
                        event.
                      </span>
                    </div>
                    {/* Feature 4: Ticket Plans */}
                    <div className="flex items-center">
                      <div className="bg-red-50 p-3 rounded-full flex justify-center items-center">
                        <FaTicketAlt className="text-red-400" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Create and customize ticket plans for different event
                        tiers.
                      </span>
                    </div>
                  </div>
                  {/* Call-to-Action */}
                  <Link
                    to="/auth/personal-information"
                    target="_blank"
                    className="inline-flex items-center hover:bg-white hover:text-gray-900 bg-gray-900 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition"
                  >
                    <span>Start managing your event now!</span>
                    <BsArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="font-jak z-10">
        <div className="flex flex-col h-full py-4 px-4 lg:px-24">
          <div className="bg-gray-100 rounded-3xl py-10 px-6 lg:py-24">
            <div className="relative h-full">
              <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                {/* Image Section */}
                <div className="order-1 lg:order-2 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                  <img
                    src={Wallet}
                    className="w-full rounded-xl"
                    alt="Secure Payments and Boost Sales"
                  />
                </div>
                {/* Text Section */}
                <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-16">
                  <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-yellow-50 rounded-full">
                    Get a wallet
                  </span>
                  <h1 className="font-normal text-4xl text-dark mb-3">
                    Manage and access your earnings seamlessly
                  </h1>
                  <p className="text-md text-dark mb-4 leading-relaxed">
                    Easily withdraw your event earnings and monetary gifts
                    anytime. Simplify cash management with tools tailored for
                    event organizers, ensuring seamless payment processes and
                    improved sales.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* Feature 1 */}
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsWallet className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Create a free wallet to securely store earnings
                      </span>
                    </div>
                    {/* Feature 2 */}
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsBank className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Link multiple bank accounts for withdrawals
                      </span>
                    </div>
                    {/* Feature 3 */}
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsArrowDownCircle className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Set withdrawal limits and track transaction history
                      </span>
                    </div>
                    {/* Feature 4 */}
                    <div className="flex items-center">
                      <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                        <BsBell className="text-dark" size={30} />
                      </div>
                      <span className="ml-3 text-dark text-md leading-relaxed">
                        Receive instant notifications for every credit
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/auth/personal-information"
                    target="_blank"
                    className="inline-flex items-center hover:bg-white hover:text-gray-900 bg-gray-900 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition"
                  >
                    <span>Start Managing Your Earnings</span>
                    <BsArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4 lg:mt-20 mt-6">
        <div className="text-center mb-10 ">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent tracking-tighter">
            Loved by our most valuable customers
          </h2>
          <p className="text-gray-600 mt-4">
            See how event planners and individuals use our platform to manage
            events effortlessly.
          </p>
        </div>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1}
          coverflowEffect={{
            rotate: 0,
            stretch: 100,
            depth: 150,
            modifier: 1.5,
            slideShadows: true,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="w-full relative max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="bg-white px-6 py-12  lg:p-12 h-80 justify-center mt-8 rounded-sm shadow-md text-center flex flex-col items-center"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-32 h-32 rounded-full absolute top-4 border-8 border-white shadow-lg -mt-12"
              />
              <p className="mt-6 text-gray-800">{testimonial.feedback}</p>
              <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent mt-4">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-500">{testimonial.position}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="font-jak mx-4 lg:mx-16  lg:my-20 my-6">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 py-12 px-6 lg:py-32 lg:px-20 lg:mx-10 rounded-3xl text-center">
          <div>
            <h2 className="text-4xl font-light text-white tracking-tight mb-4">
              Your events just got a whole lot better!
            </h2>
            <p className="text-white text-lg mb-6">
              Create stunning event pages. Manage attendees. Accept Gift. Sell
              tickets. Make every moment unforgettable.
            </p>
            <Link
              to="/auth/personal-information"
              className="bg-white text-primary hover:bg-gray-800 hover:text-white rounded-lg px-6 py-4 text-lg font-normal"
            >
              Get Started For Free
            </Link>
          </div>
        </div>
      </section>

      <section className="font-jak px-4 py-12 lg:px-12 lg:py-18 bg-white">
        <div className="">
          <div className="flex items-center justify-center text-center mb-6">
            <div className="w-full max-w-2xl">
              <h2 className="alt-font text-4xl font-light text-dark tracking-tight mb-0">
                Frequently Asked Questions
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
                          How can this platform help me plan my event?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        Our platform provides all the tools you need to plan,
                        organize, and manage your events seamlessly. From
                        creating customizable event pages to managing attendees,
                        ticketing, and RSVPs, everything is designed to make
                        your event a success.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          Can I customize the event website to fit my theme?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        Absolutely! Our platform offers fully customizable
                        templates, allowing you to adjust text, and images to
                        match your event theme perfectly. You can also add
                        personalized content like images, videos, and event
                        schedules.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          What features help me manage attendees?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        Our attendee management system allows you to track
                        RSVPs, send personalized invitations, and approve or
                        decline access to your event. You'll have all the tools
                        to ensure a smooth and organized guest experience.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          How does the ticketing feature work?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        With our ticketing feature, you can create and sell
                        tickets directly through your event page. Set different
                        ticket plans, monitor sales, and even offer early-bird
                        discounts—all while managing payments securely.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          Can I receive monetary gifts or donations?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        Yes, our platform allows your attendees to send monetary
                        gifts or make donations directly through your event
                        websites. It's a great feature for weddings,
                        anniversaries, birthdays, and more.
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>

                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                        <h3 className="font-bold text-lg">
                          How do I get started with my event website?
                        </h3>
                        <span className="flex items-center">
                          {open ? "-" : "+"}
                        </span>
                      </DisclosureButton>
                      <DisclosurePanel className="text-gray-500 pb-4">
                        Getting started is simple! Click "Get started for free"
                        to sign up, select a user type, choose a template, and
                        begin customizing your event page. Our platform guides
                        you through every step, so you can have your event up
                        and running in minutes.
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

export default EventLanding;
