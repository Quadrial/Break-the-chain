import React, { useEffect, useState } from "react";
import { adonate_backend } from "../../../declarations/adonate_backend"; // Ensure this path is correct

const Donate = () => {
  const [principal, setPrincipal] = useState(null); // Wallet principal ID
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [walletConnected, setWalletConnected] = useState(false); // Wallet connection status
  const [successMessage, setSuccessMessage] = useState(""); // Success message
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const connectWallet = async () => {
      setLoading(true); // Start loading when attempting to connect

      // Check if Plug Wallet extension is installed
      if (!window.ic?.plug) {
        alert("Please install the Plug Wallet extension.");
        setLoading(false);
        return;
      }

      try {
        // Request Plug Wallet connection
        const whitelist = [process.env.CANISTER_ID_ADONATE_BACKEND]; // Ensure canister ID is accessed correctly
        await window.ic.plug.requestConnect({ whitelist });

        // Verify connection
        const connected = await window.ic.plug.isConnected();

        if (connected) {
          const principal = await window.ic.plug.getPrincipal();
          setPrincipal(principal);
          setWalletConnected(true);

          // Set success message
          setSuccessMessage(`Wallet connected successfully! Address: ${principal.toText()}`);
        } else {
          alert("Failed to connect to the wallet. Please try again.");
        }
      } catch (error) {
        console.error("Error connecting to Plug wallet:", error);
        alert(
          "An error occurred while trying to connect your wallet: " +
            error.message
        );
      } finally {
        setLoading(false); // Stop loading once done
      }
    };

    if (!walletConnected) {
      connectWallet();
    }
  }, [walletConnected]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!walletConnected) {
      alert("Please connect your wallet to make a donation.");
      return;
    }
    try {
      // Call the deposit function on the smart contract
      await adonate_backend.deposit(name, description, amount);
      setSuccessMessage("Donation successful!");
    } catch (error) {
      console.error("Donation failed:", error);
      alert("Failed to make a donation: " + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Make a Donation</h1>

      {/* Display loading state if wallet connection is in progress */}
      {loading && <div className="text-blue-500">Connecting to wallet...</div>}

      {walletConnected && successMessage && (
        <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleDonate}>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 w-full mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Amount (ICP)"
          className="border p-2 w-full mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          type="submit"
          className={`bg-${walletConnected ? "green" : "blue"}-500 text-white px-4 py-2 rounded hover:bg-${walletConnected ? "green" : "blue"}-600`}
          disabled={loading} // Disable button while loading
        >
          {walletConnected ? "Donate Now" : "Connect Wallet"}
        </button>
      </form>

      {walletConnected && (
        <div className="mt-4">
          <p>
            <strong>Wallet Address:</strong> {principal.toText()}
          </p>
        </div>
      )}
    </div>
  );
};

export default Donate;
