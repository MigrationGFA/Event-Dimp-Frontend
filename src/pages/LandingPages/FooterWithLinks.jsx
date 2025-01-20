// import node module libraries
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// import media files
import FooterLogo from "./images/DIMPwhitelogo.png";
const FooterWithLinks = () => {
  return (
    <Fragment>
      <footer className="pt-10 px-4 bg-gray-900 text-white">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 mb-8">
              {/* about company */}
              <div className="mb-4">
                <img src={FooterLogo} alt="" className="h-8" />
                <div className="mt-4">
                  <p>
                    DIMP is an ecosystem management platform that provides
                    essential internet infrastructure for commerce, offering
                    trusted tools to start, scale, market, and run a
                    service-based business of any size.
                  </p>
                  {/* social media */}
                  <div className="flex space-x-4 text-xl mt-4">
                    <Link
                      to="https://www.linkedin.com/company/gfa-technologies/mycompany/"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      to="https://www.facebook.com/getfundedafricaoffical/"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      to="https://x.com/gfunded_africa"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      to="https://www.instagram.com/gfatechnologies/"
                      className="text-gray-400 hover:text-white"
                    >
                      <FaInstagram />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/12 mb-8">
              <h6 className="mb-2 text-gray-400">COMPANY</h6>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="https://gfa-tech.com/company/about/index.html"
                    className="text-gray-400 hover:text-white"
                  >
                    About GFA-Tech
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-gray-400 hover:text-white"
                  >
                    DIMP Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://media.getfundedafrica.com/"
                    className="text-gray-400 hover:text-white"
                  >
                    Our Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://gfa-tech.com/company/team/index.html"
                    className="text-gray-400 hover:text-white"
                  >
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://gfa-tech.com/company/career/index.html"
                    className="text-gray-400 hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full lg:w-2/12 mb-8">
              <h6 className="mb-2 text-gray-400">SUPPORT</h6>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    DIMP Ecosystem School
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Developer Program
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Builder Program
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-400 hover:text-white">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full lg:w-4/12 mb-8">
              {/* contact info */}
              <div className="mb-4">
                <h6 className="mb-2 text-gray-400">GET IN TOUCH</h6>
                <p>
                  2nd Floor, Wing-C, <br /> Ogun Tech Hub, Abeokuta
                </p>
                <p className="mb-1">
                  Email:{" "}
                  <Link
                    to="mailto:info@dimpified.com"
                    className="text-white hover:text-gray-400"
                  >
                    info@dimpified.com
                  </Link>
                </p>
                <p>
                  Phone:{" "}
                  <span className="text-white font-semibold">
                    +234 70 8916 7952
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 py-4 mt-6 flex justify-between items-center">
            <span>© 2024 GFA-Technologies. All Rights Reserved</span>
            <div>
              <nav className="space-x-4">
                <Link
                  className="text-gray-400 hover:text-white"
                  to="https://gfa-tech.com/company/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default FooterWithLinks;
