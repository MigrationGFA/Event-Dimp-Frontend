import React, { useState } from "react";
import NavbarLanding from "../LandingPages/NavbarLanding";
import FooterWithLinks from "../LandingPages/FooterWithLinks";
import GradientBG from "../LandingPages/images/gradient-bg.png"

const skillCategories = [
  {
    title: "Personal Care Services",
    iconClass: "icon-ca",
    skills: [
      "Hair Salon",
      "Barber Shop",
      "Nail Salon",
      "Massage Therapy",
      "Spa and Wellness Center",
      "Skincare Clinic",
      "Makeup Artist Services",
      "Personal Training and Fitness Coaching",
      "Yoga and Pilates Studio",
      "Weight Loss and Nutrition Counseling",
      "Chiropractic Services",
      "Mental Health Counseling",
      "Tattoo and Piercing Studio",
      "Aromatherapy Services",
      "Dental Hygiene Services",
      "Reflexology Services",
      "Life Coaching",
      "Eyelash Extension Services",
      "Cosmetic Dentistry",
      "Personal Stylist and Image Consulting",
    ],
  },
  {
    title: "Trade Services",
    iconClass: "icon-government",
    skills: [
      "Plumbing Services",
      "Electrical Services",
      "Carpentry Services",
      "Roofing Services",
      "HVAC Services",
      "Landscaping and Lawn Care",
      "Painting Services",
      "Masonry Services",
      "Flooring Installation",
      "Auto Repair",
      "Welding and Metal Fabrication",
      "Appliance Repair",
      "Locksmith Services",
      "Pest Control Services",
      "Waste Management",
      "Moving Services",
      "Handyman Services",
      "Cleaning Services",
    ],
  },
  {
    title: "Creative Services",
    iconClass: "icon-idea",
    skills: [
      "Graphic Design",
      "Fashion Design",
      "Web Design",
      "Branding Services",
      "UX/UI Design",
      "Photography",
      "Videography",
      "Animation & Illustration",
      "SEO Consulting",
      "Copywriting",
      "Content Creation",
      "Social Media Management",
      "Interior Design",
      "Music Production",
      "Voiceover Services",
      "Podcast Production",
    ],
  },
  {
    title: "Event Services",
    iconClass: "icon-fu",
    skills: [
      "Event Planning",
      "Wedding Planning",
      "Catering Services",
      "DJ Services",
      "Live Band Services",
      "Photography Services",
      "Videography Services",
      "Florist Services",
      "Event Rentals",
      "Lighting and Sound Services",
      "Event Coordination",
      "Bartending Services",
      "Security Services",
      "Decoration Services",
    ],
  },
  {
    title: "Educational Services",
    iconClass: "icon-idea",
    skills: [
      "Tutoring",
      "Test Preparation",
      "Language Lessons",
      "Music Lessons",
      "Art Lessons",
      "Dance Lessons",
      "Cooking Classes",
      "Coding Bootcamps",
      "Corporate Training",
      "Public Speaking Coaching",
      "STEM Education",
      "College Admissions Counseling",
      "Career Coaching",
      "Online Courses",
    ],
  },
  {
    title: "Technology Services",
    iconClass: "icon-fu",
    skills: [
      "Software Development",
      "IT Support",
      "Cloud Computing",
      "Data Analytics",
      "Cybersecurity Services",
      "Database Management",
      "Web Development",
      "Mobile App Development",
      "Digital Marketing",
      "Technical Writing",
      "ERP Solutions",
      "AI and Machine Learning",
    ],
  },
];

const SkillCategories = () => {
  const [viewMore, setViewMore] = useState(
    Array(skillCategories.length).fill(false)
  );

  const toggleViewMore = (index) => {
    setViewMore((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="font-sen">
      <NavbarLanding />
      <section
        className="py-24 font-jak px-0 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${GradientBG})` }}
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-col md:flex-row items-center h-full">
            <div className="md:w-7/12 px-3 flex flex-col justify-center h-full">
              <h1 className="lg:text-5xl text-[3rem] text-dark font-normal leading-tight my-6">
                <span className="font-bold bg-gradient-to-r from-[#183fb9] via-[#4f41df] via-[#ae2eb9] via-[#ef3f59] to-[#e9522d] text-transparent bg-clip-text">
                  Use Cases
                </span>
              </h1>
              <p className="text-lg  text-dark leading-relaxed mb-8 w-4/5">
                Explore the different use cases of DIMP we are currently working
                on
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="ts-event-outcome py-12">
        <div className="flex flex-col h-full lg:px-24 px-4">
          <div className="flex flex-wrap justify-center">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/4 p-4 transition-all duration-300"
              >
                <div className="single-intro-text bg-white shadow-lg rounded-lg p-6 mb-6">
                  <i className={`icon ${category.iconClass} mb-4 text-2xl`}></i>
                  <h6 className="text-lg font-semibold mb-4">
                    {category.title}
                  </h6>
                  {category.skills
                    .slice(0, viewMore[index] ? category.skills.length : 4)
                    .map((skill, i) => (
                      <p key={i} className="text-gray-600">
                        {skill}
                      </p>
                    ))}
                  <button
                    className="mt-4 text-yellow-500 font-bold text-[12px]"
                    onClick={() => toggleViewMore(index)}
                  >
                    {viewMore[index] ? "VIEW LESS" : "VIEW MORE"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FooterWithLinks />
    </div>
  );
};

export default SkillCategories;
