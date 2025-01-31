import { useState, useEffect } from "react";
import { Button, Navbar, Dropdown, DropdownButton } from "react-bootstrap";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavbarComp = ({ toggleSidebar }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
    toggleSidebar();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="p-3" style={{ backgroundColor: "#16404D" }}>
      <Button
        variant="outline-light"
        onClick={handleSidebarToggle}
        style={{ border: "none" }}
      >
        {sidebarOpen ? <FaBars /> : <FaTimes />}
      </Button>

      <div className="ms-auto d-flex align-items-center">
        <DropdownButton
          id="dropdown-custom-components"
          title={`Hey, ${user?.username || "User"}`}
          variant="light"
          align="end"
        >
          <Dropdown.Item href="#action1">
            <FaCog style={{ marginRight: "8px" }} /> Settings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </Navbar>
  );
};

export default NavbarComp;
