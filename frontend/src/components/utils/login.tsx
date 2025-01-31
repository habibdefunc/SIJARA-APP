import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  Image,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const LoginComp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.get(`${API_URL}/users`, {
        params: {
          username: formData.username,
          password: formData.password,
        },
      });

      if (response.status === 200) {
        const user = response.data.find(
          (user: any) => user.username === formData.username
        );
        if (user) {
          setFormData((prevData) => ({
            ...prevData,
            role: user.role, // Set the role here
          }));

          const data = { username: formData.username, role: user.role };
          if (formData.remember) {
            localStorage.setItem("user", JSON.stringify(data));
          } else {
            sessionStorage.setItem("user", JSON.stringify(data));
          }

          setToastMessage("Login Successful!");
          setToastVariant("success");
          setShowToast(true);
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          setToastMessage("User not found.");
          setToastVariant("danger");
          setShowToast(true);
        }
      } else {
        setToastMessage(
          response.data.message || "Login failed. Please try again."
        );
        setToastVariant("danger");
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("An error occurred. Please try again later.");
      setToastVariant("danger");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="login-container d-flex align-items-center justify-content-center"
    >
      <Row className="align-items-center w-100">
        <Col md={6} className="d-none d-md-block text-center">
          <Image
            src="../../../public/login.svg"
            alt="Illustration"
            fluid
            className="login-illustration"
          />
        </Col>
        <Col xs={12} md={6}>
          <div className="login-card p-4 p-md-5">
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
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
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
              <Form.Group className="mb-3" controlId="formRememberMe">
                <Form.Check
                  type="checkbox"
                  name="remember"
                  label="Remember me"
                  checked={formData.remember}
                  onChange={handleChange}
                />
              </Form.Group>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

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
