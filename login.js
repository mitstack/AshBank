function Login() {
  const ctx = React.useContext(UserContext);
  const cookie = React.useContext(UserLoggedin);
  const tx = React.useContext(UserTransaction);
  
  
  let bool = true; //show login form

  if(cookie.length > 0)
  bool = false; //show logged-in state form

  


  const [show, setShow] = React.useState(bool); //state renders from bool
  
  const [status, setStatus] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  /*React.useEffect(() => {
    setShow(JSON.parse(window.localStorage.getItem("show")));
  }, []);

 


  React.useEffect(() => {
    window.localStorage.setItem("show", show);
  }, [show]);*/

  
 
   

  
  

  function handleCreate() {
    console.log(email, password);

    let verifiedUser = ctx.users.filter((user) => {
      return user.email == email && user.password == password;
    });

    if (verifiedUser.length >= 1) {
      cookie.push(verifiedUser)
      tx.transactions.push({
        date: new Date().toJSON().slice(0, 10),
        transaction: "Login",
        amount: "--",
        accountBalance: verifiedUser[0].balance,
      });
      console.log(cookie);

      return setShow(false);
    }

    setStatus("Please create an account with us first");
    setTimeout(() => setStatus(""), 3000);
  }

  return (
    <Card
      bgcolor="white"
      txtcolor="primary"
      header="Login"
      status={status}
      body={
        show ? (
          <>
            <h6 className="font-italic">Email address</h6>
            <input
              type="input"
              className="form-control font-italic shadow p-3 mb-5 bg-body rounded"
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
              className="btn btn-light shadow p-3 mb-5 bg-body rounded"
              onClick={handleCreate}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h5>Welcome {cookie[0][0].name}</h5>

            <Link className="btn btn-dark" role="button" to="../">
              Go To Dashboard
            </Link>
          </>
        )
      }
    />
  );
}
