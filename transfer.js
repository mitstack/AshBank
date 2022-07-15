function Transfer() {
  //Loggedin user

  const ctx = React.useContext(UserContext);
  const cookie = React.useContext(UserLoggedin);
  const tx = React.useContext(UserTransaction);

  if (cookie.length >= 1) {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [accountState, SetAccountState] = React.useState(
      cookie[0][0].balance
    );

    function userExists(email) {
      let verifiedRecipient = ctx.users.filter((user) => {
        return user.email == email;
      });

      if (verifiedRecipient.length >= 1) {
        cookie.push(verifiedRecipient);
        return true;
      }
      //if recipient don't exist
      return false;
    }

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
      if( cookie[0][0].balance <= field) {
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
      if (!validate(email, "Enter Recipient Email")) return;
      if (!userExists(email)) {
        setStatus("Recipient doesn't exist");
        setTimeout(() => setStatus(""), 3000);
        return;
      }

      console.log("new balance is", accountState - transferAmount);
      let accountBalance = accountState - transferAmount;
      SetAccountState(accountState - transferAmount);

      //user's account balance
      cookie[0][0].balance = accountBalance;
      tx.transactions.push({
        date: new Date().toJSON().slice(0, 10),
        transaction: "Transfer",
        amount: transferAmount,
        accountBalance,
      });

      //recipient account balance
      cookie[1][0].balance = cookie[1][0].balance + transferAmount;

      // Backend piece when express is set up
      /* React.axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });*/
      setEmail("");
      setAmount("");

      //Recipeint info is no more needed
      cookie.splice(1, 1);
      console.log(JSON.stringify(cookie));

      setShow(false);
    }

    function clearForm() {
      setShow(true);
    }

    return (
      <Card
        bgcolor="white"
        txtcolor="primary"
        header="Transfer Amount"
        status={status ? status : "Account Balance: $" + accountState}
        body={
          show ? (
            <>
              <h6 className="font-italic">Amount</h6>
              <input
                type="input"
                className="form-control font-italic shadow p-3 mb-5 bg-body rounded"
                id="amount"
                placeholder="Enter amount to transfer"
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
              <h6 className="font-italic">Recipient Email</h6>
              <input
                type="input"
                className="form-control font-italic shadow p-3 mb-5 bg-body rounded"
                id="email"
                placeholder="Enter recipient email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />

              <button
                type="submit"
                className="btn btn-light font-italic shadow p-3 mb-5 bg-body rounded"
                onClick={handleCreate}
              >
                Confirm
              </button>
            </>
          ) : (
            <>
              <h6 className="font-italic text-success">
                Amount has been transferred
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

  return <Login />;
}
