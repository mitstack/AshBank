function Deposit() {
  

 
  
   const tx = React.useContext(UserTransaction);
   const bal = React.useContext(UserLoggedin);
   const currentAccountBal = Number(bal.balance);

  
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [totalState, SetTotalState] = React.useState(currentAccountBal);
    
    function validate(field, label) {
      if (!field) {
        setStatus("Error: " + label);
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      
      let str = field.trim();
      str = str.replace(/^0+/, "") || "0";
      var n = Math.floor(Number(str));
      
      if(!(n !== Infinity && String(n) === str && n >= 0)) {
        setStatus("Error: " + "Enter Valid Number");
        setTimeout(() => setStatus(""), 3000);
        return false;
      }
      
      
      return true;
      
    }

    function handleCreate() {
      if (!validate(amount, "Enter Amount")) return;
      //if (!validate(formFileMultiple.value, "Upload Check")) return;

      let depositAmount = Number(amount);
      console.log("new total is", depositAmount + totalState);
      let accountBalance = depositAmount + totalState;

      SetTotalState(depositAmount + totalState);

      
      tx.transactions.push({
        date: new Date().toJSON().slice(0, 10),
        transaction: "Deposit",
        amount: depositAmount,
        accountBalance,
      });

      bal.balance = accountBalance;

     

      
      setAmount("");

      setShow(false);
    }

    function clearForm() {
      setShow(true);
    }

   

    

    return (
      <Card
        bgcolor="white"
        header="Deposit"
        txtcolor="primary"
        status={status ? status : "Account Balance: $" + totalState}
        body={
          show ? (
            <>
              <h6 className="font-italic">Amount</h6>
              <input
                type="number"
                className="form-control shadow p-3 mb-5 bg-body rounded"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
              
             
                
              <br/>
             
              

              <button
                type="submit"
                className="btn btn-dark shadow p-3 mb-5 bg-body rounded"
                onClick={handleCreate}
              >Deposit</button>
            </>
          ) : (
            <>
              <h6 className="font-italic text-success">Check has been deposited</h6>
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
