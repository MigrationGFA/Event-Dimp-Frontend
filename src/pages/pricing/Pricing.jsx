import React, { useEffect, useState } from "react";


import PricingStructure from "./PricingStructure";
import Accordion from "../../component/Pricing/Accordion";
import NavbarLanding from "../LandingPages/NavbarLanding";
import FooterWithLinks from "../LandingPages/FooterWithLinks";

import GradientBG from "../LandingPages/images/gradient-bg.png"

const Pricing = () => {
  useEffect(() => {
    document.body.className = "bg-white";
  }, []);
  const [selectedPrices, setSelectedPrices] = useState({
    Lite: "",
    Pro: "",
    Plus: "",
    Extra: "",
  });

  const handlePriceUpdate = (prices) => {
    setSelectedPrices(prices);
  };

  return (
    <div className="font-jak">
      <NavbarLanding />
      <section
        className="py-24 font-jak px-0 relative bg-cover  bg-center"
        style={{ backgroundImage: `url(${GradientBG})` }}
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-col md:flex-row items-center h-full">
            <div className="md:w-1/2 px-3 flex flex-col justify-center h-full">
              <h1 className="lg:text-5xl text-[3rem] text-dark font-normal leading-tight my-6">
                <span className="font-bold bg-gradient-to-r from-[#183fb9] via-[#4f41df] via-[#ae2eb9] via-[#ef3f59] to-[#e9522d] text-transparent bg-clip-text">
                  Subscription
                </span>
              </h1>
              <p className="text-lg  text-dark leading-relaxed mb-8 w-4/5">
                Compare and choose your preffered plan
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="lg:px-24 mx-4 my-24 lg:py-25 font-sen">
          <div className=" h-auto mt-10">
            <div className="mt-10">
              <PricingStructure setPriceInSubscription={handlePriceUpdate} />
            </div>

            <div className="mt-10 ">
              <Accordion
                litePlan={selectedPrices.Lite}
                proPlan={selectedPrices.Pro}
                plusPlan={selectedPrices.Plus}
                extraPlan={selectedPrices.Extra}
              />
            </div>
          </div>
        </div>
      </section>

      <FooterWithLinks />
    </div>
  );
};

export default Pricing;
