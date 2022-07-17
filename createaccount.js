function CreateAccount() {
  const cookie = React.useContext(UserLoggedin);

  const ctx = React.useContext(UserContext);
  const tx = React.useContext(UserTransaction);

  let bool = true; //show Account Form

  if(cookie.length > 0)
  bool = false;


  const [show, setShow] = React.useState(bool);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  

  function userExists(email) {
    let verifiedRecipient = ctx.users.filter((user) => {
      return user.email == email;
    });

    if (verifiedRecipient.length >= 1) {
      
      return false;
    }
    //if recipient don't exist
    return true;
  }


  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setStatus("Email is not valid");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    let userExists = ctx.users.filter(user=> {
      user.email == field 
    })

  

    return true;
  }

  function handleCreate() {
    console.log(name, email, password);
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    if (!userExists(email)) {
      setStatus("Account already exist");
      setTimeout(() => setStatus(""), 3000);
      return;
    }
    ctx.users.push({ name, email, password, balance: 100 });
    tx.transactions.push({
      date: new Date().toJSON().slice(0, 10),
      transaction: "Signup Credit",
      amount: 100,
      accountBalance: 100,
    });
    setShow(false);
  }

  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
  }

  return (
    <Card
      bgcolor="white"
      txtcolor="primary"
      header="Create Account"
      status={status}
      body={
        show ? (
          <>
            <h6 className="font-italic">Name</h6>
            <input
              type="input"
              className="form-control font-italic shadow p-3 mb-5 bg-body rounded"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            
            <h6 className="font-italic">Email address</h6>
            <input
              type="input"
              className="form-control shadow p-3 mb-5 bg-body rounded"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            
            <h6 className="font-italic">Password</h6>
            <input
              type="password"
              className="form-control shadow p-3 mb-5 bg-body rounded"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            
            <button
              type="submit"
              className="btn btn-dark font-italic shadow p-3 mb-5 bg-body rounded text-primary"
              onClick={handleCreate}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Accout Created Successfully!</h5>
            <Link className="btn btn-dark" role="button" to="../">
              Go To Dashboard
            </Link>
          </>
        )
      }
    />
  );
}
