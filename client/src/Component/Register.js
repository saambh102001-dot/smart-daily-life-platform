import { userSchemaValidation } from "../Validation/UserValidations.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { registerUser } from "../Features/UserSlice.js";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Label,
  Container,
  Row,
  Form,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchemaValidation) });

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        userType: "user",
      };
      dispatch(registerUser(userData));
      alert("User added.");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
  
    <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: '90vh' }}>
      <Container>
        <Row className="justify-content-center">
   
          <Col md={6} lg={5} className="form-container">
            <h2 className="fw-bold text-center mb-4" style={{ color: 'var(--text-dark)' }}>
              Create Account
            </h2>
            <p className="text-center text-muted mb-4 small">Join us to manage your daily tasks efficiently</p>

            <Form onSubmit={handleSubmit(onSubmit)}>
           
              <Row className="mb-3">
                <Col md={12}>
                  <Label className="small fw-bold text-muted">Full Name</Label>
                  <input
                    type="text"
                    {...register("name", { onChange: (e) => setname(e.target.value) })}
                    className="form-control border-0 bg-light py-2"
                    placeholder="Enter your name"
                  />
                  <p className="text-danger small mt-1">{errors.name?.message}</p>
                </Col>
              </Row>

          
              <Row className="mb-3">
                <Col md={12}>
                  <Label className="small fw-bold text-muted">Email Address</Label>
                  <input
                    type="email"
                    {...register("email", { onChange: (e) => setemail(e.target.value) })}
                    className="form-control border-0 bg-light py-2"
                    placeholder="example@mail.com"
                  />
                  <p className="text-danger small mt-1">{errors.email?.message}</p>
                </Col>
              </Row>

          
              <Row className="mb-3">
                <Col md={12}>
                  <Label className="small fw-bold text-muted">Password</Label>
                  <input
                    type="password"
                    {...register("password", { onChange: (e) => setpassword(e.target.value) })}
                    className="form-control border-0 bg-light py-2"
                  />
                  <p className="text-danger small mt-1">{errors.password?.message}</p>
                </Col>
              </Row>

          
              <Row className="mb-4">
                <Col md={12}>
                  <Label className="small fw-bold text-muted">Confirm Password</Label>
                  <input
                    type="password"
                    {...register("confirmPassword", { onChange: (e) => setconfirmPassword(e.target.value) })}
                    className="form-control border-0 bg-light py-2"
                  />
                  <p className="text-danger small mt-1">{errors.confirmPassword?.message}</p>
                </Col>
              </Row>

          
              <Row>
                <Col md={12}>
                  <Button className="btn-calm w-100 py-2 fw-bold shadow-sm">
                    Register Now
                  </Button>
                </Col>
              </Row>

         
              <Row className="mt-4">
                <Col md={12} className="text-center">
                  <p className="small text-muted">
                    Already have an account? <Link to="/login" className="text-decoration-none fw-bold" style={{ color: 'var(--calm-blue)' }}>Login here</Link>
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

export default Register;