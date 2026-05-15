import {
  Button,
  Col,
  Label,
  Container,
  Row,
  Form,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validation/UserValidations";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice";
import { useEffect, useState } from "react";
import "../App.css";
import logo from "../Images/logo.jpg";


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchemaValidation) });

  const onSubmit = (data) => {
    console.log("Form Data", data);
  };

  const handleLogin = () => {
    const userData = { email, password };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) navigate("/login");
    if (isSuccess) {
      user.userType === "admin" ? navigate("/manage") : navigate("/");
    }
  }, [user, isError, isSuccess, navigate]);

  return (

    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
      <Container>
        <Row className="justify-content-center">
          
  
          <Col md={5} className="form-container">
            <h2 className="fw-bold text-center mb-4" style={{ color: 'var(--text-dark)' }}>
              Welcome Back
            </h2>
                   <img
                      src={logo}
                      alt="Logo"
                      style={{ width: "120px", marginRight: "20px" }}
                    />
            <p className="text-center text-muted mb-4 small">Please enter your details to sign in</p>
            
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-3">
                <Col md={12}>
                  <Label for="email" className="small fw-bold text-muted">Email Address</Label>
               
                  <input
                    className="form-control border-0 bg-light py-2"
                    type="email"
                    {...register("email")}
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <p className="text-danger small mt-1">{errors.email?.message}</p>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={12}>
                  <Label for="password" className="small fw-bold text-muted">Password</Label>
                  <input
                    className="form-control border-0 bg-light py-2"
                    type="password"
                    {...register("password")}
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                  <p className="text-danger small mt-1">{errors.password?.message}</p>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={12}>
           
                  <Button
                    className="btn-calm w-100 py-2 fw-bold shadow-sm"
                    onClick={() => handleLogin()}
                  >
                    Sign In
                  </Button>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md={12} className="text-center">
                  <p className="small text-muted">
                    Don't have an account? <Link to="/register" className="text-decoration-none fw-bold" style={{ color: 'var(--calm-blue)' }}>Sign Up</Link>
                  </p>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;