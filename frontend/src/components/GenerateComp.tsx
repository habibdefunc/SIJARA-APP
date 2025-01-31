import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import TableComp from "./utils/table";
import FormComp from "./utils/form";
import Sidebar from "./navigation/sidebar";
import NavbarComp from "./navigation/navbar";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchComp from "./utils/search";

const API_URL = import.meta.env.VITE_API_URL;

const GenerateRapatComp = () => {
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
          value: meeting?.kodeRuangan || "Pilih Ruangan",
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

  const handleCreateMeeting = async (formData) => {
    const formattedData = {
      ...formData,
      jenisRapatId: parseInt(formData.jenisRapatId, 10),
    };
    try {
      await axios.post(`${API_URL}/CreateMeets`, formattedData);
      fetchMeetings();
      handleCloseModal();
      toast.success("Rapat berhasil ditambahkan!");
    } catch (error) {
      console.error("Error creating meeting:", error);
      toast.error("Gagal menambahkan rapat. Silakan coba lagi.");
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
              <h3>Generate Rapat</h3>
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
          <Row className="mb-4">
            <Col md={6}>
              <h5>Daftar Ruangan</h5>
              <TableComp
                columns={["Kode Ruangan", "Nama Ruangan"]}
                data={rooms.map((room) => ({
                  "Kode Ruangan": room.kodeRuangan,
                  "Nama Ruangan": room.nama,
                }))}
                tableClass="custom-table"
              />
            </Col>
            <Col md={6}>
              <h5>Daftar Pimpinan</h5>
              <TableComp
                columns={["Kode Pimpinan", "Nama Pimpinan"]}
                data={leaders.map((leader) => ({
                  "Kode Pimpinan": leader.kodePimpinan,
                  "Nama Pimpinan": leader.nama,
                }))}
                tableClass="custom-table"
              />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col md={6}>
              <h5>Daftar Hari</h5>
              <TableComp
                columns={["Kode Hari", "Nama Hari"]}
                data={days.map((day) => ({
                  "Kode Hari": day.kodeHari,
                  "Nama Hari": day.hari,
                }))}
                tableClass="custom-table"
              />
            </Col>
            <Col md={6}>
              <h5>Daftar Jenis Rapat</h5>
              <TableComp
                columns={["ID", "Jenis Rapat"]}
                data={meetingTypes.map((type) => ({
                  ID: type.id,
                  "Jenis Rapat": type.nama,
                }))}
                tableClass="custom-table"
              />
            </Col>
          </Row>

          <h5 className="mt-4">Daftar Rapat</h5>
          <Col md={8}>
            <SearchComp
              onSearch={handleSearch}
              placeholder="Cari Agenda Rapat..."
            />
          </Col>
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
            }))}
            tableClass="custom-table"
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

        h3, h5 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .custom-table {
          width: 100%;
          height: 250px;
          overflow-y: auto;
          table-layout: fixed;
        }

        .custom-table td, .custom-table th {
          padding: 10px;
          text-align: left;
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

export default GenerateRapatComp;
