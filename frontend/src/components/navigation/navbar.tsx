import { Button, Navbar, Dropdown, DropdownButton } from "react-bootstrap";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const NavbarComp = ({ toggleSidebar }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
    toggleSidebar();
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
          title="Hey, User"
          variant="light"
          align="end"
        >
          <Dropdown.Item href="#action1">
            <FaCog style={{ marginRight: "8px" }} /> Settings
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#action2">
            <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </Navbar>
  );
};

export default NavbarComp;
