import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1️⃣ Seeder User
  const passwordHash = await bcrypt.hash("password123", 10);
  await prisma.user.createMany({
    data: [
      {
        nama: "Mutia Desmarini",
        username: "admin",
        password: passwordHash,
        role: "ADMIN",
      },
      {
        nama: "Nabila Rizky Sarip",
        username: "user1",
        password: passwordHash,
        role: "USER",
      },
      {
        nama: "Dian Sri Agustin",
        username: "user2",
        password: passwordHash,
        role: "USER",
      },
    ],
  });

  // 2️⃣ Seeder Ruangan
  await prisma.ruangan.createMany({
    data: [
      { nama: "Ruang Rapat A", kodeRuangan: "R001" },
      { nama: "Ruang Rapat B", kodeRuangan: "R002" },
      { nama: "Ruang Rapat C", kodeRuangan: "R003" },
    ],
  });

  // 3️⃣ Seeder Jenis Rapat
  await prisma.jenis.createMany({
    data: [
      { nama: "Rapat Koordinasi", kodeJenisRapat: "J001" },
      { nama: "Rapat Evaluasi", kodeJenisRapat: "J002" },
      { nama: "Rapat Strategi", kodeJenisRapat: "J003" },
    ],
  });

  // 4️⃣ Seeder Pimpinan
  await prisma.pimpinan.createMany({
    data: [
      { nama: "Pimpinan A", kodePimpinan: "P001" },
      { nama: "Pimpinan B", kodePimpinan: "P002" },
      { nama: "Pimpinan C", kodePimpinan: "P003" },
    ],
  });

  // 5️⃣ Seeder Hari
  await prisma.hari.createMany({
    data: [
      { hari: "Senin", kodeHari: "H001" },
      { hari: "Selasa", kodeHari: "H002" },
      { hari: "Rabu", kodeHari: "H003" },
      { hari: "Kamis", kodeHari: "H004" },
      { hari: "Jumat", kodeHari: "H005" },
    ],
  });

  // 6️⃣ Seeder Agenda Rapat (Menggunakan Metode FCFS)
  await prisma.agendaRapat.createMany({
    data: [
      {
        nama: "Rapat Mingguan",
        kodeRuangan: "R001",
        kodeHari: "H001",
        jam: "10:00",
        kodePimpinan: "P001",
        peserta: "100 Orang",
        jenisRapatId: 1,
      },
      {
        nama: "Rapat Evaluasi Bulanan",
        kodeRuangan: "R002",
        kodeHari: "H002",
        jam: "11:00",
        kodePimpinan: "P002",
        peserta: "10 Orang",
        jenisRapatId: 2,
      },
      {
        nama: "Rapat Perencanaan Tahunan",
        kodeRuangan: "R003",
        kodeHari: "H003",
        jam: "12:00",
        kodePimpinan: "P003",
        peserta: "100 Orang",
        jenisRapatId: 3,
      },
    ],
  });

  console.log("✅ Seeding selesai!");
}

// Jalankan Seeder
main()
  .catch((e) => {
    console.error("❌ Error saat seeding: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
