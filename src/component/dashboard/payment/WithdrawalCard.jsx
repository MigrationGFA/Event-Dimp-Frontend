import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import WithdrawalImg from "../../../assets/Withdrawallogo.svg";
import TotalBalanceImg from "../../../assets/TotalBalance.svg";
import { Text, Heading } from "../../Text";
import SuccessModal from "../../../component/Modal/SuccessfulModal";
// import api from "../../../api/DashboardApi";
import { useSelector } from "react-redux";
import { LongInputWithPlaceholder } from "../../Inputs";
import { ButtonSmallPurple, ButtonSmallWhite } from "../../Buttons";
import { AlertDanger } from "../../Alert";

const WithdrawalModal = ({ allBankDetails, earnings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const creatorId = useSelector((state) => state.auth.user.creatorId);
  // const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  // const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [ecosystemEarning, setEcosystemEarning] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [errorAcc, setErrorAcc] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [withdrawnAmount, setWithdrawnAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(null);

  // const userPlan = useSelector((state) => state.auth.user?.plan || "Lite");

  // useEffect(() => {
  //   if (userPlan === "Lite") {
  //     setPercentage(7.5);
  //   } else if (userPlan === "Plus") {
  //     setPercentage(4);
  //   } else if (userPlan === "Pro") {
  //     setPercentage(3);
  //   } else {
  //     setPercentage(2);
  //   }
  // }, [
  //   userPlan
  // ]);

  const handleAccountSelect = (account) => {
    setSelectedAccount(account.id);
    setErrorAcc("");
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleWithdrawal = async () => {
    setError("");
    setErrorAcc("");

    if (!selectedAccount) {
      setErrorAcc("Please select a bank account.");
      return;
    }

    if (!withdrawnAmount) {
      setError("Please enter the amount you want to withdraw.");
      return;
    }

    const withdrawAmountNumeric = parseFloat(withdrawnAmount);
    const withdrawableBalance = parseFloat(earnings?.availableBalance || 0);
    

    if (isNaN(withdrawAmountNumeric) || withdrawAmountNumeric <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (withdrawAmountNumeric > withdrawableBalance) {
      setError("You cannot withdraw more than your withdrawable balance.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.creatorWithDraw({
        accessToken,
        refreshToken,
        creatorId,
        accountId: selectedAccount,
        amount: withdrawAmountNumeric,
        ecosystemDomain,
        currency: "Naira",
      });
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);
      console.log(response.data.message);
    } catch (error) {
      console.error("Failed to process withdrawal:", error);
      setError("Failed to process withdrawal.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="lg:w-4/12">
      <button className="w-full" onClick={handleOpenModal}>
        <div className="bg-sec9 p-12 rounded-lg flex items-center justify-between w-full border border-sec5">
          <Text className="font-semibold text-[28px]">Withdraw</Text>
          <div className="bg-[#7A00A30A] w-10 h-10 flex items-center justify-center rounded-full">
            <img src={WithdrawalImg} alt="Withdraw Icon" />
          </div>
        </div>
      </button>

      {isModalOpen && (
        <Modal
          show={isModalOpen}
          onClose={handleCloseModal}
          size="2xl"
          className="backdrop-blur-md font-body"
        >
          <Modal.Header className="relative bg-primary1 p-4 rounded-t-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-primary5 font-bold bg-sec1 w-8 h-8 flex items-center justify-center rounded-full hover:bg-sec2"
            >
              &times;
            </button>
          </Modal.Header>

          <Modal.Body>
            <div className="p-2 space-y-6">
              <div className="bg-sec1 p-5 rounded-xl">
                <Heading
                  level={2}
                  size="[20px]"
                  weight="font-semibold"
                  color="primary2"
                >
                  Withdrawal
                </Heading>
              </div>
              {/* <div>
                <AlertDanger
                  title="Curent Plan"
                  message={`You are curently on ${
                    userPlan ? userPlan : "Lite"
                  } plan which
            involve deducting ${percentage ? percentage : "0"}% of your total
            earning.`}
                />
              </div> */}
              <div className="lg:grid grid-cols-2 gap-4 space-y-4 lg:space-y-0">
                <div className="bg-sec1 p-4 rounded-lg flex items-center">
                  <div className="bg-primary1 w-12 h-12 items-center justify-center flex rounded-full">
                    <img src={TotalBalanceImg} alt="" />
                  </div>
                  <div className="ml-5">
                    <Text size="sm" className="font-medium text-ter11">
                      Ledger Balance
                    </Text>
                    <Text
                      size="2xl"
                      className="font-black text-2xl text-primary4"
                    >
                      {earnings?.totalEarnings?.Naira || 0.0}
                    </Text>
                  </div>
                </div>
                <div className="bg-green-100 p-4 rounded-lg flex items-center">
                  <div className="bg-primary1 w-12 h-12 items-center justify-center flex rounded-full">
                    <img src={TotalBalanceImg} alt="" />
                  </div>
                  <div className="ml-5">
                    <Text size="sm" className="font-medium text-ter11">
                      Withdrawable Balance
                    </Text>
                    <Text
                      size="2xl"
                      className="font-black text-2xl text-primary4"
                    >
                      {earnings?.availableBalance || 0.0}
                    </Text>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Text className="font-semibold text-lg mb-4">
                  Click to select your preferred bank account details
                </Text>
                <div className="lg:grid grid-cols-2 space-y-4 lg:space-y-0 gap-4">
                  {allBankDetails?.accountDetails?.map((account, index) => (
                    <div
                      key={account.id}
                      onClick={() => handleAccountSelect(account)}
                      className={`border p-4 rounded w-full cursor-pointer ${
                        selectedAccount === account.id
                          ? "bg-gradient-to-r from-grad12 to-grad22 text-primary1"
                          : "border-primary3"
                      }`}
                    >
                      <div>
                        <Text
                          size="sm"
                          className={`${
                            selectedAccount === account.id
                              ? "text-primary1"
                              : "text-primary2"
                          }`}
                        >
                          Account Name
                        </Text>
                        <Text
                          className={`${
                            selectedAccount === account.id
                              ? "text-primary1"
                              : "text-primary2"
                          }`}
                        >
                          {account.accountName || "nil"}
                        </Text>
                      </div>
                      <div className="flex justify-between mt-5">
                        <div>
                          <Text
                            size="sm"
                            className={`${
                              selectedAccount === account.id
                                ? "text-primary1"
                                : "text-primary2"
                            }`}
                          >
                            Bank
                          </Text>
                          <Text
                            className={`${
                              selectedAccount === account.id
                                ? "text-primary1"
                                : "text-primary2"
                            }`}
                          >
                            {account.bankName || "nil"}
                          </Text>
                        </div>
                        <div>
                          <Text
                            size="sm"
                            className={`${
                              selectedAccount === account.id
                                ? "text-primary1"
                                : "text-primary2"
                            }`}
                          >
                            Account Number
                          </Text>
                          <Text
                            className={`${
                              selectedAccount === account.id
                                ? "text-primary1"
                                : "text-primary2"
                            }`}
                          >
                            {account.accountNumber || "nil"}
                          </Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errorAcc && <div className="text-ter7 mt-3">{errorAcc}</div>}
              </div>

              <div className="mt-6">
                <Text className="font-medium text-lg">
                  Enter the amount you want to withdraw
                </Text>
                <LongInputWithPlaceholder
                  type="text"
                  value={withdrawnAmount}
                  className="border border-primary3 p-3 rounded-lg w-full mt-2"
                  placeholder="Please Enter your Amount Here"
                  onChange={(e) => setWithdrawnAmount(e.target.value)}
                />
                {error && <div className="text-ter7 mt-3">{error}</div>}
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <div className="flex justify-between w-full">
              <ButtonSmallWhite
                onClick={handleCloseModal}
                className="py-2 px-6 rounded-lg bg-primary1 text-ter4"
                disabled={loading}
              >
                Cancel
              </ButtonSmallWhite>
              <ButtonSmallPurple
                onClick={handleWithdrawal}
                className="py-2 px-6 rounded-lg bg-primary3 text-primary1"
                disabled={loading}
              >
                {loading ? "Processing" : "Withdraw Now"}
              </ButtonSmallPurple>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message="Your withdrawal request has been submitted successfully"
        buttonText="See Transaction details"
        onButtonClick={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default WithdrawalModal;
