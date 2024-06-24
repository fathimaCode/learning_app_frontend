import { Link } from "react-router-dom"

const SideBar:React.FC=()=>{
    return (<>
    
    <div className="sidebar_container">
        <ul>
            <h4 className="header">LMS App</h4>
           
            <li><Link to="/viewChats">Chat</Link></li>
            <li><Link to="/">Logout</Link></li>
        </ul>
    </div>
    </>)
}
export default SideBar