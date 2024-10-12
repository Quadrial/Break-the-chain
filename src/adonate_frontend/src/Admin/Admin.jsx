import React, { useState, useEffect } from "react";
import { adonate_backend } from "../../../declarations/adonate_backend";

export const Admin = () => {
  const [adminConnected, setAdminConnected] = useState(false);
  const [withdrawalAddress, setWithdrawalAddress] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const handleConnectAdmin = async () => {
    try {
      // Check if the Plug wallet is available
      if (!window.ic || !window.ic.plug) {
        setErrorMessage("Plug wallet is not installed or not available.");
        return;
      }

      // Get the admin principal from the wallet
      const principal = await window.ic.plug.getPrincipal();

      // Check if principal is valid
      if (!principal) {
        setErrorMessage("Failed to retrieve principal from wallet.");
        return;
      }

      console.log("Connecting with principal:", principal.toString()); // Log the principal
      const response = await adonate_backend.connectAdmin(principal);

      console.log("Connect admin response:", response); // Log the response

      if (response === "Admin connected successfully.") {
        setAdminConnected(true);
        setErrorMessage(""); // Clear any previous error messages
      } else {
        setErrorMessage("You are not an admin."); // Update error message
      }
    } catch (error) {
      console.error("Error connecting admin:", error);
      setErrorMessage("Error connecting wallet: " + error.message); // Update error message
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    if (!adminConnected) {
      alert("Please connect as admin first.");
      return;
    }

    try {
      await adonate_backend.withdraw(
        withdrawalAddress,
        BigInt(withdrawalAmount)
      );
      alert("Withdrawal successful!");
      fetchTransactionHistory(); // Fetch transaction history after withdrawal
    } catch (error) {
      console.error("Withdrawal failed:", error);
      alert("Withdrawal failed: " + error.message);
    }
  };

  const fetchTransactionHistory = async () => {
    const history = await adonate_backend.getTransactionHistory();
    setTransactionHistory(history);
  };

  useEffect(() => {
    fetchTransactionHistory(); // Fetch transaction history when component mounts
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>
      {errorMessage && (
        <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
      )}{" "}
      {/* Display error message */}
      {!adminConnected ? (
        <button
          onClick={handleConnectAdmin}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          Connect Admin Wallet
        </button>
      ) : (
        <form onSubmit={handleWithdraw}>
          <h3>Withdraw Funds</h3>
          <input
            type="text"
            placeholder="Withdrawal Address"
            value={withdrawalAddress}
            onChange={(e) => setWithdrawalAddress(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: "blue",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              fontSize: "16px",
            }}
          >
            Withdraw
          </button>
        </form>
      )}
      <h3>Transaction History</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {transactionHistory.map((tx, index) => (
          <li
            key={index}
            style={{ padding: "5px", borderBottom: "1px solid #ddd" }}
          >
            {new Date(tx.timestamp).toLocaleString()}:{" "}
            {tx.isDeposit ? "Deposit" : "Withdrawal"} of {tx.amount} ICP by{" "}
            {tx.depositor.toText()}
          </li>
        ))}
      </ul>
    </div>
  );
};
