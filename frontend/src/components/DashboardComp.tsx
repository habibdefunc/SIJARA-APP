import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaCalendarCheck,
  FaUserTie,
  FaBuilding,
  FaClipboardList,
  FaRegCalendarAlt,
} from "react-icons/fa";
import Sidebar from "./navigation/sidebar";
import NavbarComp from "./navigation/navbar";

const DashboardComp = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userData = sessionStorage.getItem("user");

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserRole(parsedUser.role);
      setUsername(parsedUser.username);
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Data card berdasarkan role
  const adminCards = [
    { title: "Kelola User", icon: <FaUsers />, link: "/users" },
    {
      title: "Generate Rapat",
      icon: <FaCalendarCheck />,
      link: "/CreateMeets",
    },
    { title: "Kelola Rapat", icon: <FaCalendarCheck />, link: "/ManageMeets" },
    { title: "Kelola Pimpinan", icon: <FaUserTie />, link: "/leaders" },
    { title: "Kelola Ruangan", icon: <FaBuilding />, link: "/buildings" },
    { title: "Kelola Jenis Rapat", icon: <FaClipboardList />, link: "/meets" },
    { title: "Kelola Hari", icon: <FaRegCalendarAlt />, link: "/days" },
  ];

  const userCards = [
    { title: "Dashboard", icon: <FaCalendarCheck />, link: "/" },
    {
      title: "Generate Rapat",
      icon: <FaCalendarCheck />,
      link: "/CreateMeets",
    },
  ];

  const displayedCards = userRole === "ADMIN" ? adminCards : userCards;

  return (
    <div className="d-flex dashboard-container">
      <Sidebar sidebarVisible={sidebarVisible} />
      <div
        className={`content-area ${
          sidebarVisible ? "with-sidebar" : "without-sidebar"
        }`}
      >
        <NavbarComp toggleSidebar={toggleSidebar} />
        <Container fluid className="mt-4">
          <h3>
            Selamat Datang, <span className="username">{username}</span>!
          </h3>
          <Row className="justify-content-center">
            {displayedCards.map((card, index) => (
              <Col
                key={index}
                lg={4}
                md={6}
                sm={12}
                className="d-flex justify-content-center"
              >
                <Card className="custom-card">
                  <Card.Body className="text-center">
                    <div className="card-icon">{card.icon}</div>
                    <h5>{card.title}</h5>
                    <Link to={card.link}>
                      <Button variant="link">Lihat</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <style>{`
      .dashboard-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }

      .content-area {
        margin-left: 250px;
        transition: all 0.3s;
        flex: 1;
        padding-bottom: 50px;
      }

      .content-area.without-sidebar {
        margin-left: 0;
      }

      h3 {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 20px;
      }

      .username {
        color: #16404D;
        font-weight: bold;
      }

      .custom-card {
        margin-bottom: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 300px;
      }

      .custom-card .card-body {
        padding: 20px;
        text-align: center;
      }

      .card-icon {
        font-size: 40px;
        margin-bottom: 10px;
        color: indigo;
      }

      .custom-card h5 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      @media (max-width: 768px) {
        .content-area {
          margin-left: 0;
        }
      }
      `}</style>
    </div>
  );
};

export default DashboardComp;
