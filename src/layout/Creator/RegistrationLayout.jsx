import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/DIMP logo colored.png";
import PersonLogoBlack from "../../assets/personal-logo.svg";
import PersonLogoWhite from "../../assets/personal-logo.svg";
import TemplateLogoBlack from "../../assets/template-selection-logo-black.svg";
import TemplateLogoWhite from "../../assets/template-selection-logo-white.svg";
import SubscriptionLogoBlack from "../../assets/subscription-logo.svg";
import SubscriptionLogoWhite from "../../assets/subscription-logo-white.svg";
import DashboardLogoBlack from "../../assets/dashboard-logo.svg";
import DashboardLogoWhite from "../../assets/dashboard-logo-white.svg";
import { Text, Heading } from "../../component/Text";

const steps = [
  {
    label: "Personal/Business Details",
    link: "/auth/personal-Information",
    description: "Please provide your personal and business information.",
    icon: { active: PersonLogoWhite, inactive: PersonLogoBlack },
  },
  {
    label: "Select Website Design",
    link: "/auth/select-website-design",
    description: "Select and preview your preferred template.",
    icon: { active: TemplateLogoWhite, inactive: TemplateLogoBlack },
  },
  {
    label: "Subscription",
    link: "/auth/subscription",
    description: "Compare and choose your preferred plan.",
    icon: { active: SubscriptionLogoWhite, inactive: SubscriptionLogoBlack },
  },
  {
    label: "Dashboard",
    link: "/dashboard",
    description: "View your dashboard.",
    icon: { active: DashboardLogoWhite, inactive: DashboardLogoBlack },
  },
];

const RegistrationLayout = ({ children }) => {
  const location = useLocation();

  // Get the active step index based on the current location, defaulting to 0 if not found
  const activeStepIndex = steps.findIndex(
    (step) => step.link === location.pathname
  );

  // Ensure activeStepIndex is always at least 0
  const effectiveActiveStepIndex = activeStepIndex === -1 ? 0 : activeStepIndex;

  return (
    <div className="flex flex-col lg:flex-row bg-primary1 overflow-hidden p-0">
      <div className="hidden lg:flex flex-col w-full lg:w-2/12 p-5 bg-primary1 relative border-r-2 border-primary3/20">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-24 lg:w-32" />
          </Link>
        </div>

        {/* Step Indicator */}
        <div className="flex flex-col items-start space-y-5">
          {steps.map((step, index) => {
            const isActive = index === effectiveActiveStepIndex;
            const isCompleted =
              index < effectiveActiveStepIndex ||
              (index === 0 && effectiveActiveStepIndex === 0);

            return (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-full border-2 transition-all duration-300 
                    ${isActive || isCompleted ? "bg-primary3" : "bg-white"} 
                    ${
                      isActive || isCompleted
                        ? "border-primary3"
                        : "border-primary6"
                    }`}
                  >
                    <img
                      src={
                        isActive || isCompleted
                          ? step.icon.active
                          : step.icon.inactive
                      }
                      alt={step.label}
                      className="w-3 h-3 lg:w-4 lg:h-4"
                    />
                  </div>

                  {/* Step Connector */}
                  {index < steps.length - 1 && (
                    <div
                      className={`w-2 rounded-[15px] h-12 mt-1 ${
                        isCompleted ? "bg-primary3" : "bg-primary6"
                      } mx-auto`}
                    ></div>
                  )}
                </div>

                {/* Step Label and Description */}
                <div className="ml-4 lg:ml-3 mt-[-10px]">
                  <Heading
                    level={4}
                    size="sm"
                    lineHeight="leading-1"
                    color={isActive || isCompleted ? "primary4" : "primary4"}
                    className="xl:text-[11px] lg:text-[13px] font-semibold"
                  >
                    {step.label}
                  </Heading>
                  <Text
                    size="xs"
                    color="primary5"
                    weight="font-normal"
                    lineHeight="leading-2"
                    className="mt-1 xl:text-[10px] lg:text-[12px]"
                  >
                    {step.description}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-full h-screen flex flex-col">
        <div className="w-full flex-grow ">{children}</div>
      </div>
    </div>
  );
};

export default RegistrationLayout;
