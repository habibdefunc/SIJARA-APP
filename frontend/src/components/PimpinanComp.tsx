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

const PimpinanComp = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [pimpinans, setPimpinans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: "Tambah Pimpinan",
    fields: [],
    onSubmit: (data) => {},
  });

  useEffect(() => {
    fetchPimpinans();
  }, []);

  const fetchPimpinans = async () => {
    try {
      const response = await axios.get(`${API_URL}/leaders`);
      setPimpinans(response.data);
    } catch (error) {
      console.error("Error fetching pimpinans:", error);
      toast.error("Gagal memuat data pimpinan.");
    }
  };

  const handleOpenModal = (type, pimpinan) => {
    setModalConfig({
      show: true,
      title: type === "create" ? "Tambah Pimpinan" : "Edit Pimpinan",
      fields: [
        {
          name: "nama",
          label: "Nama",
          type: "text",
          value: pimpinan?.nama || "",
        },
        {
          name: "kodePimpinan",
          label: "Kode Pimpinan",
          type: "text",
          value: pimpinan?.kodePimpinan || "",
        },
      ],
      onSubmit:
        type === "create"
          ? handleCreatePimpinan
          : (data) => handleUpdatePimpinan(pimpinan?.id, data),
    });
  };

  const handleCloseModal = () => {
    setModalConfig({ ...modalConfig, show: false });
  };

  const handleCreatePimpinan = async (formData) => {
    try {
      await axios.post(`${API_URL}/leaders`, formData);
      fetchPimpinans();
      handleCloseModal();
      toast.success("Pimpinan berhasil ditambahkan!");
    } catch (error) {
      console.error("Error creating pimpinan:", error);
      toast.error("Gagal menambahkan pimpinan.");
    }
  };

  const handleUpdatePimpinan = async (id, formData) => {
    try {
      await axios.patch(`${API_URL}/leaders/${id}`, formData);
      fetchPimpinans();
      handleCloseModal();
      toast.success("Pimpinan berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating pimpinan:", error);
      toast.error("Gagal memperbarui pimpinan.");
    }
  };

  const handleDeletePimpinan = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus pimpinan ini?"
    );
    if (confirmed) {
      try {
        await axios.delete(`${API_URL}/leaders/${id}`);
        fetchPimpinans();
        toast.success("Pimpinan berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting pimpinan:", error);
        toast.error("Gagal menghapus pimpinan.");
      }
    }
  };
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredLeaders = pimpinans.filter(
    (user) =>
      user.nama.toLowerCase().includes(searchQuery) ||
      user.kodePimpinan.toLowerCase().includes(searchQuery)
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
              <h3>Kelola Pimpinan</h3>
            </Col>
            <Col md={8}>
              <SearchComp
                onSearch={handleSearch}
                placeholder="Cari Pimpinan..."
              />
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                onClick={() => handleOpenModal("create")}
              >
                <FaPlus /> Tambah Pimpinan
              </Button>
            </Col>
          </Row>

          <TableComp
            columns={["ID", "Nama", "Kode Pimpinan", "Aksi"]}
            data={filteredLeaders.map((pimpinan) => ({
              ID: pimpinan.id,
              Nama: pimpinan.nama,
              "Kode Pimpinan": pimpinan.kodePimpinan,
              Aksi: (
                <>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleOpenModal("update", pimpinan)}
                    style={{ marginRight: "5px" }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeletePimpinan(pimpinan.id)}
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

export default PimpinanComp;
