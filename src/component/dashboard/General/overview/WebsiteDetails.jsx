import React, { useEffect, useState } from "react";
import ServiceImg from "../../../../assets/WebsiteList.png";
import GalleryImg from "../../../../assets/websiteGallery.png";
import TestiImg from "../../../../assets/WebsiteTestimonial.png";
import PriceImg from "../../../../assets/WebsitePrice.png";
import { Text, Heading } from "../../../../component/Text";
import { ButtonSmallWhite } from "../../../../component/Buttons";
import { Link, useNavigate } from "react-router-dom";
// import api from "../../../api/DashboardApi";
import { useSelector } from "react-redux";




const WebsitesDetails = () => {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [websiteDetails, setWebsiteDetails] = useState(null);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);

  useEffect(() => {
    getWebsiteDetails();
  }, [accessToken, refreshToken, ecosystemDomain]);

  const getWebsiteDetails = async () => {
    try {
      if (!accessToken || !refreshToken) return;

      const response = await api.creatorWebsiteDetails({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setWebsiteDetails(response.data);
    } catch (error) {
      console.error("Could not get website details:", error);
    }
  };

  const handleWebsiteNav = () => {
    navigate("/creator/dashboard/edit-template");
  };

  const websitesData = [
    { title: "Services", count: websiteDetails?.services, icon: ServiceImg, desc: "List", Link: "/creator/dashboard/edit-service" },
    { title: "Gallery", count: websiteDetails?.gallery, icon: GalleryImg, desc: "Images", Link: "/creator/dashboard/edit-template" },
    { title: "Testimonials", count: websiteDetails?.testimonials, icon: TestiImg, desc: "Text", Link: "/creator/dashboard/edit-template" },
    { title: "Prices", count: websiteDetails?.price, icon: PriceImg, desc: "List", Link: "/creator/dashboard/edit-service"},
  ];

   return (
    <div className="p-4 bg-primary1 rounded-lg shadow-lg lg:w-4/12">
      <Heading level={2} size="lg" className="font-semibold">
        Websites Details
      </Heading>
      <a
        href={`https://${ecosystemDomain}.dimpified.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary3 break-words w-full"
      >
        <Text color="blue-600" className="break-words">
          {`https://${ecosystemDomain}.dimpified.com`}
        </Text>
      </a>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-1">
        {websitesData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-1 rounded-lg"
          >
            <Link to={item.Link} className="flex items-center space-x-1">
              <div className="bg-ter10 w-10 h-10 flex rounded-md justify-center">
                <img src={item.icon} alt={item.title} className="w-8" />
              </div>
              <div>
                <Text weight="font-medium">{item.title}</Text>
                <Text>{item.desc}</Text>
              </div>
            </Link>
            <span className="text-lg font-bold">{item.count}</span>
          </div>
        ))}
      </div>
      <ButtonSmallWhite className="mt-4 w-full " onClick={handleWebsiteNav}>
        Edit Website
      </ButtonSmallWhite>
    </div>
  );
};

export default WebsitesDetails;
