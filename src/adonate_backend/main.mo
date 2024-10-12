import Time "mo:base/Time";
import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import Array "mo:base/Array";
import Error "mo:base/Error";
import Text "mo:base/Text";
import Float "mo:base/Float";
import Int "mo:base/Int";



actor Donate {
  type Transaction = {
    timestamp: Int;
    amount: Float;
    isDeposit: Bool;
    name: Text;
    description: Text;
    depositor: Principal;
    withdrawalAddress: ?Text;
  };
  
  stable var adminBalance: Float = 0;
  stable var transactions: [Transaction] = [];
  
  // Admin principal ID
  let admin: Principal = Principal.fromText("grhxo-nx27y-cad3j-vpiz2-hvd6v-pv77y-bhi5v-k7twj-bjqso-tji7y-oqe");
  var connectedUser: ?Principal = null;
  var connectedAdmin: ?Principal = null;

  // Function for admin to connect their wallet
 public func connectAdmin(adminInput: Principal): async Text {
    let balanceMessage = "Admin Balance: " # Float.toText(adminBalance) # " ICP";
    if (adminInput == admin) {
      connectedAdmin := ?adminInput;
      return balanceMessage # "\nAdmin connected successfully.";
    } else {
      return balanceMessage # "\nNot Admin.";
    };
};


  // Function for user to connect their wallet
  public func connectWallet(user: Principal): async Text {
    connectedUser := ?user;
    return "User connected successfully.";
  };
  
  // Get admin balance
  public func getAdminBalance(): async Float {
    return adminBalance;
  };

  // Deposit function
  public func deposit(name: Text, description: Text, amount: Float): async () {
    if (connectedUser == null) {
      throw Error.reject("Please connect your wallet before making a deposit.");
    };

    let principal = switch (connectedUser) {
      case (null) { throw Error.reject("No connected user."); };
      case (?p) { p }
    };

    if (amount == 0) {
      throw Error.reject("Deposit amount must be greater than 0.");
    };

    // Update the admin balance and transactions
    adminBalance += amount;

    let newTransaction: Transaction = {
      timestamp = Time.now();
      amount = amount;
      isDeposit = true;
      name = name;
      description = description;
      depositor = principal;
      withdrawalAddress = null;
    };
    
    transactions := Array.append<Transaction>(transactions, [newTransaction]);
  };

  // Withdraw function for admin
  public func withdraw(withdrawalAddress: Text, amount: Float): async () {
    if (connectedAdmin == null) {
      throw Error.reject("Admin must connect their wallet to make a withdrawal.");
    };

    if (amount > adminBalance) {
      throw Error.reject("Insufficient balance for withdrawal.");
    };

    adminBalance -= amount;

    let newTransaction: Transaction = {
      timestamp = Time.now();
      amount = amount;
      isDeposit = false;
      name = "Withdrawal";
      description = "Admin withdrawal to " # withdrawalAddress;
      depositor = admin;
      withdrawalAddress = ?withdrawalAddress;
    };

    transactions := Array.append<Transaction>(transactions, [newTransaction]);
  };

  // Get transaction history
  public func getTransactionHistory(): async [Transaction] {
    return transactions;
  };
  
  // Function to check if the admin is connected
  public func isAdminConnected(): async Bool {
    return switch (connectedAdmin) {
      case (null) { false };
      case (?_) { true };
    };
  }
};
