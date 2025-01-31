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

const JenisComp = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [jenisRapat, setJenisRapat] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: "Tambah Jenis Rapat",
    fields: [],
    onSubmit: (data) => {},
  });

  useEffect(() => {
    fetchJenisRapat();
  }, []);

  const fetchJenisRapat = async () => {
    try {
      const response = await axios.get(`${API_URL}/meets`);
      setJenisRapat(response.data);
    } catch (error) {
      console.error("Error fetching jenis rapat:", error);
      toast.error("Gagal memuat data jenis rapat.");
    }
  };

  const handleOpenModal = (type, jenis) => {
    setModalConfig({
      show: true,
      title: type === "create" ? "Tambah Jenis Rapat" : "Edit Jenis Rapat",
      fields: [
        {
          name: "nama",
          label: "Nama Jenis Rapat",
          type: "text",
          value: jenis?.nama || "",
        },
        {
          name: "kodeJenisRapat",
          label: "Kode Jenis Rapat",
          type: "text",
          value: jenis?.kodeJenisRapat || "",
        },
      ],
      onSubmit:
        type === "create"
          ? handleCreateJenis
          : (data) => handleUpdateJenis(jenis?.id, data),
    });
  };

  const handleCloseModal = () => {
    setModalConfig({ ...modalConfig, show: false });
  };

  const handleCreateJenis = async (formData) => {
    try {
      await axios.post(`${API_URL}/meets`, formData);
      fetchJenisRapat();
      handleCloseModal();
      toast.success("Jenis rapat berhasil ditambahkan!");
    } catch (error) {
      console.error("Error creating jenis rapat:", error);
      toast.error("Gagal menambahkan jenis rapat.");
    }
  };

  const handleUpdateJenis = async (id, formData) => {
    try {
      await axios.patch(`${API_URL}/meets/${id}`, formData);
      fetchJenisRapat();
      handleCloseModal();
      toast.success("Jenis rapat berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating jenis rapat:", error);
      toast.error("Gagal memperbarui jenis rapat.");
    }
  };

  const handleDeleteJenis = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus jenis rapat ini?"
    );
    if (confirmed) {
      try {
        await axios.delete(`${API_URL}/meets/${id}`);
        fetchJenisRapat();
        toast.success("Jenis rapat berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting jenis rapat:", error);
        toast.error("Gagal menghapus jenis rapat.");
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredJenis = jenisRapat.filter(
    (user) =>
      user.nama.toLowerCase().includes(searchQuery) ||
      user.kodeJenisRapat.toLowerCase().includes(searchQuery)
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
              <h3>Kelola Jenis Rapat</h3>
            </Col>
            <Col md={8}>
              <SearchComp
                onSearch={handleSearch}
                placeholder="Cari Jenis Rapat..."
              />
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                onClick={() => handleOpenModal("create")}
              >
                <FaPlus /> Tambah Jenis Rapat
              </Button>
            </Col>
          </Row>

          <TableComp
            columns={["ID", "Nama Jenis Rapat", "Kode Jenis Rapat", "Aksi"]}
            data={filteredJenis.map((jenis) => ({
              ID: jenis.id,
              "Nama Jenis Rapat": jenis.nama,
              "Kode Jenis Rapat": jenis.kodeJenisRapat,
              Aksi: (
                <>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleOpenModal("update", jenis)}
                    style={{ marginRight: "5px" }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteJenis(jenis.id)}
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

export default JenisComp;
