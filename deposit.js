function Deposit() {
  //Loggedin user

  const ctx = React.useContext(UserContext);
  const cookie = React.useContext(UserLoggedin);
  const tx = React.useContext(UserTransaction);

  if (cookie.length >= 1) {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState("");
    const [amount, setAmount] = React.useState("");
    const [totalState, SetTotalState] = React.useState(cookie[0][0].balance);
    const [file, setFile] = React.useState();

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

      cookie[0][0].balance = accountBalance;
      tx.transactions.push({
        date: new Date().toJSON().slice(0, 10),
        transaction: "Deposit",
        amount: depositAmount,
        accountBalance,
      });

      const url = "http://localhost:3000/uploadFile";
      const formData = new FormData();
      formData.append("file", file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      // Backend piece when express is set up
      /* React.axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });*/
      setAmount("");

      setShow(false);
    }

    function clearForm() {
      setShow(true);
    }

    function handleChange(event) {
      setFile(event.target.files[0]);
    }

    function uploadFiles() {
      document.getElementById("formFileMultiple").click();
    }

    return (
      <Card
        bgcolor="white"
        header="Deposit Check"
        txtcolor="primary"
        status={status ? status : "Account Balance: $" + totalState}
        body={
          show ? (
            <>
              <h6 className="font-italic">Amount</h6>
              <input
                type="input"
                className="form-control shadow p-3 mb-5 bg-body rounded"
                id="amount"
                placeholder="enter amount to deposit"
                value={amount}
                onChange={(e) => setAmount(e.currentTarget.value)}
              />
              
             
                <img src="pictures/upload.png" height="50" width="50"/>
              
              <label htmlFor="formFileMultiple" className="form-label"></label>
              <input
                type="file"
                id="formFileMultiple"
                multiple
                onChange={handleChange}
              />
              <br/>
              <br/>
              

              <button
                type="submit"
                className="btn btn-light shadow p-3 mb-5 bg-body rounded"
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

  return <Login />;
}
