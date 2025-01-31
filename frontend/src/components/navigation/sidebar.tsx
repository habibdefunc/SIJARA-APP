import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPlusCircle,
  FaCalendarCheck,
  FaUser,
  FaBuilding,
  FaClipboard,
  FaRegCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import Footer from "./footer";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Sidebar = ({ sidebarVisible }: any) => {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("user");

    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserRole(parsedUser.role); // Ambil role langsung dari sessionStorage

      // Jika role belum tersimpan, fetch dari API
      if (!parsedUser.role) {
        const fetchUserRole = async () => {
          try {
            const response = await axios.get(`${API_URL}/users`, {
              params: { username: parsedUser.username },
            });
            if (response.status === 200) {
              setUserRole(response.data.role);
              parsedUser.role = response.data.role;
              sessionStorage.setItem("user", JSON.stringify(parsedUser)); // Simpan role di sessionStorage
            }
          } catch (error) {
            console.error("Gagal mengambil role pengguna", error);
          }
        };
        fetchUserRole();
      }
    }
  }, []);

  return (
    <div
      className={`sidebar text-white p-3 ${
        sidebarVisible ? "d-block" : "d-none"
      }`}
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        width: "250px",
        backgroundColor: "#16404D",
        transition: "all 0.3s",
        borderRight: "1px solid white",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img
          src="../../../public/dishub.png"
          alt="Logo"
          style={{ width: "50px", height: "50px" }}
        />
      </div>
      <h4 style={{ textAlign: "center", marginBottom: "20px" }}>SIJARA</h4>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          height: "calc(100vh - 150px)",
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #16404D",
        }}
      >
        <Nav className="flex-column">
          {/* Menu yang selalu muncul untuk semua role */}
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/"
              className="text-white d-flex align-items-center"
            >
              <FaTachometerAlt style={{ marginRight: "8px" }} />
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <hr className="sidebar-divider" />

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/CreateMeets"
              className="text-white d-flex align-items-center"
            >
              <FaPlusCircle style={{ marginRight: "8px" }} />
              Buat Rapat
            </Nav.Link>
          </Nav.Item>

          {/* Menu khusus untuk ADMIN */}
          {userRole === "ADMIN" && (
            <>
              <hr className="sidebar-divider" />
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/ManageMeets"
                  className="text-white d-flex align-items-center"
                >
                  <FaCalendarCheck style={{ marginRight: "8px" }} />
                  Kelola Rapat
                </Nav.Link>
              </Nav.Item>
              <hr className="sidebar-divider" />

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/leaders"
                  className="text-white d-flex align-items-center"
                >
                  <FaUser style={{ marginRight: "8px" }} />
                  Kelola Pimpinan
                </Nav.Link>
              </Nav.Item>
              <hr className="sidebar-divider" />

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/buildings"
                  className="text-white d-flex align-items-center"
                >
                  <FaBuilding style={{ marginRight: "8px" }} />
                  Kelola Ruangan
                </Nav.Link>
              </Nav.Item>
              <hr className="sidebar-divider" />

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/meets"
                  className="text-white d-flex align-items-center"
                >
                  <FaClipboard style={{ marginRight: "8px" }} />
                  Kelola Jenis Rapat
                </Nav.Link>
              </Nav.Item>
              <hr className="sidebar-divider" />

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/days"
                  className="text-white d-flex align-items-center"
                >
                  <FaRegCalendarAlt style={{ marginRight: "8px" }} />
                  Kelola Hari
                </Nav.Link>
              </Nav.Item>
              <hr className="sidebar-divider" />

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/users"
                  className="text-white d-flex align-items-center"
                >
                  <FaUsers style={{ marginRight: "8px" }} />
                  Kelola User
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>

        <Footer />
      </div>

      <style>{`
        .sidebar::-webkit-scrollbar {
          width: 8px;
        }
        .sidebar::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 10px;
        }
        .sidebar::-webkit-scrollbar-track {
          background-color: #16404d;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
