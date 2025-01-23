import React, { useEffect, useState } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import { Heading } from "../../component/Text";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import GiftsSummary from "../../component/dashboard/Gifts/GiftsSummary";
import GiftsHistory from "../../component/dashboard/Gifts/GiftsHistory";
import api from "../../api/DashboardApi";
import { useSelector } from "react-redux";

const Gifts = () => {
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const [giftHistory, setGiftHistory] = useState([]);
  const [giftOverview, setGiftOverview] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGiftData();
  }, [accessToken, refreshToken, ecosystemDomain]);

  const fetchGiftData = async () => {
    setLoading(true);
    try {
      // Fetch both gift history and overview simultaneously
      const [historyResponse, overviewResponse] = await Promise.all([
        api.creatorGiftHistory({ ecosystemDomain, accessToken, refreshToken }),
        api.creatorGiftOverview({ ecosystemDomain, accessToken, refreshToken }),
      ]);
      setGiftHistory(historyResponse?.data || []);
      setGiftOverview(overviewResponse?.data || []);
    } catch (error) {
      console.error("Error fetching gift data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Gifts
        </Heading>
        <img
          src={EditTemplateImage}
          alt="Edit Template"
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>

      <div className="mt-10 mx-4 lg:mx-0">
        <GiftsSummary giftOverview={giftOverview}/>
        <GiftsHistory giftHistory={giftHistory} loading={loading} />
      </div>
    </CreatorDashboardLayout>
  );
};

export default Gifts;
