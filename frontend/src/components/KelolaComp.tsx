import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
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

const KelolaRapatComp = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [meetings, setMeetings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [days, setDays] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [meetingTypes, setMeetingTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalConfig, setModalConfig] = useState({
    show: false,
    title: "Tambah Rapat",
    fields: [],
    onSubmit: (data) => {},
  });

  useEffect(() => {
    fetchMeetings();
    fetchRooms();
    fetchDays();
    fetchLeaders();
    fetchMeetingTypes();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await axios.get(`${API_URL}/CreateMeets`);
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
      toast.error("Gagal memuat data rapat.");
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${API_URL}/buildings`);
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      toast.error("Gagal memuat data ruangan.");
    }
  };

  const fetchDays = async () => {
    try {
      const response = await axios.get(`${API_URL}/days`);
      setDays(response.data);
    } catch (error) {
      console.error("Error fetching days:", error);
      toast.error("Gagal memuat data hari.");
    }
  };

  const fetchLeaders = async () => {
    try {
      const response = await axios.get(`${API_URL}/leaders`);
      setLeaders(response.data);
    } catch (error) {
      console.error("Error fetching leaders:", error);
      toast.error("Gagal memuat data pimpinan.");
    }
  };

  const fetchMeetingTypes = async () => {
    try {
      const response = await axios.get(`${API_URL}/meets`);
      setMeetingTypes(response.data);
    } catch (error) {
      console.error("Error fetching meeting types:", error);
      toast.error("Gagal memuat data jenis rapat.");
    }
  };

  const handleOpenModal = (type, meeting) => {
    setModalConfig({
      show: true,
      title: type === "create" ? "Tambah Rapat" : "Edit Rapat",
      fields: [
        {
          name: "nama",
          label: "Nama Rapat",
          type: "text",
          value: meeting?.nama || "",
        },
        {
          name: "kodeRuangan",
          label: "Kode Ruangan",
          type: "select",
          options: rooms.map((room) => room.kodeRuangan),
          value: meeting?.kodeRuangan || "",
        },
        {
          name: "kodeHari",
          label: "Kode Hari",
          type: "select",
          options: days.map((day) => day.kodeHari),
          value: meeting?.kodeHari || "",
        },
        {
          name: "jam",
          label: "Jam",
          type: "text",
          value: meeting?.jam || "",
        },
        {
          name: "kodePimpinan",
          label: "Kode Pimpinan",
          type: "select",
          options: leaders.map((leader) => leader.kodePimpinan),
          value: meeting?.kodePimpinan || "",
        },
        {
          name: "peserta",
          label: "Peserta",
          type: "text",
          value: meeting?.peserta || "",
        },
        {
          name: "jenisRapatId",
          label: "Jenis Rapat",
          type: "select",
          options: meetingTypes.map((type) => type.id),
          value: meeting?.jenisRapatId || "",
        },
      ],
      onSubmit:
        type === "create"
          ? handleCreateMeeting
          : (data) => handleUpdateMeeting(meeting?.id, data),
    });
  };

  const handleCloseModal = () => {
    setModalConfig({ ...modalConfig, show: false });
  };

  const checkRoomAvailability = (formData) => {
    const isConflict = meetings.some(
      (meeting) =>
        meeting.kodeRuangan === formData.kodeRuangan &&
        meeting.kodeHari === formData.kodeHari &&
        meeting.jam === formData.jam
    );

    if (isConflict) {
      toast.error("Ruangan sudah terisi pada waktu yang dipilih.");
      return false;
    }
    return true;
  };

  const handleCreateMeeting = async (formData) => {
    if (!checkRoomAvailability(formData)) return;
    const formattedData = {
      ...formData,
      jenisRapatId: parseInt(formData.jenisRapatId, 10),
    };

    console.log("Form data yang akan dikirim:", formattedData);

    try {
      await axios.post(`${API_URL}/CreateMeets`, formattedData);
      fetchMeetings();
      handleCloseModal();
      toast.success("Rapat berhasil ditambahkan!");
    } catch (error) {
      console.error("Error creating meeting:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error("Status code:", error.response.status);
      }
      toast.error("Gagal menambahkan rapat. Silakan coba lagi.");
    }
  };

  const handleUpdateMeeting = async (id, formData) => {
    const existingMeeting = meetings.find((meeting) => meeting.id === id);
    if (!existingMeeting) {
      toast.error("Rapat tidak ditemukan.");
      return;
    }

    const isDataChanged = Object.keys(formData).some(
      (key) => formData[key] !== String(existingMeeting[key])
    );

    if (!isDataChanged) {
      toast.info("Tidak ada perubahan pada data rapat.");
      return;
    }

    const requiresRoomCheck =
      formData.kodeRuangan !== String(existingMeeting.kodeRuangan) ||
      formData.kodeHari !== String(existingMeeting.kodeHari) ||
      formData.jam !== String(existingMeeting.jam);

    if (requiresRoomCheck && !checkRoomAvailability(formData)) return;

    const formattedData = {
      ...formData,
      jenisRapatId: parseInt(formData.jenisRapatId, 10),
    };

    try {
      await axios.patch(`${API_URL}/CreateMeets/${id}`, formattedData);
      fetchMeetings();
      handleCloseModal();
      toast.success("Rapat berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating meeting:", error);
      toast.error("Gagal memperbarui rapat.");
    }
  };

  const handleDeleteMeeting = async (id) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus rapat ini?"
    );
    if (confirmed) {
      try {
        await axios.delete(`${API_URL}/CreateMeets/${id}`);
        fetchMeetings();
        toast.success("Rapat berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting meeting:", error);
        toast.error("Gagal menghapus rapat.");
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };
  const filteredMeets = meetings.filter((user) =>
    user.nama.toLowerCase().includes(searchQuery)
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
              <h3>Kelola Rapat</h3>
            </Col>
            <Col md={8}>
              <SearchComp
                onSearch={handleSearch}
                placeholder="Cari Agenda Rapat..."
              />
            </Col>
            <Col className="text-end">
              <Button
                variant="primary"
                onClick={() => handleOpenModal("create")}
              >
                <FaPlus /> Tambah Rapat
              </Button>
            </Col>
          </Row>

          <TableComp
            columns={[
              "ID",
              "Nama Rapat",
              "Ruangan",
              "Hari",
              "Jam",
              "Pimpinan",
              "Peserta",
              "Jenis Rapat Id",
              "Aksi",
            ]}
            data={filteredMeets.map((meeting) => ({
              ID: meeting.id,
              "Nama Rapat": meeting.nama,
              Ruangan: meeting.kodeRuangan,
              Hari: meeting.kodeHari,
              Jam: meeting.jam,
              Pimpinan: meeting.kodePimpinan,
              Peserta: meeting.peserta,
              "Jenis Rapat Id": meeting.jenisRapatId,
              Aksi: (
                <>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    onClick={() => handleOpenModal("update", meeting)}
                    style={{ marginRight: "5px" }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteMeeting(meeting.id)}
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

export default KelolaRapatComp;
