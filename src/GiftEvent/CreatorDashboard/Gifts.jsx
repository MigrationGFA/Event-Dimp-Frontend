import React from 'react'
import CreatorDashboardLayout from '../../layout/Creator/CreatorDashboardLayout';
import { Heading, Text } from "../../component/Text";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import GiftsSummary from '../../component/dashboard/Gifts/GiftsSummary';
import GiftsHistory from '../../component/dashboard/Gifts/GiftsHistory';

const Gifts = () => {
  return (
    <CreatorDashboardLayout>
        <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
        Gifts
        </Heading>
       

        <img
          src={EditTemplateImage}
          alt=""
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>

      <div className='mt-10 mx-4 lg:mx-0'>
        <GiftsSummary/>
        <GiftsHistory />
      </div>
    </CreatorDashboardLayout>
  )
}

export default Gifts;