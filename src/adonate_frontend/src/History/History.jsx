import React, { useEffect, useState } from "react";
import { adonate_backend } from "../../../declarations/adonate_backend"; // Adjust the path as necessary

const DonationHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch transaction history
  const fetchTransactionHistory = async () => {
    try {
      const history = await adonate_backend.getTransactionHistory();
      setTransactions(history);
    } catch (err) {
      console.error("Failed to fetch transaction history:", err);
      setError("Error fetching transaction history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Transaction History</h1>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300">Timestamp</th>
            <th className="border border-gray-300">Amount (ICP)</th>
            <th className="border border-gray-300">Type</th>
            <th className="border border-gray-300">Name</th>
            <th className="border border-gray-300">Description</th>
            <th className="border border-gray-300">Depositor</th>
            <th className="border border-gray-300">Withdrawal Address</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td className="border border-gray-300">
                {new Date(transaction.timestamp * 1000).toLocaleString()}
              </td>
              <td className="border border-gray-300">{transaction.amount}</td>
              <td className="border border-gray-300">
                {transaction.isDeposit ? "Deposit" : "Withdrawal"}
              </td>
              <td className="border border-gray-300">{transaction.name}</td>
              <td className="border border-gray-300">
                {transaction.description}
              </td>
              <td className="border border-gray-300">
                {transaction.depositor.toString()}
              </td>
              <td className="border border-gray-300">
                {transaction.withdrawalAddress || "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DonationHistory;
