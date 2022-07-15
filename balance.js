function Balance() {
  //create new transaction context and keep on update based on transfer and deposit
  //create a mpa list
  //render in the table.

  const ctx = React.useContext(UserContext);
  const cookie = React.useContext(UserLoggedin);
  const tx = React.useContext(UserTransaction);

  if (cookie.length >= 1) {
    let list = tx.transactions.map((item, index) => {


      function classes(transaction){

        if(transaction=="Transfer")
        return 'table-danger '+ 'shadow-lg ' + 'p-3 ' + 'mb-5 ' + 'bg-body ' + 'rounded'

        if(transaction=="Login"||transaction=="Signup")
        return 'table-info '+ 'shadow-lg ' + 'p-3 ' + 'mb-5 ' + 'bg-body ' + 'rounded'

        return 'table-success '+ 'shadow-lg ' + 'p-3 ' + 'mb-5 ' + 'bg-body ' + 'rounded'
      }





      return (
        <>
          <tr className={classes(item.transaction)}>
            <td>{item.date}</td>
            <td>{item.transaction}</td>
            <td>${item.amount}</td>
            <td>${item.accountBalance}</td>
          </tr>
        </>
      );
    });

    return (
      <><div>
         <table className="table table-primary table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Transaction</th>
              <th scope="col">Amount</th>
              <th scope="col">Account Balance</th>
            </tr>
          </thead>

          <tbody>{list}</tbody>
        </table>
        

      </div>
       
      </>
      
    );
  }

  return <Login />;
}
