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

const RuanganComp = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [ruangans, setRuangans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: "Tambah Ruangan",
    fields: [],
    onSubmit: (data) => {},
  });

  useEffect(() => {
    fetchRuangans();
  }, []);

  const fetchRuangans = async () => {
    try {
      const response = await axios.get(`${API_URL}/buildings`);
      setRuangans(response.data);
    } catch (error) {
      console.error("Error fetching ruangans:", error);
      toast.error("Gagal memuat data ruangan.");
    }
  };

  const handleOpenModal = (type, ruangan) => {
    setModalConfig({
      show: true,
      title: type === "create" ? "Tambah Ruangan" : "Edit Ruangan",
      fields: [
        {
          name: "nama",
          label: "Nama Ruangan",
          type: "text",
          value: ruangan?.nama || "",
        },
        {
          name: "kodeRuangan",
          label: "Kode Ruangan",
          type: "text",
          value: ruangan?.kodeRuangan || "",
        },
      ],
      onSubmit:
        type === "create"
          ? handleCreateRuangan
          : (data) => handleUpdateRuangan(ruangan?.id, data),
    });
  };

  const handleCloseModal = () => {
    setModalConfig({ ...modalConfig, show: false });
  };

  const handleCreateRuangan = async (formData) => {
    try {
      await axios.post(`${API_URL}/buildings`, formData);
      fetchRuangans();
      handleCloseModal();
      toast.success("Ruangan berhasil ditambahkan!");
    } catch (error) {
      console.error("Error creating ruangan:", error);
      toast.error("Gagal menambahkan ruangan.");
    }
  };

  const handleUpdateRuangan = async (id, formData) => {
    try {
      await axios.patch(`${API_URL}/buildings/${id}`, formData);
      fetchRuangans();
      handleCloseModal();
      toast.success("Ruangan berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating ruangan:", error);
      toast.error("Gagal memperbarui ruangan.");
    }
  };

  const handleDeleteRuangan = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus ruangan ini?"
    );
    if (confirmed) {
      try {
        await axios.delete(`${API_URL}/buildings/${id}`);
        fetchRuangans();
        toast.success("Ruangan berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting ruangan:", error);
        toast.error("Gagal menghapus ruangan.");
      }
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredBuildings = ruangans.filter(
    (user) =>
      user.nama.toLowerCase().includes(searchQuery) ||
      user.kodeRuangan.toLowerCase().includes(searchQuery)
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
              <h3>Kelola Ruangan</h3>
            </Col>
            <Col md={8}>
              <SearchComp
                onSearch={handleSearch}
                placeholder="Cari Ruangan..."
              />
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                onClick={() => handleOpenModal("create")}
              >
                <FaPlus /> Tambah Ruangan
              </Button>
            </Col>
          </Row>

          <TableComp
            columns={["ID", "Nama Ruangan", "Kode Ruangan", "Aksi"]}
            data={filteredBuildings.map((ruangan) => ({
              ID: ruangan.id,
              "Nama Ruangan": ruangan.nama,
              "Kode Ruangan": ruangan.kodeRuangan,
              Aksi: (
                <>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleOpenModal("update", ruangan)}
                    style={{ marginRight: "5px" }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteRuangan(ruangan.id)}
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

export default RuanganComp;
