import AxiosInterceptor from "../component/AxiosInterceptor";

// Define your API endpoints

const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;

const creatorBookingDate = async ({
  ecosystemDomain,
  date,
  accessToken,
  refreshToken,
  // navigate,
  // dispatch
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/bookings-per-date/${ecosystemDomain}/${date}`,
      {}
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/creator/signin");
    } else {
      throw new Error(
        error.response?.data?.message || "Error getting Booking Date"
      );
    }
  }
};

const creatorEarning = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/ecosystem-earnings/${ecosystemDomain}`,
      {}
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/creator/signin");
    } else {
      throw new Error(
        error.response?.data?.message || "Error creating service"
      );
    }
  }
};

const creatorMonthlyBooking = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/booking-stats/${ecosystemDomain}`,
      {}
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/creator/signin");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching monthly booking"
      );
    }
  }
};

const creatorMonthlyIncome = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/income-stats/${ecosystemDomain}`,
      {}
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/creator/signin");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching Monthly Income"
      );
    }
  }
};

const creatorBookingActivities = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/booking-overview/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching Booking Activities"
      );
    }
  }
};

const creatorWithdrawHistory = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/get-withdrawal-requests/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching Withdraw History "
      );
    }
  }
};

const creatorTransactionHistory = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/transaction-history/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching transaction History "
      );
    }
  }
};

const creatorTodaySales = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/daily-successful/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching daily successful transactions"
      );
    }
  }
};

const creatorPaymentCharts = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/total-monthly-sales/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching daily successful transactions"
      );
    }
  }
};

const creatorEcosystemServices = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  dispatch,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(
    accessToken,
    refreshToken,
    dispatch,
    navigate
  );
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/get-all-services/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching daily successful transactions"
      );
    }
  }
};

const creatorAllBanks = async ({ accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(`${PLAIN_API_URL}/get-all-banks`);
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(error.response?.data?.message || "Error  All banks");
    }
  }
};

const creatorVerifyAccount = async ({
  accessToken,
  refreshToken,
  account,
  bankCode,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/verify-bank-details`,
      {
        account,
        bankCode,
      }
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error verifying Account Number"
      );
    }
  }
};

const creatorAddAccount = async ({
  accessToken,
  refreshToken,
  creatorId,
  accountName,
  accountNumber,
  bankName,
  currency,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/save-bank-details`,
      {
        creatorId,
        accountName,
        accountNumber,
        bankName,
        currency,
        ecosystemDomain,
      }
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error verifying Account Number"
      );
    }
  }
};

const creatorAllBankDetails = async ({
  accessToken,
  refreshToken,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/bank-details/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(error.response?.data?.message || "Error  All banks");
    }
  }
};

const creatorWithDraw = async ({
  accessToken,
  refreshToken,
  creatorId,
  accountId,
  amount,
  currency,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/withdrawal-request`,
      {
        creatorId,
        accountId,
        amount,
        currency,
        ecosystemDomain,
      }
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Withdrawing Earning"
      );
    }
  }
};

const creatorEditService = async ({
  accessToken,
  refreshToken,
  serviceId,
  name,
  shortDescription,
  price,
  deliveryTime,
  priceFormat,
  serviceImage,
  subServiceId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.put(`${PLAIN_API_URL}/edit-service`, {
      serviceId,
      name,
      shortDescription,
      price,
      deliveryTime,
      priceFormat,
      serviceImage,
      subServiceId,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Withdrawing Earning"
      );
    }
  }
};
const creatorUpdateProfile = async ({
  accessToken,
  refreshToken,
  fullname,
  dateOfBirth,
  gender,
  phoneNumber,
  localGovernment,
  state,
  country,
  creatorId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.patch(
      `${PLAIN_API_URL}/creator/edit-profile`,
      {
        fullname,
        dateOfBirth,
        gender,
        phoneNumber,
        localGovernment,
        state,
        country,
        creatorId,
      }
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Updating Profile"
      );
    }
  }
};

const creatorSupportRequest = async ({
  accessToken,
  refreshToken,
  reason,
  message,
  creatorId,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/creator-support`, {
      reason,
      message,
      creatorId,
      ecosystemDomain,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Posting Support Request"
      );
    }
  }
};

const creatorAllTimeBooking = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/monthly-booking-stats/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching all time booking "
      );
    }
  }
};

const creatorProfile = async ({ creatorId, accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/creator/profile/${creatorId}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching creator profile "
      );
    }
  }
};
const creatorSupportBlock = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/support-request-by-a-creator/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching creator profile "
      );
    }
  }
};

const creatorSupportTable = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/all-creator-support-requests/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching creator profile"
      );
    }
  }
};

const creatorUpdateProfileImage = async ({
  accessToken,
  refreshToken,
  creatorId,
  image,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  const formData = new FormData();
  formData.append("image", image);
  formData.append("creatorId", creatorId);

  try {
    const response = await authFetch.patch(
      `${PLAIN_API_URL}/creator/update-profile-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error Updating Profile Image"
      );
    }
  }
};

const creatorWebsiteDetails = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/website-details/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching website details"
      );
    }
  }
};

const creatorNotification = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/notifications/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching notification"
      );
    }
  }
};

const creatorMarkAsReadNotification = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
  notificationId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.put(
      `${PLAIN_API_URL}/marked-as-read/${ecosystemDomain}/${notificationId}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error marking as read notification"
      );
    }
  }
};

const creatorCreateTicket = async ({
  accessToken,
  refreshToken,
  name,
  price,
  adminType,
  benefits,
  shortDescription,
  currency,
  creatorId,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/create/ticket`, {
      name,
      price,
      adminType,
      benefits,
      shortDescription,
      currency,
      creatorId,
      ecosystemDomain,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(error.response?.data?.message || "Error Creating Ticket");
    }
  }
};

const creatorGetAllTicket = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/all-tickets/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching Tickets"
      );
    }
  }
};

const creatorEditTicket = async ({
  accessToken,
  refreshToken,
  ticketId,
  price,
  benefits,
  shortDescription,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.patch(`${PLAIN_API_URL}/edit/ticket`, {
      ticketId,
      price,
      benefits,
      shortDescription,
      ecosystemDomain,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(error.response?.data?.message || "Error Editing Ticket");
    }
  }
};

const creatorDeleteTicket = async ({
  accessToken,
  refreshToken,
  ecosystemDomain,
  ticketId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.delete(
      `${PLAIN_API_URL}/delete/ticket/${ecosystemDomain}/${ticketId}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(error.response?.data?.message || "Error Deleting Ticket");
    }
  }
};

const creatorGetAllTicketPurchases = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/ticket-purchase-history/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching Tickets Purchases"
      );
    }
  }
};
const creatorGetRecentEcosystem = async ({
  creatorId,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/get-recent-ecosystems/${creatorId}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message || "Error fetching Recent Ecosystem"
      );
    }
  }
};
const creatorGetAllTicketPurchasesSummary = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/ticket-purchase-summary/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(
        error.response?.data?.message ||
          "Error fetching Tickets Purchases Summary"
      );
    }
  }
};

const creatorGetAllGift = async ({
  ecosystemDomain,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/gift/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      // Navigate to login page on token expiration
      navigate("/auth/login");
    } else {
      throw new Error(error.response?.data?.message || "Error fetching Gift");
    }
  }
};

const creatorCreateGift = async ({
  accessToken,
  refreshToken,
  name,
  minAmount,
  maxAmount,
  description,
  currency,
  creatorId,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(`${PLAIN_API_URL}/create-gift`, {
      name,
      minAmount,
      maxAmount,
      description,
      currency,
      creatorId,
      ecosystemDomain,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(error.response?.data?.message || "Error Creating Ticket");
    }
  }
};

const creatorEditGift = async ({
  accessToken,
  refreshToken,
  name,
  minAmount,
  maxAmount,
  description,
  currency,
  giftId,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.patch(`${PLAIN_API_URL}/edit-gift`, {
      giftId,
      name,
      minAmount,
      maxAmount,
      description,
      currency,
      ecosystemDomain,
    });
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(error.response?.data?.message || "Error Editing Ticket");
    }
  }
};

const creatorDeleteWebsite = async ({
  accessToken,
  refreshToken,
  creatorId,
  ecosystemDomain,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.delete(
      `${PLAIN_API_URL}/delete-ecosystem/${creatorId}/${ecosystemDomain}`
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/auth/login");
    } else {
      throw new Error(error.response?.data?.message || "Error Deleting Ecosystem");
    }
  }
};

export default {
  creatorDeleteWebsite,
  creatorEditGift,
  creatorCreateGift,
  creatorGetAllGift,
  creatorGetAllTicketPurchases,
  creatorGetAllTicketPurchasesSummary,
  creatorGetRecentEcosystem,
  creatorGetAllTicket,
  creatorEditTicket,
  creatorDeleteTicket,
  creatorCreateTicket,
  creatorBookingDate,
  creatorEarning,
  creatorBookingActivities,
  creatorMonthlyBooking,
  creatorMonthlyIncome,
  creatorWithdrawHistory,
  creatorTransactionHistory,
  creatorTodaySales,
  creatorPaymentCharts,
  creatorAllBanks,
  creatorVerifyAccount,
  creatorAddAccount,
  creatorAllBankDetails,
  creatorWithDraw,
  creatorEcosystemServices,
  creatorEditService,
  creatorAllTimeBooking,
  creatorProfile,
  creatorUpdateProfile,
  creatorSupportRequest,
  creatorSupportBlock,
  creatorSupportTable,
  creatorUpdateProfileImage,
  creatorWebsiteDetails,
  creatorNotification,
  creatorMarkAsReadNotification,
};
