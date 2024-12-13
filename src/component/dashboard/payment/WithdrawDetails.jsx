import React, { useEffect, useState } from "react";
import WithdrawDetailImg from "../../../assets/Withdrawdetail.svg";
import { Heading, Text } from "../../Text";
import { ButtonSmallPurple, ButtonSmallWhite } from "../../Buttons";
import { Modal } from "flowbite-react";
// import api from "../../../api/DashboardApi";
import { useSelector } from "react-redux";
import SuccessModal from "../../../component/Modal/SuccessfulModal";
import { showToast } from "../../ShowToast";
import { LongInputWithPlaceholder } from "../../Inputs";
import { LabelImportant } from "../../Label";

const WithdrawDetails = ({ allBankDetails, getAllBankDetails }) => {
  // const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allBanks, setAllBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verifyError, setVerifyError] = useState("");
  // const creatorId = useSelector((state) => state.auth.user.creatorId);
  // const ecosystemDomain =
  // useSelector((state) => state.ecosystemDomain.domain
  // );
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // useEffect(() => {
  //   if (accessToken && refreshToken) {
  //     getAllBanks();
  //   }
  // }, [
  //   accessToken, refreshToken
  // ]);

  const getAllBanks = async () => {
    try {
      const response = await api.creatorAllBanks({
        accessToken,
        refreshToken,
      });
      setAllBanks(response.data.allBanks.data);
    } catch (error) {
      setError("Failed to fetch banks");
      console.error("Could not get bank list:", error);
    }
  };

  const handleBankChange = (e) => {
    const selected = e.target.value;
    const bank = allBanks.find((bank) => bank.name === selected);
    setSelectedBank(selected);
    setBankCode(bank?.code || "");

    setAccountNumber("");
    setAccountName("");
    setVerifyError("");
  };

  const handleAccountNumberChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setAccountNumber(value);
    }
  };

  useEffect(() => {
    if (accountNumber.length === 10 && bankCode) {
      verifyAccountDetails();
    }
  }, [accountNumber, bankCode]);

  const verifyAccountDetails = async () => {
    if (accountNumber.length !== 10 || !bankCode) {
      setVerifyError(
        "Please enter a valid 10-digit account number and select a bank."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await api.creatorVerifyAccount({
        accessToken,
        refreshToken,
        account: accountNumber,
        bankCode,
      });
      setAccountName(response.data.verifyDetails.data.account_name);
      setVerifyError("");
    } catch (error) {
      setVerifyError("Failed to verify account details.");
      setAccountName("");
      console.error("Error verifying account:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccount = async () => {
    if (!bankCode || !accountNumber || !accountName) {
      showToast(
        "Please complete all fields and ensure the account is verified."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await api.creatorAddAccount({
        accessToken,
        refreshToken,
        creatorId,
        accountName,
        accountNumber,
        bankName: selectedBank,
        currency,
        ecosystemDomain,
      });
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);
      getAllBankDetails();
      console.log(response.data.message);
    } catch (error) {
      showToast(error.response.data.message);
      setIsModalOpen(false);
      console.error("Failed to add account:", error);
      setError("Failed to add account.");
    } finally {
      setLoading(false);
    }
  };

  const [firstAccount, secondAccount] = allBankDetails?.accountDetails || [];

  return (
    <div className="lg:flex lg:space-x-4 lg:w-4/12">
      <div className="bg-gradient-to-r  from-grad12 to-grad22 lg:p-6 p-3 rounded-lg w-full">
        <div className="flex justify-between">
          <Heading
            level={2}
            size="[20px]"
            weight="font-semibold"
            color="primary1"
          >
            Accounts Details
          </Heading>
          <div className="bg-primary1 w-12 h-12 justify-center items-center flex rounded-full mr-16">
            <img src={WithdrawDetailImg} alt="" className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-8">
          <Text size="[18px]" className="text-primary1">
            Account Name
          </Text>
          <Text size="[18px]" weight="font-semibold" className="text-primary1">
            {firstAccount?.accountName || "Not yet provided"}
          </Text>
        </div>
        <div className="flex justify-between mt-8">
          <div className="mt-2">
            <Text size="[14px]" className="text-primary1">
              Bank
            </Text>
            <Text weight="font-bold" className="font-bold text-primary1">
              {firstAccount?.bankName || "Nil"}
            </Text>
          </div>
          <div className="mt-2 mr-10">
            <Text size="[14px]" className="text-primary1">
              Account Number
            </Text>
            <Text weight="font-bold" className="font-bold text-primary1">
              {firstAccount?.accountNumber || "Nil"}
            </Text>
          </div>
        </div>
        <div className="mt-8">
          <ButtonSmallPurple
            width="w-11/12"
            bg="sec10"
            className="text-primary1 bg-sec5 py-2 px-5 rounded-xl"
            onClick={() => setIsModalOpen(true)}
          >
            Add account details
          </ButtonSmallPurple>
        </div>
      </div>

      <Modal
        show={isModalOpen}
        size="2xl"
        popup={true}
        onClose={() => setIsModalOpen(false)}
        className="backdrop-blur-md font-body "
      >
        <Modal.Header className="relative p-4 ">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-primary2 font-bold bg-sec2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary6"
          >
            &times;
          </button>
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-6">
            <div className="bg-sec1 p-5 rounded-xl">
              <Heading
                level={2}
                size="[20px]"
                weight="font-semibold"
                color="primary2"
              >
                Add Account Details
              </Heading>
              <Text>Kindly fill up the withdrawal details below</Text>
            </div>
            {allBankDetails?.accountDetails?.length > 0 && (
              <Text className="font-semibold mb-4">
                Previously Added Accounts
              </Text>
            )}
            <div className="lg:flex lg:space-x-4 lg:space-y-0 space-y-4 mb-4">
              {allBankDetails?.accountDetails
                ?.slice(1, 3)
                .map((account, index) => (
                  <div
                    key={account.id}
                    className="border border-primary3 p-4 rounded w-full"
                  >
                    <div>
                      <Text size="sm">Account Name</Text>
                      <Text>{account.accountName || "nil"}</Text>
                    </div>
                    <div className="flex justify-between mt-5">
                      <div>
                        <Text size="sm">Bank</Text>
                        <Text>{account.bankName || "nil"}</Text>
                      </div>
                      <div>
                        <Text size="sm">Account Number</Text>
                        <Text>{account.accountNumber || "nil"}</Text>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Heading size="md">
              Kindly fill up the form to add new details below
            </Heading>
            <div>
              <div className="mb-5">
                <LabelImportant className="block text-ter11">
                  Bank Name
                </LabelImportant>
                <select
                  value={selectedBank}
                  onChange={handleBankChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">--Select Option--</option>
                  {allBanks.map((bank) => (
                    <option key={bank.code} value={bank.name}>
                      {bank.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <LabelImportant className="block text-ter11">
                  Account Number
                </LabelImportant>
                <LongInputWithPlaceholder
                  type="text"
                  value={accountNumber}
                  onChange={handleAccountNumberChange}
                  className="w-full p-2 border rounded"
                  placeholder="0000000000"
                  maxLength="10"
                />
                {loading && (
                  <p className="text-ter6">Verifying Account Number...</p>
                )}
                {verifyError && <p className="text-ter7">{verifyError}</p>}
              </div>
              <div className="mb-5">
                <LabelImportant className="block text-ter11">
                  Account Name
                </LabelImportant>
                <LongInputWithPlaceholder
                  type="text"
                  value={accountName}
                  className="w-full p-2 border rounded"
                  placeholder="Account Name"
                  readOnly
                />
              </div>
              <div className="mb-5">
                <LabelImportant className="block text-ter11">
                  Currency
                </LabelImportant>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="NGN">NGN</option>
                </select>
              </div>
              <div className="flex justify-between">
                <ButtonSmallWhite
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 bg-primary1 text-gray-700 rounded"
                >
                  Cancel
                </ButtonSmallWhite>
                <ButtonSmallPurple
                  type="button"
                  onClick={handleAddAccount}
                  className="py-2 px-4 bg-purple-500 text-white rounded"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Details"}
                </ButtonSmallPurple>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message="Account Added Successfully"
        buttonText="Withdraw"
        onButtonClick={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default WithdrawDetails;
