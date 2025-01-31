import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import TableComp from "./utils/table";
import FormComp from "./utils/form";
import Sidebar from "./navigation/sidebar";
import NavbarComp from "./navigation/navbar";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchComp from "./utils/search";

const API_URL = import.meta.env.VITE_API_URL;

const UserComp = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState(["USER", "ADMIN"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: "Tambah User",
    fields: [],
    onSubmit: (data) => {},
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Gagal memuat data pengguna.");
    }
  };

  const handleOpenModal = (type, user) => {
    setModalConfig({
      show: true,
      title: type === "create" ? "Tambah User" : "Edit User",
      fields: [
        { name: "nama", label: "Nama", type: "text", value: user?.nama || "" },
        {
          name: "username",
          label: "Username",
          type: "text",
          value: user?.username || "",
        },
        { name: "password", label: "Password", type: "password", value: "" },
        {
          name: "role",
          label: "Role",
          type: "select",
          options: roles,
          value: user?.role || "USER",
        },
      ],
      onSubmit:
        type === "create"
          ? handleCreateUser
          : (data) => handleUpdateUser(user?.id, data),
    });
  };

  const handleCloseModal = () => {
    setModalConfig({ ...modalConfig, show: false });
  };

  const handleCreateUser = async (formData) => {
    try {
      await axios.post(`${API_URL}/users`, formData);
      fetchUsers();
      handleCloseModal();
      toast.success("User berhasil ditambahkan!");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Gagal menambahkan user.");
    }
  };

  const handleUpdateUser = async (id, formData) => {
    try {
      await axios.patch(`${API_URL}/users/${id}`, formData);
      fetchUsers();
      handleCloseModal();
      toast.success("User berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Gagal memperbarui user.");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus user ini?"
    );
    if (confirmed) {
      try {
        await axios.delete(`${API_URL}/users/${id}`);
        fetchUsers();
        toast.success("User berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Gagal menghapus user.");
      }
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nama.toLowerCase().includes(searchQuery) ||
      user.username.toLowerCase().includes(searchQuery) ||
      user.role.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="d-flex dashboard-container">
      <Sidebar sidebarVisible={sidebarVisible} />
      <div
        className={`content-area ${
          sidebarVisible ? "with-sidebar" : "without-sidebar"
        }`}
      >
        <NavbarComp toggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
        <Container fluid className="mt-4">
          <Row className="mb-3">
            <Col>
              <h3>Kelola User</h3>
            </Col>
            <Col md={8}>
              <SearchComp onSearch={handleSearch} placeholder="Cari user..." />
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                onClick={() => handleOpenModal("create")}
              >
                <FaPlus /> Tambah User
              </Button>
            </Col>
          </Row>

          <TableComp
            columns={["ID", "Nama", "Username", "Role", "Aksi"]}
            data={filteredUsers.map((user) => ({
              ID: user.id,
              Nama: user.nama,
              Username: user.username,
              Role: user.role,
              Aksi: (
                <>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleOpenModal("update", user)}
                    style={{ marginRight: "5px" }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FaTrash />
                  </Button>
                </>
              ),
            }))}
          />

          <FormComp
            title={modalConfig.title}
            fields={modalConfig.fields}
            onSubmit={modalConfig.onSubmit}
            onClose={handleCloseModal}
            show={modalConfig.show}
          />
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

        @media (max-width: 768px) {
          .content-area {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default UserComp;
