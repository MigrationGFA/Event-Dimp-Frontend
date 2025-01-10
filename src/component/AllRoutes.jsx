import { Routes, Route } from "react-router-dom";
import AccountTypeSelection from "../GiftEvent/Authentication/AuthLanding";
import Register from "../GiftEvent/Authentication/Category1/Register";
import Template from "../GiftEvent/Authentication/Catergory2/Template";
import Subscription from "../GiftEvent/Authentication/Catergory3/Subcription";
import LoginModal from "./Modal/LoginModal";
import ForgotPassword from "../GiftEvent/Authentication/RegisterUser/ForgetPassword";
import ResetPassword from "../GiftEvent/Authentication/RegisterUser/NewPassword";
import EmailSignIn from "../GiftEvent/Authentication/RegisterUser/EmailLogin";
import VerifyPasswordCode from "../GiftEvent/Authentication/RegisterUser/VerifyPasswordCode";

import BlankTemplate from "../GiftEvent/Templates/Blank-Template/BlankTemplate";

// creator Dashboard general
import GeneralOverview from "../GiftEvent/CreatorDashboard/General/Overviews";
import GeneralBooking from "../GiftEvent/CreatorDashboard/General/Booking";
import EditService from "../GiftEvent/CreatorDashboard/General/EditService";
import CreatedServices from "./dashboard/General/editService/CreatedService";



// creator Dashboard ticket ana gift
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
import Tickets from "../GiftEvent/CreatorDashboard/Tickets";
import TicketsPlan from "../GiftEvent/CreatorDashboard/TicketPlan";
import UserLogin from "../GiftEvent/Authentication/RegisterUser/UserLogin";
import BusinessInfo from "../GiftEvent/Authentication/AuthForNewWebsite/Category1/BusinessInfo";
import NewTemplate from "../GiftEvent/Authentication/AuthForNewWebsite/Catergory2/Template";
import NewSubscription from "../GiftEvent/Authentication/AuthForNewWebsite/Catergory3/Subcription";

//import { ProtectedRoute } from "./ProtectedRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<UserLogin />} />
      <Route path="/login" element={<LoginModal />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/creator/reset-password/:email"
        element={<ResetPassword />}
      />
      <Route path="/creator/Email-Signin" element={<EmailSignIn />} />
      <Route
        path="/creator/PasswordCode-Verification/:email"
        element={<VerifyPasswordCode />}
      />
      <Route path="/auth/selection" element={<AccountTypeSelection />} />
      <Route path="/auth/personal-Information" element={<Register />} />
      <Route path="/auth/select-website-design" element={<Template />} />
      <Route path="/auth/subscription" element={<Subscription />} />


      {/* Creator Auth for new Website*/}
      <Route path="/auth/personal-Information/new" element={<BusinessInfo />} />
      <Route path="/auth/select-website-design/new" element={<NewTemplate />} />
      <Route path="/auth/subscription/new" element={<NewSubscription />} />
      {/* Creator Dashboard General*/}
      <Route path="/creator/dashboard/general-overview" element={<GeneralOverview  />} />
      <Route path="/creator/dashboard/general-booking" element={<GeneralBooking  />} />
      <Route path="/creator/dashboard/general-payment" element={<Payments />} />
      <Route path="/creator/dashboard/general-edit-website" element={<EditWebsite />} />
      <Route path="/creator/dashboard/general-service" element={<EditService />} />
      <Route
          path="/creator/dashboard/create-service"
          element={<CreatedServices />}
        />

    {/* Templates */}
    <Route path="/templates/blank" element={<BlankTemplate />} />

      {/* Creator Dashboard gift and Tickets */}
      <Route path="/creator/dashboard/overview" element={<Overview />} />
      <Route path="/creator/dashboard/attendees" element={<Attendees />} />
      <Route path="/creator/dashboard/gifts" element={<Gifts />} />
      <Route path="/creator/dashboard/tickets" element={<Tickets />} />
      <Route path="/creator/dashboard/my-website" element={<MyWebsites />} />
      <Route path="/creator/dashboard/profile" element={<CreatorProfile />} />
      <Route path="/creator/dashboard/wallet" element={<Payments />} />
      <Route path="/creator/dashboard/edit-website" element={<EditWebsite />} />
      <Route path="/creator/dashboard/tickets-plan" element={<TicketsPlan />} />
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
