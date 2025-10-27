"use client";

import { useState } from "react";
import CloseButton from "../Buttons/CloseButton";
import { api } from "@/lib/api";

type Props = {
  setTransactionModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchTransactions: () => Promise<void>;
  setSuccessNotif: React.Dispatch<React.SetStateAction<boolean>>;
  setFailedNotif: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddTransactionModal = ({
  setTransactionModal,
  fetchTransactions,
  setSuccessNotif,
  setFailedNotif,
}: Props) => {
  const [transactionDate, setTransactionDate] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [accountHolderName, setAccountHolderName] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const digits = e.target.value.replace(/\D/g, "");

    setAccountNumber(digits);
    setErrorMessages([]);
  };

  const formatAccountNumber = (digits: string) => {
    return digits.replace(/(.{4})/g, "$1-").replace(/-$/, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/transactions", {
        transaction_date: transactionDate,
        account_number: formatAccountNumber(accountNumber),
        account_holder_name: accountHolderName,
        amount: amount,
      });

      setTransactionDate("");
      setAccountNumber("");
      setAccountHolderName("");
      setAmount(0);

      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setSuccessNotif(true);
        setTransactionModal(false);
        fetchTransactions();
      }, 1000);

      setTimeout(() => {
        setSuccessNotif(false);
      }, 3000);
    } catch (error: any) {
      const errors = error.response?.data?.errors;

      if (Array.isArray(errors)) {
        setErrorMessages(errors);
      } else {
        setIsSubmitting(true);

        setTimeout(() => {
          setTransactionModal(false);
          setFailedNotif(true);
        }, 1000);

        setTimeout(() => {
          setFailedNotif(false);
        }, 3000);
      }
    }
  };

  return (
    <div className="fixed  inset-0  flex  items-center  justify-center  bg-black/55">
      <div className="relative  flex  items-start  justify-center  w-135  bg-white  rounded-2xl">
        <CloseButton onClick={() => setTransactionModal(false)} />

        <form onSubmit={handleSubmit} className="flex  flex-col  gap-5  mb-10">
          <h2 className="font-[FC-Font]  text-[#11313B]  text-4xl  font-bold  mt-15">
            Add Transaction
          </h2>

          <div className="flex  flex-col  gap-3">
            <label className="text-[#3C5258]  font-bold">
              Transaction Date
            </label>
            <input
              type="date"
              name="transactionDate"
              value={transactionDate}
              onChange={(e) => {
                setTransactionDate(e.target.value);
                setErrorMessages([]);
              }}
              className="px-5  w-110  h-12  bg-[#F5F7F7]  border  border-gray-200  rounded-2xl  focus:outline-none  focus:ring-2  focus:ring-[#3DB2B6]"
            />
          </div>

          <div className="flex  flex-col  gap-3">
            <label className="text-[#3C5258]  font-bold">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formatAccountNumber(accountNumber)}
              onChange={handleAccountNumberChange}
              placeholder="0000-0000-0000"
              className="px-5  w-110  h-12  bg-[#F5F7F7]  border  border-gray-200  rounded-2xl  focus:outline-none  focus:ring-2  focus:ring-[#3DB2B6]"
            />
          </div>

          <div className="flex  flex-col  gap-3">
            <label className="text-[#3C5258]  font-bold">
              Account Holder Name
            </label>
            <input
              type="text"
              name="accountHolderName"
              value={accountHolderName}
              onChange={(e) => {
                setAccountHolderName(e.target.value);
                setErrorMessages([]);
              }}
              placeholder="Full name"
              className="px-5  w-110  h-12  bg-[#F5F7F7]  border  border-gray-200  rounded-2xl  focus:outline-none  focus:ring-2  focus:ring-[#3DB2B6]"
            />
          </div>

          <div className="flex  flex-col  gap-3">
            <label className="text-[#3C5258]  font-bold">Amount</label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => {
                setAmount(Number(e.target.value));
                setErrorMessages([]);
              }}
              placeholder="₱0.00"
              className="px-5  w-110  h-12  bg-[#F5F7F7]  border  border-gray-200  rounded-2xl  focus:outline-none  focus:ring-2  focus:ring-[#3DB2B6]"
            />
          </div>

          {errorMessages.length > 0 && (
            <div>
              {errorMessages.map((err, index) => (
                <p key={index} className="text-red-500  text-center  text-sm">
                  {err}
                </p>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="px-4  py-3  text-white  font-medium  bg-[#FF8A5B]  hover:bg-[#FF8A5B]/88  rounded-2xl  active:scale-95  cursor-pointer"
          >
            {isSubmitting ? (
              <div className="inline-block  w-3.5  h-3.5  mt-1  border-2  border-white  border-t-transparent  rounded-full  animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
