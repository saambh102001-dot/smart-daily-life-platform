
import { Container } from "reactstrap";
import { useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router";





const Footer = () => {
  const dispatch = useDispatch();
  const email = useSelector((state)=>state.users.user.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (!email){
      navigate("/login")

    }
  }, [email]);



    return (

      <footer className="py-5 mt-5 border-top bg-white">
        <Container className="text-center">
    
          <p className="text-muted small mb-0">
            Copyright © 2026 | <span style={{ color: 'var(--calm-blue)', fontWeight: '600' }}>Smart Daily Life Team</span>
          </p>
          <p className="text-muted small mt-1" style={{ opacity: 0.8 }}>
            Shihab & Fawaz & Said Salim & Aqeel & Said Taman
          </p>
        </Container>
      </footer>
    );
}

export default Footer;