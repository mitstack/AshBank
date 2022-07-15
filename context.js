const Route       = ReactRouterDOM.Route;
const Link        = ReactRouterDOM.Link;
const HashRouter  = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);
const UserLoggedin = React.createContext(null);
const UserTransaction = React.createContext(null)
const Switch = ReactRouterDOM.Switch;
const BrowserRouter = ReactRouterDOM.BrowserRouter;
const NavLink = ReactRouterDOM.NavLink;

function Card(props){
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      return 'card mb-3 ' + bg + txt + ' shadow-lg ' + 'p-3 ' + 'mb-5 ' + 'bg-body ' + 'rounded';
    }
  
    return (
      <div className={classes()} style={{maxWidth: "18rem"}}>
        <div className="card-header font-italic shadow p-3 mb-5 bg-body rounded">{props.header}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title font-italic">{props.title}</h5>)}
          {props.text && (<p className="card-text font-italic">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus' className="font-italic">{props.status}</div>)}
        </div>
      </div>      
    );    
  }