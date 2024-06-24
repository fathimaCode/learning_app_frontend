import { useNavigate } from "react-router-dom"

const CommonNav:React.FC= ()=>{
  const tokenInfo = localStorage.getItem("token")
  const navigate = useNavigate()
  const username = localStorage.getItem("username")
  console.log(`navbar:${tokenInfo}- ${username}`)
  function logout(): void {
    localStorage.removeItem("token");
    navigate("/course");
  }

    return (
        <>
        <div id="header" className="fixed-top">
    <div className="container d-flex align-items-center">

      <h1 className="logo me-auto"><a href="index.html"><span>LMS </span>App</a></h1>
    

      <nav id="navbar" className="navbar order-last order-lg-0">
        <ul>
          <li><a href="/" className="active">Home</a></li>

         
          <li><a href="/course">Courses</a></li>
         
          <li><a href="/login">Login</a></li>
        {tokenInfo!=null?
        (<>
        
        <li className="dropdown"><a href="#"><span>Welcome ! {username}</span> <i className="bi bi-chevron-down"></i></a>
            <ul>
              <li><a href="/dashboard">My Dashboard</a></li>
              <li><a href="#" onClick={()=>logout()}>Logout</a></li>
        
              
            </ul>
          </li>
        </>):
        (<>
        
        </>)}

        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>

      
      </div>
     </div>
        </>
    )
}
export default CommonNav