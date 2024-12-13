import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import api from "../../api/applicationFeature";
import { showToast } from "../../component/ShowToast";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";

const BookingModal = ({ isOpen, handleClose, information, subdomain }) => {
  const [step, setStep] = useState(1);
  const [loading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [companyCharge, setCompanyCharge] = useState(null);
  const [providerCharge, setProviderCharge] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [summary, setSummary] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Pay on delivery");
  const [servicePrice, setServicePrice] = useState("");
  const [uniqueID, setUniqueID] = useState("");
  const [loadingPay, setLoadingPay] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [updatedTimeSlots, setUpdatedTimeSlots] = useState([]);

  useEffect(() => {
    console.log("this is information", information);
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const disablePastDates = ({ date, view }) => {
    // Disable dates before today
    return view === "month" && date < new Date().setHours(0, 0, 0, 0);
  };
  const [timeSlots] = useState([
    { time: "07:30 AM", booked: false },
    { time: "08:00 AM", booked: false },
    { time: "08:30 AM", booked: false },
    { time: "09:00 AM", booked: false },
    { time: "09:30 AM", booked: false },
    { time: "10:00 AM", booked: false },
    { time: "10:30 AM", booked: false },
    { time: "11:00 AM", booked: false },
    { time: "11:30 AM", booked: false },
    { time: "12:00 PM", booked: false },
    { time: "12:30 PM", booked: false },
    { time: "01:00 PM", booked: false },
    { time: "01:30 PM", booked: false },
    { time: "02:00 PM", booked: false },
    { time: "02:30 PM", booked: false },
    { time: "03:00 PM", booked: false },
    { time: "03:30 PM", booked: false },
    { time: "04:00 PM", booked: false },
    { time: "04:30 PM", booked: false },
    { time: "05:00 PM", booked: false },
    { time: "05:30 PM", booked: false },
    { time: "06:00 PM", booked: false },
    { time: "06:30 PM", booked: false },
    { time: "07:00 PM", booked: false },
    { time: "07:30 PM", booked: false },
    { time: "08:00 PM", booked: false },
    { time: "08:30 PM", booked: false },
    { time: "09:00 PM", booked: false },
    { time: "09:30 PM", booked: false },
    { time: "10:00 PM", booked: false },
  ]);

  useEffect(() => {
    disablePastTimeSlots();
  }, []);
  const disablePastTimeSlots = () => {
    const newSlots = timeSlots.map((slot) => {
      return {
        ...slot,
        // Keep the booked status as it is, but do not disable past time slots
        booked: slot.booked,
      };
    });

    setUpdatedTimeSlots(newSlots);
  };

  const handleTimeSlotSelect = (slot) => {
    if (!slot.booked) setSelectedTimeSlot(slot.time);
  };
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    details: "",
  });

  const handleNextStep = (nextStep) => {
    if (nextStep <= 4) setStep(nextStep);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1)); // Ensure it doesn't go below 1
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If service or location changes, update the price
    if (name === "service" || name === "location") {
      updateServicePrice(
        name === "service" ? value : formData.service,
        name === "location" ? value : formData.location
      );
    }
  };

  const updateServicePrice = (selectedServiceName, selectedLocation) => {
    const selectedService = information.find(
      (service) => service.name === selectedServiceName
    );

    if (selectedService) {
      let price = selectedService.price;

      // Add 50% if Home Service is selected
      if (selectedLocation === "Home Service") {
        price += price * 0.5;
      }

      setServicePrice(price.toLocaleString());
    } else {
      setServicePrice("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSummary({ selectedDate, selectedTimeSlot, formData });
    // handleNextStep(3);
  };

  const handlePrint = () => {
    const modal = document.querySelector(".printable-modal"); // Your modal element
    if (modal) {
      modal.classList.add("print-active"); // Optional, if you need additional styling

      window.print();

      modal.classList.remove("print-active"); // Clean up after printing
    }
  };

  //pay on delivery
  const handlePayOnDelivery = async () => {
    setLoadingPay(true);
    const priceToSend = parseInt(servicePrice.replace(/,/g, ""), 10);
    try {
      const response = await api.submitBooking({
        ecosystemDomain: subdomain,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        location: formData.location,
        service: formData.service,
        date: selectedDate ? selectedDate.toDateString() : "Not selected",
        time: selectedTimeSlot,
        price: priceToSend,
        description: formData.details,
        bookingType: formData.location,
      });
      setLoadingPay(false);
      showToast(response.data.message, "success");
      setUniqueID(response.data.booking.bookingId);
      setPaymentStatus("Pay on delivery");
      handleNextStep(4);
    } catch (error) {
      setLoadingPay(false);
      showToast(error.response.message, "error");
    }
  };

  const generateTxRef = () => {
    const randomString = Math.random().toString(36).substring(7);
    const timestamp = Date.now();
    return `${timestamp}-${randomString}`;
  };

  // const handlePay = () => {
  //   const priceToSend = parseInt(servicePrice.replace(/,/g, ""), 10);
  //   setCompanyCharge((priceToSend * 1.1) / 100);
  //   setProviderCharge((priceToSend * 1.4) / 100);
  //   const company = (priceToSend * 1.1) / 100;
  //   const provider = (priceToSend * 1.4) / 100;
  //   const totalValue = priceToSend + company + provider;
  //   sessionStorage.setItem("productPrice", totalValue);
  //   setTotalAmount(totalValue);
  //   handleFlutterPayment({
  //     callback: (response) => {
  //       console.log("this is response", response);
  //       if (response.status === "completed") {
  //         verifyFlutterwave(response.transaction_id);
  //         closePaymentModal();
  //       } else {
  //         closePaymentModal();
  //         showToast("Payment was not successful");
  //       }
  //     },
  //     onClose: () => {
  //       showToast("Payment process was closed");
  //     },
  //   });
  // };

  const handlePay = () => {
    const priceToSend = parseInt(servicePrice.replace(/,/g, ""), 10);
    const company = (priceToSend * 1.1) / 100;
    const provider = (priceToSend * 1.4) / 100;
    const totalValue = priceToSend + company + provider;

    // Set total amount in session storage
    sessionStorage.setItem("productPrice", totalValue);
    setTotalAmount(totalValue);

    // Initialize the payment process
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const paymentData = useFlutterwave({
      public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
      tx_ref: generateTxRef(),
      amount: totalValue, // Directly use totalValue here
      currency: "NGN",
      payment_options: "card,mobilemoney,banktransfer,opay,account,",
      customer: {
        email: formData.email,
        phone_number: formData.phone,
        name: formData.fullName,
      },
      customizations: {
        title: "Booking Payment",
        description: "Service Payment",
        logo: sessionStorage.getItem("ecoLogo"),
      },
    });

    // Execute the payment and handle the response
    paymentData({
      callback: (response) => {
        verifyFlutterwave(response.transaction_id);
        closePaymentModal();
      },
      onClose: () => {
        showToast("Payment process was closed");
      },
    });
  };

  const verifyFlutterwave = async (tx_ref) => {
    setPaymentLoading(true);
    const priceToSend = parseInt(servicePrice.replace(/,/g, ""), 10);
    const company = (priceToSend * 1.1) / 100;
    const provider = (priceToSend * 1.4) / 100;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/verify-booking-payment`,
        {
          reference: tx_ref,
          email: formData.email,
          itemType: "Service",
          provider: "flutterwave",
          ecosystemDomain: subdomain,
          companyCharge: company,
          providerCharge: provider,
          name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          location: formData.location,
          service: formData.service,
          date: selectedDate ? selectedDate.toDateString() : "Not selected",
          time: selectedTimeSlot,
          price: priceToSend,
          description: formData.details,
          bookingType: formData.location,
        }
      );
      setPaymentLoading(false);
      setUniqueID(response.data.booking.bookingId);
      setPaymentStatus("paid");
      showToast("Payment Verified Successfully");
      handleNextStep(4);
    } catch (error) {
      setPaymentLoading(false);
      showToast(error.response.data.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50 ">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500 bg-opacity-75"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="bg-white font-body rounded-lg p-6 w-screen max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center border-b pb-3">
            <DialogTitle className="text-xl font-semibold mt-6 pt-4">
              Book Appointment
            </DialogTitle>
            <button onClick={handleClose} className="text-xl">
              &times;
            </button>
          </div>

          <div className="py-4 overflow-y-auto">
            {loading && <div className="spinner"></div>}

            {/* Step 1: Select Date and Time */}
            {!loading && step === 1 && (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-4/12 border rounded-md p-3">
                  <h5 className="text-lg font-semibold">Select Date</h5>
                  <p className="text-gray-500 text-sm mb-4">
                    Kindly click on the preffered date till it selects with
                    purple gradients.
                  </p>
                  <p className="text-purple-500 mb-4">
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "No date selected"}
                  </p>
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="border-none"
                    tileDisabled={disablePastDates} // Disable past dates
                    tileClassName={({ date, view }) =>
                      date.getDate() === new Date().getDate() &&
                      view === "month"
                        ? "bg-[#FFC145] text-white rounded-full"
                        : ""
                    }
                    nextLabel={
                      <span className="text-primary3 font-bold">&gt;</span>
                    }
                    prevLabel={
                      <span className="text-primary3 font-bold">&lt;</span>
                    }
                  />
                  <style jsx>{`
                    .react-calendar__navigation button {
                      color: #2d1c4d;
                    }
                    .react-calendar__month-view__weekdays__weekday {
                      color: #2d1c4d;
                    }
                    .react-calendar__tile {
                      color: #2d1c4d;
                    }
                    .react-calendar__tile--active {
                      background: linear-gradient(
                        to bottom,
                        #ff60e6,
                        #a55f95d4
                      ) !important;
                      color: white !important;
                      border-radius: 100%;
                    }
                    .react-calendar__tile a {
                      text-decoration: none !important;
                    }
                  `}</style>
                </div>

                <div className="w-full md:w-8/12">
                  <h5 className="text-lg font-semibold">Select Time</h5>
                  <p className="text-gray-500 mb-4 text-sm">
                    Kindly click on the preffered time till it selects with
                    purple
                  </p>
                  <p className="text-purple-500 mb-4">
                    {selectedTimeSlot
                      ? selectedTimeSlot
                      : "No Time has not being selected"}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {updatedTimeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => handleTimeSlotSelect(slot)}
                        className={`p-2 border rounded-md ${
                          selectedTimeSlot === slot.time
                            ? "bg-primary3 text-white"
                            : "bg-white text-gray-700"
                        } ${
                          slot.booked ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={slot.booked}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => handleNextStep(2)}
                      className={`bg-primary3 text-white p-2 rounded-md ${
                        selectedTimeSlot === null ? "opacity-70" : "opacity-100"
                      }`}
                      disabled={selectedTimeSlot === null}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Enter Your Details */}
            {!loading && step === 2 && (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <h4 className="text-lg">Enter Your Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm">
                      Full Name <span className="text-sec8">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      required
                      className="border p-2 w-full rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">
                      Email <span className="text-sec8">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="border p-2 w-full rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">
                      Phone <span className="text-sec8">*</span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="border p-2 w-full rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">
                      {" "}
                      Service Type <span className="text-sec8">*</span>
                    </label>

                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      required
                      className="border p-2 w-full rounded-md"
                    >
                      <option value="">Select Service Type (i.e shop)</option>
                      <option value="Shop">Shop</option>
                    </select>
                    {/* <p className="text-yellow-500 mb-4 text-sm">
                      Kindly note selecting that home service automatically
                      incure logistics fee added to the price.
                    </p> */}
                  </div>
                  <div>
                    <label className="block text-sm">
                      Select Service <span className="text-sec8">*</span>
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleFormChange}
                      required
                      className="border p-2 w-full rounded-md"
                    >
                      <option value="">Select Service</option>
                      {information.map((service) => (
                        <option key={service.name} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm">
                      Service Price <span className="text-sec8">*</span>
                    </label>
                    <input
                      type="text"
                      value={`₦${servicePrice}`}
                      readOnly
                      className="border p-2 w-full rounded-md bg-gray-100"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm">
                      Your Address (For home service)
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleFormChange}
                      required
                      className="border p-2 w-full rounded-md"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <label className="block text-sm">
                    Additional details for the barber (optional)
                  </label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleFormChange}
                    rows={4}
                    className="border p-2 w-full rounded-md"
                  />
                </div>

                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => handlePrevStep()}
                    className="bg-gray-400 rounded-md px-4 py-2 text-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNextStep(3)}
                    className={` bg-primary3 text-white px-4 py-2 rounded-md 
                      ${
                        formData.fullName === "" ||
                        formData.email === "" ||
                        formData.phone === "" ||
                        formData.location === "" ||
                        formData.service === ""
                          ? "opacity-70"
                          : "opacity-100"
                      }
                      `}
                    disabled={
                      formData.fullName === "" ||
                      formData.email === "" ||
                      formData.phone === "" ||
                      formData.location === "" ||
                      formData.service === ""
                    }
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Review Appointment */}
            {!loading && step === 3 && (
              <div className="space-y-4">
                <h4 className="text-lg">Review Appointment</h4>

                <p>
                  <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {selectedTimeSlot}
                </p>
                <p>
                  <strong>Full Name:</strong> {formData.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>

                <p>
                  <strong>Service:</strong> {formData.service}
                </p>
                <p>
                  <strong>Price:</strong> {servicePrice}
                </p>
                <p>
                  <strong>Service Type:</strong> {formData.location}
                </p>
                <p>
                  <strong>Your Address (For Home Service):</strong>{" "}
                  {formData.address}
                </p>
                <p>
                  <strong>Additional details:</strong> {formData.details}
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={handlePayOnDelivery}
                    className={`bg-yellow-400 rounded-md p-2 text-gray-50 ${
                      loadingPay === true ? "opacity-80" : "opacity-100"
                    }`}
                    disabled={loadingPay || paymentLoading}
                  >
                    {loadingPay ? "Processing" : "Pay on delivery"}
                  </button>
                  <button
                    onClick={handlePay}
                    className={`ml-4 bg-green-500 text-white p-2 rounded-md ${
                      paymentLoading === true ? "opacity-80" : "opacity-100"
                    }`}
                    disabled={loadingPay || paymentLoading}
                  >
                    {paymentLoading ? "Processing" : "Proceed to Payment"}
                  </button>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => handlePrevStep()}
                    className="bg-gray-400 rounded-md p-2 text-gray-50"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {!loading && step === 4 && (
              <div className="space-y-4 overflow-visible overflow-y-auto ">
                <h4 className="text-sm">
                  Kindly screenshot this page or click on the "Print Receipt"
                  button. The Receipt is the prove of booking reservation and
                  payment status. This should be showed to the barber.
                </h4>

                <div
                  className={`${
                    paymentStatus === "paid" ? "bg-green-100" : "bg-yellow-100"
                  } w-full p-4 rounded-md`}
                >
                  <div className="flex justify-end my-4">
                    <button
                      type="button"
                      onClick={() => handlePrint()}
                      className="bg-primary3 hover:bg-yellow-500 rounded-md p-2 text-gray-50"
                    >
                      Print Receipt
                    </button>
                  </div>
                  {/* Invoice content */}
                  <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto printable-modal">
                    <div class="font-bold text-xl mb-2">RECEIPT</div>
                    <div class="flex items-center justify-between mb-8">
                      <div class="flex items-center">
                        <div
                          className={`${
                            paymentStatus === "paid"
                              ? "text-green-700"
                              : "text-yellow-600"
                          } font-semibold uppercase  p-2 rounded-full  text-lg`}
                        >
                          {paymentStatus}
                        </div>
                      </div>
                      <div class="text-gray-700">
                        <div class="font-bold text-md mb-2">{uniqueID}</div>
                        <div class="text-md font-bold">
                          Date Booked: {selectedDate?.toLocaleDateString()}
                        </div>
                        <div class="text-md font-bold">
                          Time Booked: {selectedTimeSlot}
                        </div>
                      </div>
                    </div>
                    <div class="border-b-2 border-gray-300 pb-8 mb-8">
                      <h2 class="text-2xl font-bold mb-4">Bill To:</h2>
                      <div class="text-gray-700 mb-2">{formData.fullName}</div>
                      <div class="text-gray-700 mb-2">{formData.email}</div>
                      <div class="text-gray-700 mb-2">{formData.phone}</div>
                      <div class="text-gray-700 mb-2">{formData.address}</div>
                    </div>
                    <table class="w-full text-left mb-8">
                      <thead>
                        <tr>
                          <th class="text-gray-700 font-bold uppercase py-2">
                            Service
                          </th>
                          <th class="text-gray-700 font-bold uppercase py-2">
                            Service Type
                          </th>
                          <th class="text-gray-700 font-bold uppercase py-2">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="py-4 text-gray-700">{formData.service}</td>
                          <td class="py-4 text-gray-700">
                            {formData.location}
                          </td>
                          <td class="py-4 text-gray-700">{servicePrice}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div class="flex justify-end mb-8">
                      <div class="text-gray-700 mr-2">Total:</div>
                      <div class="text-gray-700 font-bold text-xl">
                        {servicePrice}
                      </div>
                    </div>
                    <div class="border-t-2 border-gray-300 pt-8 mb-8">
                      <div class="text-gray-700 mb-2">
                        Additional Note: {formData.details}
                      </div>
                      <div class="text-yellow-600 text-center mb-2">
                        Please Screenshot or print this to serve as the booking
                        evidence.
                      </div>

                      <div class="text-gray-700 text-center">
                        Thanks for your patronage.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BookingModal;
