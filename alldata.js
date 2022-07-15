function AllData(){
  const ctx = React.useContext(UserContext);
  
  let list = ctx.users.map((item, index) => {


    



    return (
      <>
        <tr className='table-info shadow-lg p-3 mb-5 bg-body rounded table-striped-columns'>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.password}</td>
          <td>{item.balance}</td>
        </tr>
      </>
    );
  });
  return (
    <>
     <>
        <table className="table table-primary table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>

          <tbody>{list}</tbody>
        </table>
      </>
    </>
  );
}
