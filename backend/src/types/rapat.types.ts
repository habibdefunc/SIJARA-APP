export interface CreateAgendaInput {
  nama: string;
  kodeRuangan: string;
  kodeHari: string;
  jam: string;
  kodePimpinan: string;
  peserta: string;
  jenisRapatId: number;
}

export interface UpdateAgendaInput {
  nama?: string;
  kodeRuangan?: string;
  kodeHari?: string;
  jam?: string;
  kodePimpinan?: string;
  peserta?: string;
  jenisRapatId?: number;
}
