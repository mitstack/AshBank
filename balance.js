function Balance() {
  

 
 
  const tx = React.useContext(UserTransaction);

  
    let list = tx.transactions.map((item, index) => {

  
      




      return (
        <>
          <tr className= "table table-dark table-striped">
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
