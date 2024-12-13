import React, { useState } from "react";
import { Heading, Text } from "../Text";
import Tick from "../../assets/tickicon.svg";
import Cancel from "../../assets/cancelicon.svg";

// Card for individual plans
const PlanCard = ({ title, features }) => {
  return (
    <div className="border rounded-lg p-4">
      <Heading level={3} size="lg" weight="font-semibold" className="mb-2">
        {title}
      </Heading>

      {/* Rendering categories and features */}
      {Object.entries(features).map(([category, categoryFeatures], index) => (
        <div key={index} className="mb-4">
          <Heading
            level={4}
            weight="font-semibold"
            className="mb-2 text-[15px]"
          >
            {category}
          </Heading>
          <ul className="space-y-1">
            {categoryFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center">
                <span className="text-primary7 mr-2">
                  {feature.available ? (
                    <img src={Tick} alt="Available" className="w-4 h-3" />
                  ) : (
                    <img src={Cancel} alt="Not Available" className="w-4 h-3" />
                  )}
                </span>
                <Text size="pS" className="leading-6 text-[12px]">
                  {feature.name}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

// Main Accordion component
const Accordion = ({ proPlan, plusPlan, extraPlan }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Plan data as provided
  const subscriptionPlans = [
    
    
    {
      title: `Plus (#${plusPlan})`,

      features: {
        "Selling Online": [
          { name: "Website Builder", available: true },
          { name: "Add logo to page", available: true },
          { name: "Custom domain (purchased separately)", available: false },
          { name: "Remove DMP branding from landing page", available: true },
          { name: "Up to 4,000 monthly transactions allowed", available: true },
          { name: "4% fee per transaction", available: true },
        ],
        "Payment and Subscription": [
          { name: "Online payment gateway", available: true },
          { name: "DWP Wallet", available: true },
          { name: "Payment Analytics", available: true },
          { name: "Multi-currency module", available: true },
          { name: "Flexible pricing module", available: true },
        ],
        "Features & Integrations": [
          { name: "Appointment booking", available: true },
          { name: "Community & Chat", available: true },
          { name: "Fundraising", available: false },
          { name: "Online learning management solution", available: true },
          { name: "Invoicing & billing", available: true },
          { name: "Up to 3 Admin users", available: true },
          { name: "Customer support ticketing module", available: true },
          { name: "Up to 20,000 customer records", available: true },
          {
            name: "Email(in) App technical support available",
            available: true,
          },
          {
            name: "Professional email (purchased separately)",
            available: false,
          },
        ],
      },
    },
    {
      title: `Pro (#${proPlan})`,

      features: {
        "Selling Online": [
          { name: "Website Builder", available: true },
          { name: "Add logo to page", available: true },
          { name: "Custom domain (purchased separately)", available: false },
          { name: "Remove DMP branding from landing page", available: true },
          {
            name: "Up to 12,000 monthly transactions allowed",
            available: true,
          },
          { name: "3% fee per transaction", available: true },
        ],
        "Payment and Subscription": [
          { name: "Online payment gateway", available: true },
          { name: "DWP Wallet", available: true },
          { name: "Payment Analytics", available: true },
          { name: "Multi-currency module", available: true },
          { name: "Flexible pricing module", available: true },
        ],
        "Features & Integrations": [
          { name: "Appointment booking", available: true },
          { name: "Community & Chat", available: true },
          { name: "Fundraising", available: true },
          { name: "Online learning management solution", available: true },
          { name: "Invoicing & billing", available: true },
          { name: "Up to 4 Admin users", available: true },
          { name: "Customer support ticketing module", available: true },
          { name: "Up to 50,000 customer records", available: true },
          {
            name: "Fast, Priority technical support available",
            available: true,
          },
          {
            name: "Professional email (purchased separately)",
            available: false,
          },
        ],
      },
    },
    {
      title: `Extra (#${extraPlan})`,

      features: {
        "Selling Online": [
          { name: "Website Builder", available: true },
          { name: "Add logo to page", available: true },
          { name: "Custom domain (purchased separately)", available: false },
          { name: "Remove DMP branding from landing page", available: true },
          {
            name: "Up to 50,000 monthly transactions allowed",
            available: true,
          },
          { name: "2% fee per transaction", available: true },
        ],
        "Payment and Subscription": [
          { name: "Online payment gateway", available: true },
          { name: "DWP Wallet", available: true },
          { name: "Payment Analytics", available: true },
          { name: "Multi-currency module", available: true },
          { name: "Flexible pricing module", available: true },
        ],
        "Features & Integrations": [
          { name: "Appointment booking", available: true },
          { name: "Community & Chat", available: true },
          { name: "Fundraising", available: true },
          { name: "Online learning management solution", available: true },
          { name: "Invoicing & billing", available: true },
          { name: "Unlimited Admin users", available: true },
          { name: "Customer support ticketing module", available: true },
          { name: "Up to 100,000 customer records", available: true },
          {
            name: "Accounts Manager + Dedicated WhatsApp support",
            available: true,
          },
          {
            name: "Professional email (purchased separately)",
            available: false,
          },
        ],
      },
    },
  ];

  return (
    <div className="border border-gray-300 rounded-lg mb-60">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={toggleAccordion}
      >
        <Heading level={3} size="lg" weight="font-bold">
          Compare Plan Features
        </Heading>
        <Text size="base">{isOpen ? "▲" : "▼"}</Text>
      </div>

      {isOpen && (
        <div className="p-4 bg-white grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {subscriptionPlans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
