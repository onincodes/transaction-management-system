"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import TransactionTable from "../Table/TransactionTable";
import { TransactionType } from "@/types/type";
import ButtonComp from "../Buttons/ButtonComp";
import AddTransactionModal from "../Modal/AddTransactionModal";
import SuccessNotif from "../ToastNotification/SuccessNotif";
import FailedNotif from "../ToastNotification/FailedNotif";

const Main = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [transactionModal, setTransactionModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successNotif, setSuccessNotif] = useState<boolean>(false);
  const [failedNotif, setFailedNotif] = useState<boolean>(false);

  const fetchTransactions = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 800);

    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      setFailedNotif(true);
      console.error("Unable to fetch transactions", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <div className="flex  flex-col  items-center  mt-15">
        <div className="flex  flex-col  gap-7  items-center">
          <div className="flex  items-center  justify-between  w-full">
            <h1 className="font-[FC-Font]  text-[#11313B]  text-4xl">
              Transaction Management System
            </h1>

            <ButtonComp
              label="＋ Add Transaction"
              onClick={() => setTransactionModal(true)}
            />
          </div>

          <TransactionTable transactions={transactions} isLoading={isLoading} />
        </div>
      </div>

      {transactionModal && (
        <AddTransactionModal
          setTransactionModal={setTransactionModal}
          fetchTransactions={fetchTransactions}
          setSuccessNotif={setSuccessNotif}
          setFailedNotif={setFailedNotif}
        />
      )}

      {successNotif && <SuccessNotif />}
      {failedNotif && <FailedNotif />}
    </>
  );
};

export default Main;
