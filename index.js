function Spa() {
 
  
  

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
                }
                
              ]
            }}
          >
            <UserLoggedin.Provider value={{balance:100}}>
              <UserTransaction.Provider value={{ transactions: [] }}>
              <NavBar/>
                <div className="container" style={{ padding: "20px" }}>
                  
                    <Route path="/" exact component={Home} />
                    <Route path="/CreateAccount/" component={CreateAccount} />
                    
                

                  
                    <Route path="/deposit/" component={Deposit} />
                  

                  
                    <Route path="/transfer/" component={Transfer} />
                 

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
