import { Navbar, NavbarBrand, Nav, NavItem, Button, Container } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Features/UserSlice";
import { useEffect } from "react";
import logo from "../Images/logo.jpg";

const Header = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const email  =useSelector((state)=>state.users.user.email);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if(!email){
      navigate("/login");
    }
  }, [email]);

  return (
  
    <Navbar expand="md" className="main-navbar py-3 shadow-sm mb-5" light>
      <Container>
    
        <NavbarBrand tag={Link} to="/" className="logo-text fw-bold fs-4">
          Smart Daily Life
                  <img
          src={logo}
          alt="Logo"
          style={{ width: "110px", marginRight: "12px" }}
        />
     

        </NavbarBrand>
        
        
        <Nav className="ms-auto align-items-center" navbar>
          {user && user.email ? (
            <>
              <NavItem>
                <Link className="nav-link px-3 fw-medium" to="/">Home</Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link px-3 fw-medium" to="/addTask">Add Task</Link>
              </NavItem>
               <NavItem>
                <Link className="nav-link px-3 fw-medium" to="/location">Location</Link>
              </NavItem>
              <NavItem>

               
           
                <Button outline size="sm" className="ms-3 btn-calm px-3" onClick={handleLogout}>
                  Logout
                </Button>
              </NavItem>
            </>
          ) : (
            <>
              <NavItem>
                <Link className="nav-link px-3 fw-medium" to="/login">Login</Link>
              </NavItem>
              <NavItem>
      
                <Link className="btn btn-calm ms-2 px-4 shadow-sm" to="/register">
                  Register
                </Link>
              </NavItem>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;