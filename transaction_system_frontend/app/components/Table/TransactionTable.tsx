"use client";

import { TransactionType } from "@/types/type";

type Props = {
  transactions: TransactionType[];
  isLoading: boolean;
};

const TransactionTable = ({ transactions, isLoading }: Props) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) =>
      new Date(b.transactionDate).getTime() -
      new Date(a.transactionDate).getTime()
  );

  return (
    <div className="overflow-x-auto  w-260  border-x  border-b  border-gray-300  rounded-2xl  mb-20">
      <table className="min-w-full">
        <thead className="bg-[#11313B]">
          <tr className="text-white  text-lg  font-semibold  text-left">
            <th className="pl-10  py-5">Transaction Date</th>
            <th className="px-4  py-5">Account Number</th>
            <th className="px-4  py-5">Account Holder Name</th>
            <th className="px-6  py-5">Amount</th>
            <th className="px-6  py-5">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 || isLoading ? (
            <tr>
              <td colSpan={5} className="text-center  py-10">
                <div className="inline-block  size-8  border-4  border-[#FF8A5B]  border-t-transparent  rounded-full  animate-spin" />
              </td>
            </tr>
          ) : (
            sortedTransactions.map((transaction, index) => (
              <tr
                key={index}
                className="text-[#3C5258]  border-b  border-gray-300  hover:bg-gray-100/50"
              >
                <td className="pl-10  py-4">
                  {transaction.transactionDate
                    ? new Date(transaction.transactionDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                    : ""}
                </td>
                <td className="px-4  py-4">{transaction.accountNumber}</td>
                <td className="px-4  py-4  font-bold">
                  {transaction.accountHolderName}
                </td>
                <td className="px-6  py-4  font-bold">
                  ₱
                  {transaction.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="pl-6  py-4  text-sm">
                  <span
                    className={`px-3  py-1  rounded-xl  border  ${
                      transaction.status === "Pending"
                        ? "text-yellow-500  border-yellow-300"
                        : ""
                    } ${
                      transaction.status === "Settled"
                        ? "text-green-600  border-green-600"
                        : ""
                    } ${
                      transaction.status === "Failed"
                        ? "text-red-600  border-red-600"
                        : ""
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
