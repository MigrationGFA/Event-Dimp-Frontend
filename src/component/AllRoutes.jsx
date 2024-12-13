import { Routes, Route } from "react-router-dom";
import AccountTypeSelection from "../GiftEvent/Authentication/AuthLanding";
import Register from "../GiftEvent/Authentication/Category1/Register";
import Template from "../GiftEvent/Authentication/Catergory2/Template";
import Subscription from "../GiftEvent/Authentication/Catergory3/Subcription";


// creator Dashboard
import Payments from "../GiftEvent/CreatorDashboard/Payments";
import VideoGallery from "../GiftEvent/CreatorDashboard/Watchdemo";
import Notification from "../GiftEvent/CreatorDashboard/Notification";
import UpdateSubscription from "../GiftEvent/CreatorDashboard/UpgradeSubcription";
import Overview from "../GiftEvent/CreatorDashboard/Overview";
import Attendees from "../GiftEvent/CreatorDashboard/Attendees";
import Gifts from "../GiftEvent/CreatorDashboard/Gifts";
import MyWebsites from "../GiftEvent/CreatorDashboard/MyWebsites";
import EditWebsite from "../GiftEvent/CreatorDashboard/EditWebsite";
import CreatorProfile from "../GiftEvent/CreatorDashboard/CreatorProfile";
import HelpCenter from "../GiftEvent/CreatorDashboard/HelpCenter";
import ServiceList from "./MyWebsite/ServiceList";
//import { ProtectedRoute } from "./ProtectedRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountTypeSelection />} />
      <Route path="/auth/personal-Information" element={<Register />} />
      <Route path="/auth/select-website-design" element={<Template />} />
      <Route path="/auth/subscription" element={<Subscription />} />

      {/* Creator Dashboard */}
      <Route path="/creator/dashboard/overview" element={<Overview />} />
      <Route path="/creator/dashboard/attendees" element={<Attendees />} />
      <Route path="/creator/dashboard/wallet" element={<Payments />} />
      <Route path="/creator/dashboard/gifts" element={<Gifts />} />
      <Route path="/creator/dashboard/my-website" element={<MyWebsites />} />
      <Route path="/creator/dashboard/edit-website" element={<EditWebsite />} />
      <Route path="/creator/dashboard/profile" element={<CreatorProfile />} />
      
      <Route
          path="/creator/dashboard/watch-demo"
          element={<VideoGallery />}
        />
         <Route
          path="/creator/dashboard/notification"
          element={<Notification />}
        />
         <Route
          path="/creator/dashboard/help-center"
          element={<HelpCenter />}
        />

         <Route
          path="/creator/dashboard/Subscription"
          element={<UpdateSubscription />}
        />

        {/* sub Routes */}
        <Route
          path="/creator/dashboard/All-website"
          element={<ServiceList />}
        />

    </Routes>
  );
};

export default AllRoutes;
