import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

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
          <h3>Selamat Datang di Dashboard</h3>
          <Row>
            <Col lg={4} md={6} sm={12}>
              <Card className="custom-card">
                <Card.Body className="text-center">
                  <FaUsers className="card-icon" />
                  <h5>Kelola User</h5>
                  <Button variant="link">See</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Card className="custom-card">
                <Card.Body className="text-center">
                  <FaCalendarCheck className="card-icon" />
                  <h5>Kelola Rapat</h5>
                  <Button variant="link">See</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Card className="custom-card">
                <Card.Body className="text-center">
                  <FaUserTie className="card-icon" />
                  <h5>Kelola Pimpinan</h5>
                  <Button variant="link">See</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Card className="custom-card">
                <Card.Body className="text-center">
                  <FaBuilding className="card-icon" />
                  <h5>Kelola Ruangan</h5>
                  <Button variant="link">See</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Card className="custom-card">
                <Card.Body className="text-center">
                  <FaClipboardList className="card-icon" />
                  <h5>Kelola Jenis Rapat</h5>
                  <Button variant="link">See</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={4} md={6} sm={12}>
              <Card className="custom-card">
                <Card.Body className="text-center">
                  <FaRegCalendarAlt className="card-icon" />
                  <h5>Kelola Hari</h5>
                  <Button variant="link">See</Button>
                </Card.Body>
              </Card>
            </Col>
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

.custom-card {
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-card .card-body {
  padding: 20px;
  text-align: center;
}

.card-icon {
  font-size: 40px;
  margin-bottom: 10px;
  color : indigo;
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
