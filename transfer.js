function Transfer() {
  
 
  const bal = React.useContext(UserLoggedin);
  const tx = React.useContext(UserTransaction);

  const currentAccountBal = Number(bal.balance);

  
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [accountState, SetAccountState] = React.useState(currentAccountBal);

    

    function validate(field, label) {
      field = field.trim();
      if (!field) {
        setStatus("Error: " + label);
        setTimeout(() => setStatus(""), 3000);
        return false;
      }

      return true;
    }


    function validateInput(field, label) {

      let str = field.trim();
      str = str.replace(/^0+/, "") || "0";
      var n = Math.floor(Number(str));
      
      if(!(n !== Infinity && String(n) === str && n >= 0)) {
        setStatus("Error: " + label);
        setTimeout(() => setStatus(""), 3000);
        return false;
      }

      return true;
    }


    function validateTransaction(field, label) {
       field = Number(field);
      if( Number(bal.balance) <= field) {
        setStatus("Error: " + label);
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      return true;
    }




    function handleCreate() {
      if (!validate(amount, "Enter Amount")) return;
      if(!validateTransaction(amount, "insufficient funds")) return;
      if(!validateInput(amount, "Enter Valid Number")) return;

      let transferAmount = Number(amount);
      
     

      console.log("new balance is", accountState - transferAmount);
      let accountBalance = accountState - transferAmount;
      SetAccountState(accountState - transferAmount);

      //user's account balance
      
      tx.transactions.push({
        date: new Date().toJSON().slice(0, 10),
        transaction: "Transfer",
        amount: transferAmount,
        accountBalance,
      });

      bal.balance = accountBalance;

      
      
      

      
     

      setShow(false);
    }

    function clearForm() {
      setShow(true);
      setAmount("");

    }

    return (
      <Card
        bgcolor="white"
        txtcolor="primary"
        header="Withdraw"
        status={status ? status : "Account Balance: $" + accountState}
        body={
          show ? (
            <>
              <h6 className="font-italic">Amount</h6>
              <input
                type="number"
                className="form-control font-italic shadow p-3 mb-5 bg-body rounded"
                id="amount"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
             
              

              <button
                type="submit"
                className="btn btn-dark font-italic shadow p-3 mb-5 bg-body rounded"
                onClick={handleCreate}
              >
                Confirm
              </button>
            </>
          ) : (
            <>
              <h6 className="font-italic text-success">
                Amount Withdrawl Success
              </h6>
              <button
                type="submit"
                className="btn btn-dark"
                onClick={clearForm}
              >
                Perform another transaction
              </button>
            </>
          )
        }
      />
    );


  
}
