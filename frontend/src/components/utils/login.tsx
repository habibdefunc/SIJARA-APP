import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Image,
} from "react-bootstrap";

const LoginComp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Container
      fluid
      className="login-container d-flex align-items-center justify-content-center"
    >
      <Row className="align-items-center w-100">
        {/* Bagian Kiri: Ilustrasi */}
        <Col md={6} className="d-none d-md-block text-center">
          <Image
            src="../../../public/login.svg"
            alt="Illustration"
            fluid
            className="login-illustration"
          />
        </Col>

        {/* Bagian Kanan: Form Login */}
        <Col xs={12} md={6}>
          <div className="login-card p-4 p-md-5">
            {/* Logo dan Tulisan */}
            <div className="text-center mb-4">
              <Image
                src="../../../public/dishub.png"
                alt="Logo SIJARA"
                fluid
                className="logo mb-3"
              />
              <h2 className="sijara-title">SIJARA</h2>
              <p className="sijara-subtitle">
                Sistem Informasi Penjadwalan Rapat
              </p>
            </div>

            {/* Form */}
            <Form onSubmit={handleSubmit}>
              {/* Email Field */}
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {/* Password Field */}
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputGroup>
              </Form.Group>

              {/* Remember Me Checkbox */}
              <Form.Group className="mb-3" controlId="formRememberMe">
                <Form.Check
                  type="checkbox"
                  name="remember"
                  label="Remember me"
                  checked={formData.remember}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* Submit Button */}
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Custom CSS */}
      <style>{`
        .login-container {
          min-height: 100vh;
          background-color: #16404D;
          color: #fff;
        }

        .login-card {
          max-width: 450px;
          margin: 0 auto;
          background: #fff;
          color: #333;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .sijara-title {
          font-size: 2rem;
          font-weight: bold;
          color: #16404D;
        }

        .sijara-subtitle {
          font-size: 1rem;
          font-weight: 400;
          color: #666;
        }

        .form-control {
          border-radius: 8px;
        }

        .btn-primary {
          background-color: #16404D;
          border: none;
          border-radius: 8px;
        }

        .btn-primary:hover {
          background-color: #0f2c36;
        }

        .btn-outline-secondary {
          border-radius: 8px;
        }

        .form-check-label {
          font-size: 0.9rem;
        }

        .login-illustration {
          max-width: 80%;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .logo {
          max-width: 80px;
          height: auto;
        }

        @media (max-width: 768px) {
          .login-illustration {
            max-width: 60%;
          }
        }
      `}</style>
    </Container>
  );
};

export default LoginComp;
