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

const HariComp = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [days, setDays] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: "Tambah Hari",
    fields: [],
    onSubmit: (data) => {},
  });

  useEffect(() => {
    fetchDays();
  }, []);

  const fetchDays = async () => {
    try {
      const response = await axios.get(`${API_URL}/days`);
      setDays(response.data);
    } catch (error) {
      console.error("Error fetching days:", error);
      toast.error("Gagal memuat data hari.");
    }
  };

  const handleOpenModal = (type, day) => {
    setModalConfig({
      show: true,
      title: type === "create" ? "Tambah Hari" : "Edit Hari",
      fields: [
        {
          name: "hari",
          label: "Hari",
          type: "text",
          value: day?.hari || "",
        },
        {
          name: "kodeHari",
          label: "Kode Hari",
          type: "text",
          value: day?.kodeHari || "",
        },
      ],
      onSubmit:
        type === "create"
          ? handleCreateDay
          : (data) => handleUpdateDay(day?.id, data),
    });
  };

  const handleCloseModal = () => {
    setModalConfig({ ...modalConfig, show: false });
  };

  const handleCreateDay = async (formData) => {
    try {
      await axios.post(`${API_URL}/days`, formData);
      fetchDays();
      handleCloseModal();
      toast.success("Hari berhasil ditambahkan!");
    } catch (error) {
      console.error("Error creating day:", error);
      toast.error("Gagal menambahkan hari.");
    }
  };

  const handleUpdateDay = async (id, formData) => {
    try {
      await axios.patch(`${API_URL}/days/${id}`, formData);
      fetchDays();
      handleCloseModal();
      toast.success("Hari berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating day:", error);
      toast.error("Gagal memperbarui hari.");
    }
  };

  const handleDeleteDay = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus hari ini?"
    );
    if (confirmed) {
      try {
        await axios.delete(`${API_URL}/days/${id}`);
        fetchDays();
        toast.success("Hari berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting day:", error);
        toast.error("Gagal menghapus hari.");
      }
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredDays = days.filter(
    (user) =>
      user.hari.toLowerCase().includes(searchQuery) ||
      user.kodeHari.toLowerCase().includes(searchQuery)
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
              <h3>Kelola Hari</h3>
            </Col>
            <Col md={8}>
              <SearchComp onSearch={handleSearch} placeholder="Cari Hari..." />
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                onClick={() => handleOpenModal("create")}
              >
                <FaPlus /> Tambah Hari
              </Button>
            </Col>
          </Row>

          <TableComp
            columns={["ID", "Hari", "Kode Hari", "Aksi"]}
            data={filteredDays.map((day) => ({
              ID: day.id,
              Hari: day.hari,
              "Kode Hari": day.kodeHari,
              Aksi: (
                <>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleOpenModal("update", day)}
                    style={{ marginRight: "5px" }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteDay(day.id)}
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

export default HariComp;
