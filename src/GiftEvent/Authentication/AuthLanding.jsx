import React from "react";
import { Link } from "react-router-dom";
import illustration from "../../assets/Group.svg";
import logo from "../../assets/DIMP logo colored.png";
import EventIndividual from "../../assets/eventIndividual.svg";
import EventPlanner from "../../assets/eventPlanner.svg";

const AccountTypeSelection = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen font-body">
      {/* Left Side - Account Selection Section */}
      <div className="md:w-2/3 flex flex-col items-center justify-center bg-white px-8 py-6">
        {/* Content */}
        <div className="max-w-md w-full text-center md:text-left">
          {/* Logo */}
          <div className="mb-6 flex justify-center md:justify-start">
            <img
              src={logo}
              alt="DIMP Logo"
              className="w-28 mb-2"
              loading="lazy"
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Choose Account Type
          </h2>
          <p className="text-primary4 text-sm md:text-base mb-8">
            Please choose the type of account you want to create.
          </p>

          <div>
            {/* Individual Account Card */}
            <Link
              to="/auth/personal-Information"
              className="flex flex-col sm:flex-row items-center bg-primary1 border border-sec1 rounded-lg shadow-sm p-6 mb-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon Section */}
              <div className="flex items-center justify-center w-full sm:w-32 h-16 bg-primary1 rounded-lg mb-4 sm:mb-0 sm:mr-4 border border-primary3">
                <img
                  src={EventIndividual}
                  alt="Individual Icon"
                  className="w-20 h-12"
                />
              </div>
              {/* Text Section */}
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-primary4 mb-2">
                  Individual Account
                </h3>
                <p className="text-ter11 text-sm">
                  This account is for individuals who want to create single or
                  one-time events.
                </p>
              </div>
            </Link>

            {/* Event Planner Account Card */}
            <Link
              to="/auth/personal-Information"
              className="flex flex-col sm:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon Section */}
              <div className="flex items-center justify-center w-full sm:w-32 h-16 bg-primary3 rounded-lg mb-4 sm:mb-0 sm:mr-4">
                <img src={EventPlanner} alt="Planner Icon" className="w-20 h-12" />
              </div>
              {/* Text Section */}
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-semibold text-primary mb-2">
                  Event Planner Account
                </h3>
                <p className="text-ter11 text-sm">
                  This account is for businesses that manage multiple events at
                  a time.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="hidden md:flex md:w-1/3 items-center justify-center bg-purple-50 p-6">
        <img
          src={illustration}
          alt="Illustration"
          className="max-w-full w-3/4 md:w-full"
        />
      </div>
    </div>
  );
};

export default AccountTypeSelection;
