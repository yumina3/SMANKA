// Data halaman Kesiswaan: organisasi siswa, ekstrakurikuler, dan tata tertib.

export const captionKesiswaan =
  "Kesiswaan SMA Negeri 1 Kajen membina karakter, kepemimpinan, dan bakat peserta didik melalui organisasi siswa, kegiatan ekstrakurikuler, serta penerapan tata tertib yang disiplin dan berkeadilan.";

export const organisasiSiswa = [
  {
    id: "osis",
    nama: "OSIS",
    namaPanjang: "Organisasi Siswa Intra Sekolah",
    deskripsi:
      "Wadah utama kepemimpinan siswa yang menaungi seluruh kegiatan kesiswaan di sekolah.",
    struktur: [
      "Ketua OSIS",
      "Wakil Ketua OSIS",
      "Sekretaris (2 orang)",
      "Bendahara (2 orang)",
      "9 Seksi Bidang",
    ],
    tugas: [
      "Menyusun dan melaksanakan program kerja kesiswaan sepanjang tahun ajaran.",
      "Mengoordinasikan seluruh ekstrakurikuler dan kegiatan sekolah.",
      "Menjadi jembatan komunikasi antara siswa dan pihak sekolah.",
      "Menumbuhkan jiwa kepemimpinan, tanggung jawab, dan kerja sama siswa.",
    ],
  },
  {
    id: "mpk",
    nama: "MPK",
    namaPanjang: "Majelis Perwakilan Kelas",
    deskripsi:
      "Lembaga pengawas dan penyalur aspirasi siswa yang mengawasi kinerja OSIS.",
    struktur: [
      "Ketua MPK",
      "Wakil Ketua MPK",
      "Sekretaris",
      "Anggota dari setiap kelas",
    ],
    tugas: [
      "Mengawasi dan mengevaluasi pelaksanaan program kerja OSIS.",
      "Menampung serta menyalurkan aspirasi siswa kepada sekolah.",
      "Menyusun rekomendasi perbaikan kegiatan kesiswaan.",
      "Menyelenggarakan pemilihan ketua OSIS secara demokratis.",
    ],
  },
];

export const ekstrakurikuler = [
  {
    nama: "Pramuka",
    caption:
      "Melatih kemandirian, kedisiplinan, dan jiwa kepemimpinan melalui kegiatan kepramukaan.",
  },
  {
    nama: "Palang Merah Remaja",
    caption:
      "Membekali siswa keterampilan pertolongan pertama dan kepedulian sosial.",
  },
  {
    nama: "Paskibra",
    caption:
      "Membentuk sikap tegas, rapi, dan cinta tanah air melalui latihan baris-berbaris.",
  },
  {
    nama: "Basket",
    caption:
      "Mengembangkan kebugaran, kerja sama tim, dan sportivitas lewat olahraga basket.",
  },
  {
    nama: "Futsal",
    caption:
      "Menyalurkan minat olahraga sekaligus melatih strategi dan kekompakan tim.",
  },
  {
    nama: "Voly",
    caption:
      "Melatih koordinasi, ketangkasan, dan semangat juang dalam permainan beregu.",
  },
  {
    nama: "Paduan Suara",
    caption:
      "Mengasah kemampuan vokal dan kekompakan untuk mengisi berbagai acara sekolah.",
  },
  {
    nama: "Seni Tari",
    caption:
      "Melestarikan seni budaya daerah serta mengembangkan ekspresi dan kreativitas siswa.",
  },
  {
    nama: "Karya Ilmiah Remaja",
    caption:
      "Menumbuhkan budaya meneliti dan berpikir kritis melalui penulisan karya ilmiah.",
  },
  {
    nama: "Rohis",
    caption:
      "Memperkuat nilai keimanan dan akhlak melalui kajian serta kegiatan keagamaan.",
  },
];

export const tataTertib = {
  kewajiban: [
    "Hadir di sekolah tepat waktu dan mengikuti seluruh pelajaran dengan tertib.",
    "Memakai seragam sekolah lengkap sesuai ketentuan yang berlaku.",
    "Menjaga nama baik sekolah di dalam maupun di luar lingkungan sekolah.",
    "Menghormati guru, karyawan, dan sesama siswa.",
    "Memelihara kebersihan, keamanan, dan ketertiban lingkungan sekolah.",
    "Mengikuti kegiatan sekolah yang telah ditetapkan.",
  ],
  larangan: [
    "Membawa dan menggunakan alat komunikasi tanpa izin saat kegiatan belajar.",
    "Membawa senjata tajam, rokok, narkoba, atau benda berbahaya lainnya.",
    "Melakukan perundungan, kekerasan, atau tindakan tidak menyenangkan.",
    "Membolos, keluar kelas, atau meninggalkan sekolah tanpa izin.",
    "Merusak fasilitas dan sarana prasarana sekolah.",
    "Mencoret-coret dinding, meja, atau fasilitas sekolah.",
  ],
};
