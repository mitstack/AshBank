function Spa() {
  const imageurl = window.innerWidth > 820 ? "pictures/bank_hero.jpg" : "";
  const depositimage = window.innerWidth > 820 ? "pictures/Mobile-Deposit.jpg" : "";
  const transferimage = window.innerWidth > 820 ? "pictures/money_transfer.jpg": "";
  const [isLoggedin, setLoggedin] = React.useState(false);

  //figure out way to use footer using switch and browser route
  return (
    <HashRouter>
      <div style={{ backgroundColor: "info" }}>
        
        <Switch>
          <UserContext.Provider
            value={{
              users: [
                {
                  name: "abel",
                  email: "abel@mit.edu",
                  password: "secret",
                  balance: 100,
                },
                {
                  name: "Ashna",
                  email: "ashna@mit.edu",
                  password: "secret",
                  balance: 200,
                },
                {
                  name: "Pearse",
                  email: "pearse@mit.edu",
                  password: "secret",
                  balance: 300,
                },
              ],
            }}
          >
            <UserLoggedin.Provider value={[]}>
              <UserTransaction.Provider value={{ transactions: [] }}>
              <NavBar isLoggedin={isLoggedin} setLoggedin={setLoggedin} />
                <div className="container" style={{ padding: "20px" }}>
                  <div style={{ backgroundImage: `url(${imageurl})` }}>
                    <Route path="/" exact component={Home} />
                    <Route path="/CreateAccount/" component={CreateAccount} />
                    <Route path="/login/" component={Login} />
                  </div>

                  <div style={{ backgroundImage: `url(${depositimage})` }}>
                    <Route path="/deposit/" component={Deposit} />
                  </div>

                  <div style={{ backgroundImage: `url(${transferimage})` }}>
                    <Route path="/transfer/" component={Transfer} />
                  </div>

                    <Route path="/balance/" component={Balance} />
                    <Route path="/alldata/" component={AllData} />


                </div>
              </UserTransaction.Provider>
            </UserLoggedin.Provider>
          </UserContext.Provider>
        </Switch>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
