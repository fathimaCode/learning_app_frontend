import { useNavigate } from "react-router-dom";

const CustomerNavBar:React.FC=()=>{
    const username = localStorage.getItem("username")
    const navigate = useNavigate()
    function logout(): void {
        localStorage.removeItem("token");
        navigate("/course");
    }

    return(

        <>
         <div id="header" className="fixed-top">
    <div className="container d-flex align-items-center">

      <h1 className="logo me-auto"><a href="index.html"><span>LMS </span> App</a></h1>
    

      <nav id="navbar" className="navbar order-last order-lg-0">
        <ul>
          <li><a href="/dashboard" className="active">Home</a></li>

          <li><a href="/customerChat" >chats</a></li>
        
         
          <li><a href="#" onClick={()=>logout()}>Logout</a></li>
       
      
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
        <p style={{marginLeft:"25px",marginTop:"10px", fontWeight:"bold"}}>  Welcome! {username}</p>
      </nav>

      
      </div>
     </div>
        </>
    )
}

export default CustomerNavBar