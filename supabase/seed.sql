-- =============================================================
-- Seed data awal: Website Profil SMA Negeri 1 Kajen
-- Jalankan setelah 0001_init.sql (Supabase -> SQL Editor).
-- Aman dijalankan ulang (mengosongkan lalu mengisi ulang).
-- =============================================================

-- ---------- Profil sekolah ----------
insert into public.profil_sekolah (
  id, nama, slogan, alamat, telepon, email, visi, misi,
  sambutan_teks, sambutan_nama, sambutan_jabatan, sambutan_gambar,
  sejarah, fasilitas, ekstrakurikuler, prestasi, program_unggulan, kelas
) values (
  1,
  'SMA Negeri 1 Kajen',
  'Mandiri, Agamis, Terdepan dalam prestasi dan Berwawasan lingkungan',
  'Jl. Ahmad Yani No. 1, Kajen, Kabupaten Pekalongan, Jawa Tengah 51161',
  '(0285) 381 708',
  'smankajen@gmail.com',
  'Unggul dalam prestasi, Luhur dalam budi pekerti dan berwawasan lingkungan',
  array[
    'Membuat kelulusan yang unggul dalam akademik, memiliki keyakinan kepada Tuhan, dan berakhlak mulia.',
    'Meningkatkan kualitas kegiatan belajar mengajar secara efektif dan efisien.',
    'Menanamkan disiplin dan sikap kepribadian yang tinggi di lingkungan sekolah.',
    'Membangun komitmen yang tinggi dari seluruh anggota komunitas sekolah terhadap visi sekolah.'
  ],
  'Assalamualaikum warahmatullahi wabarakatuh. Selamat datang di website resmi SMA Negeri 1 Kajen. Kami berkomitmen menyelenggarakan pendidikan yang bermutu, membina karakter, dan menyiapkan generasi yang siap menghadapi tantangan zaman. Melalui media ini kami berbagi informasi kegiatan dan capaian sekolah sebagai wujud keterbukaan kepada masyarakat.',
  'Ircham Junaidi S.Pd., M.Pd.',
  'Kepala SMA Negeri 1 Kajen',
  '/sambutan.jpg',
  '[
    {"tahun":"1965","teks":"Berdiri sebagai sekolah menengah atas pertama di Kecamatan Kajen dengan dua ruang kelas."},
    {"tahun":"1988","teks":"Mendapatkan akreditasi pertama dan mulai memperluas gedung serta sarana pembelajaran."},
    {"tahun":"2004","teks":"Menerapkan Kurikulum Berbasis Kompetensi dan membuka kelas peminatan ilmu alam serta ilmu sosial."},
    {"tahun":"2016","teks":"Meraih akreditasi A dan mulai mengembangkan pembelajaran berbasis teknologi informasi."},
    {"tahun":"2023","teks":"Menerapkan Kurikulum Merdeka dan memperoleh berbagai prestasi tingkat provinsi dan nasional."}
  ]'::jsonb,
  array[
    '3 Ruangan Seni (Musik, Tari, Melukis) ',
    'Laboratorium IPA (Fisika, Kimia, Biologi)',
    'Laboratorium komputer dan bahasa',
    'Perpustakaan dan ruang baca digital',
    'Aula serba guna',
    'Lapangan olahraga (basket, voli, futsal)',
    'Masjid sekolah',
    'Ruang UKS dan bimbingan konseling'
  ],
  array[
    'Pramuka','Palang Merah Remaja','Paskibra','Basket','Futsal',
    'Voly','Paduan Suara','Seni Tari','Karya Ilmiah Remaja','Rohis'
  ],
  '[
    {"judul":"Juara 1 Lomba Video Pertolongan Pertama HUT KSR Unit Pekalongan","keterangan":"PMR WIRA SMANKA, 2026"},
    {"judul":"Juara 2 Lomba Cerdas Cermat BI","keterangan":"Tingkat Kerisidenan Pekalongan, 2026"},
    {"judul":"Juara 1 Lomba Atletik Panca Lomba O2SN","keterangan":"Cabor Atletik, 2026"},
    {"judul":"Juara 2 Lomba kategori KATA Perseorangan Karate","keterangan":"Cabor Karate, 2026"},
    {"judul":"Juara 1 Lomba Panahan Putri","keterangan":"Cabor Panahan, 2026"}
  ]'::jsonb,
  '[
    {"tag":"Akademik","judul":"Kelas Olimpiade Sains","deskripsi":"Pembinaan intensif bidang Matematika, Fisika, Kimia, dan Biologi untuk mempersiapkan kompetisi sains tingkat kabupaten hingga nasional.","gambar":"/program1.jpg"},
    {"tag":"Karakter","judul":"Program Penguatan Karakter","deskripsi":"Pembinaan akhlak, kepemimpinan, dan kepedulian sosial melalui Pramuka, keagamaan, serta bakti lingkungan.","gambar":"/program2.jpg"}
  ]'::jsonb,
  array['X IPA 1','X IPA 2','X IPS 1','XI IPA 1','XI IPA 2','XI IPS 1','XII IPA 1','XII IPS 1']
)
on conflict (id) do update set
  nama = excluded.nama, slogan = excluded.slogan, alamat = excluded.alamat,
  telepon = excluded.telepon, email = excluded.email, visi = excluded.visi,
  misi = excluded.misi, sambutan_teks = excluded.sambutan_teks,
  sambutan_nama = excluded.sambutan_nama, sambutan_jabatan = excluded.sambutan_jabatan,
  sambutan_gambar = excluded.sambutan_gambar, sejarah = excluded.sejarah,
  fasilitas = excluded.fasilitas, ekstrakurikuler = excluded.ekstrakurikuler,
  prestasi = excluded.prestasi, program_unggulan = excluded.program_unggulan,
  kelas = excluded.kelas;

-- ---------- Berita ----------
delete from public.berita;
insert into public.berita (slug, judul, tanggal, ringkasan, isi, gambar, kategori) values
('penerimaan-siswa-baru',
 'KAPILASKA Peduli KARHUTLA',
 '2026-09-16',
 'Menjaga hutan berarti menjaga masa depan. Bersama KAPILASKA, mari wujudkan lingkungan yang lestari, aman, dan bebas dari kebakaran hutan dan lahan. Salam Lestari.',
 array[
   'Anggota KAPILASKA (Keluarga Pencinta Alam Smanka) SMA Negeri 1 Kajen menggelar kegiatan peduli kebakaran hutan dan lahan (karhutla) di kawasan Gunung Anjir, Kaliboja, Kecamatan Paninggaran, Kabupaten Pekalongan.',
   'Pencinta alam tidak hanya menikmati keindahan hutan, tetapi juga memiliki tanggung jawab untuk menjaga dan melestarikannya. Sebagai relawan kebakaran hutan dan lahan (karhutla), anggota KAPILASKA turut berperan aktif dalam upaya pencegahan, pemantauan, serta penanggulangan kebakaran yang dapat merusak ekosistem dan mengancam kehidupan masyarakat.',
   'Semangat gotong royong, kepedulian lingkungan, dan jiwa kemanusiaan menjadi landasan utama dalam setiap kegiatan yang dilakukan. Kegiatan ini menjadi wujud nyata kepedulian siswa terhadap kelestarian alam sekitar.'
 ],
 '/berita1.jpg', 'Kegiatan'),

('juara-tinju-popda',
 'Siswa Smanka Raih Juara 1 Tinju POPDA Tingkat Provinsi Jawa Tengah',
 '2026-09-06',
 'Siswa SMA Negeri 1 Kajen berhasil meraih juara 1 cabang olahraga tinju pada POPDA tingkat Provinsi Jawa Tengah.',
 array[
   'Prestasi membanggakan kembali diukir oleh siswa SMA Negeri 1 Kajen. Salah satu siswa berhasil meraih juara 1 pada cabang olahraga tinju dalam Pekan Olahraga Pelajar Daerah (POPDA) tingkat Provinsi Jawa Tengah.',
   'Keberhasilan ini merupakan buah dari latihan rutin dan disiplin yang dijalani selama berbulan-bulan di bawah bimbingan pelatih serta dukungan penuh pihak sekolah. Kerja keras dan semangat pantang menyerah menjadi kunci utama kemenangan tersebut.',
   'Kepala sekolah menyampaikan apresiasi setinggi-tingginya atas kerja keras siswa dan pelatih. Prestasi ini menjadi motivasi bagi seluruh siswa untuk terus mengembangkan potensi di bidang olahraga maupun akademik.'
 ],
 '/berita2.jpg', 'Prestasi'),

('maulid-nabi',
 'Memperingati Maulid Nabi Muhammad SAW',
 '2026-08-26',
 'SMA Negeri 1 Kajen memperingati Maulid Nabi Muhammad SAW dengan ceramah keagamaan dan berbagai kegiatan bernuansa islami.',
 array[
   'Keluarga besar SMA Negeri 1 Kajen menggelar peringatan Maulid Nabi Muhammad SAW yang diikuti oleh seluruh siswa, guru, dan karyawan. Kegiatan berlangsung khidmat dengan rangkaian pembacaan selawat serta tausiah keagamaan.',
   'Dalam ceramahnya, penceramah mengajak seluruh peserta untuk meneladani akhlak dan sifat-sifat mulia Nabi Muhammad SAW dalam kehidupan sehari-hari, baik di lingkungan sekolah maupun masyarakat.',
   'Rangkaian kegiatan maulid juga dimeriahkan dengan penampilan seni islami dari siswa. Peringatan ini diharapkan dapat menumbuhkan kecintaan kepada Nabi sekaligus memperkuat pembinaan karakter religius peserta didik.'
 ],
 '/berita3.jpg', 'Kegiatan'),

('spmb-2026-2027',
 'SPMB SMA N 1 KAJEN Tahun Ajaran 2026-2027',
 '2026-05-28',
 'SMA Negeri 1 Kajen membuka Seleksi Penerimaan Murid Baru (SPMB) tahun ajaran 2026-2027. Simak jadwal dan ketentuannya.',
 array[
   'SMA Negeri 1 Kajen resmi membuka Seleksi Penerimaan Murid Baru (SPMB) untuk tahun ajaran 2026-2027. Pendaftaran dilakukan secara daring sesuai jadwal yang telah ditetapkan oleh dinas pendidikan setempat.',
   'Terdapat beberapa jalur penerimaan, di antaranya jalur zonasi, prestasi, dan afirmasi. Calon murid diharapkan menyiapkan dokumen persyaratan dengan lengkap sebelum melakukan pendaftaran agar proses berjalan lancar.',
   'Informasi lengkap mengenai jadwal, tata cara, dan persyaratan dapat diperoleh melalui laman resmi sekolah serta layanan informasi yang disediakan. Jangan lewatkan kesempatan untuk bergabung bersama keluarga besar SMA Negeri 1 Kajen.'
 ],
 '/berita4.jpg', 'Pengumuman'),

('juara-video-pertolongan-pertama',
 'Siswa SMANKA meraih Juara 1 Lomba Video Pertolongan Pertama dalam Rangka HUT KSR Unit POLTEKKES Pekalongan ke-VII',
 '2026-05-10',
 'Siswa SMA Negeri 1 Kajen meraih juara 1 dalam lomba video pertolongan pertama pada peringatan HUT KSR Unit POLTEKKES Pekalongan ke-VII.',
 array[
   'Siswa SMA Negeri 1 Kajen kembali menorehkan prestasi, kali ini di bidang kesehatan. Tim siswa berhasil meraih juara 1 pada lomba video pertolongan pertama yang diselenggarakan dalam rangka HUT KSR Unit POLTEKKES Pekalongan ke-VII.',
   'Karya video yang dibuat mengangkat tema pertolongan pertama dengan penyajian yang informatif dan mudah dipahami. Proses pembuatan dilakukan secara mandiri oleh siswa dengan bimbingan guru pembina.',
   'Prestasi ini diharapkan dapat mendorong siswa lain untuk lebih peduli terhadap pentingnya pertolongan pertama, sekaligus mengasah kreativitas dan kemampuan berkomunikasi melalui media digital.'
 ],
 '/berita5.jpg', 'Prestasi'),

('hardiknas-2026',
 'Memperingati Hari Pendidikan Nasional 2026',
 '2026-05-02',
 'SMA Negeri 1 Kajen memperingati Hari Pendidikan Nasional 2026 dengan upacara bendera dan berbagai kegiatan reflektif.',
 array[
   'SMA Negeri 1 Kajen menggelar upacara bendera dalam rangka memperingati Hari Pendidikan Nasional (Hardiknas) 2026. Upacara diikuti oleh seluruh siswa, guru, dan karyawan dengan penuh khidmat.',
   'Dalam amanatnya, pembina upacara menyampaikan pentingnya semangat belajar dan peran pendidikan dalam membangun generasi yang berkarakter serta berdaya saing. Peringatan Hardiknas juga menjadi momentum refleksi atas perjalanan pendidikan di sekolah.',
   'Rangkaian kegiatan dilengkapi dengan berbagai lomba dan penampilan siswa yang bertema pendidikan. Diharapkan semangat Hardiknas dapat terus menumbuhkan kesadaran akan pentingnya pendidikan sepanjang hayat.'
 ],
 '/berita6.jpg', 'Kegiatan');

-- ---------- Guru ----------
delete from public.guru;
insert into public.guru (nip, nama, mapel, jabatan, status) values
('196904121994031004', 'Ircham Junaidi, S.Pd., M.Pd.', 'Matematika', 'Kepala Sekolah', 'Aktif'),
('197505182000122001', 'Sri Wahyuni, S.Pd.', 'Bahasa Indonesia', 'Wakil Kepala Kurikulum', 'Aktif'),
('198203102008011005', 'Bambang Setiawan, S.Pd.', 'Fisika', 'Wakil Kepala Kesiswaan', 'Aktif'),
('198711222012022003', 'Retno Palupi, S.Pd.', 'Biologi', 'Guru', 'Aktif'),
('199001052014031002', 'Ahmad Ridwan, S.Kom.', 'Informatika', 'Guru', 'Aktif'),
('199208172016042001', 'Dian Puspitasari, S.Pd.', 'Bahasa Inggris', 'Guru', 'Cuti'),
('198509302010012004', 'Nur Hidayah, S.Pd.', 'Sejarah', 'Guru', 'Aktif'),
('199403252019031006', 'Fajar Nugroho, S.Pd.', 'PJOK', 'Guru', 'Aktif');

-- ---------- Siswa ----------
delete from public.siswa;
insert into public.siswa (nis, nama, kelas, jenis_kelamin, status) values
('24001', 'Siti Nurhaliza', 'XII IPA 1', 'P', 'Aktif'),
('24002', 'Budi Santoso', 'XI IPA 2', 'L', 'Aktif'),
('24003', 'Rina Wati', 'X IPS 1', 'P', 'Aktif'),
('24004', 'Ahmad Fauzi', 'XII IPA 1', 'L', 'Aktif'),
('24005', 'Dewi Lestari', 'XI IPS 2', 'P', 'Cuti');

-- ---------- Agenda ----------
delete from public.agenda;
insert into public.agenda (tanggal, nama, jam, lokasi) values
('2026-10-20', 'Rapat Evaluasi Semester', '08.00 - 11.00', 'Ruang Guru'),
('2026-10-22', 'Ujian Tengah Semester', '07.30 - 12.00', 'Ruang Kelas'),
('2026-10-25', 'Pertemuan Orang Tua', '09.00 - 11.30', 'Aula Sekolah');

-- ---------- Kalender akademik ----------
delete from public.kalender_akademik;
insert into public.kalender_akademik (mulai, selesai, nama, jenis) values
('2026-07-13', '2026-07-18', 'Masa Pengenalan Lingkungan Sekolah (MPLS)', 'Kegiatan'),
('2026-09-21', '2026-09-26', 'Penilaian Tengah Semester Ganjil', 'Ujian'),
('2026-12-07', '2026-12-12', 'Penilaian Akhir Semester Ganjil', 'Ujian'),
('2026-12-21', '2027-01-03', 'Libur Semester Ganjil', 'Libur'),
('2027-03-08', '2027-03-13', 'Penilaian Tengah Semester Genap', 'Ujian'),
('2027-05-03', '2027-05-08', 'Asesmen Sumatif Akhir Jenjang', 'Ujian'),
('2027-06-21', '2027-07-11', 'Libur Akhir Tahun Ajaran', 'Libur');

-- ---------- Kesiswaan: organisasi ----------
delete from public.kesiswaan_organisasi;
insert into public.kesiswaan_organisasi (slug, nama, nama_panjang, deskripsi, struktur, tugas, urutan) values
('osis', 'OSIS', 'Organisasi Siswa Intra Sekolah',
 'Wadah utama kepemimpinan siswa yang menaungi seluruh kegiatan kesiswaan di sekolah.',
 array['Ketua OSIS','Wakil Ketua OSIS','Sekretaris (2 orang)','Bendahara (2 orang)','9 Seksi Bidang'],
 array[
   'Menyusun dan melaksanakan program kerja kesiswaan sepanjang tahun ajaran.',
   'Mengoordinasikan seluruh ekstrakurikuler dan kegiatan sekolah.',
   'Menjadi jembatan komunikasi antara siswa dan pihak sekolah.',
   'Menumbuhkan jiwa kepemimpinan, tanggung jawab, dan kerja sama siswa.'
 ], 1),
('mpk', 'MPK', 'Majelis Perwakilan Kelas',
 'Lembaga pengawas dan penyalur aspirasi siswa yang mengawasi kinerja OSIS.',
 array['Ketua MPK','Wakil Ketua MPK','Sekretaris','Anggota dari setiap kelas'],
 array[
   'Mengawasi dan mengevaluasi pelaksanaan program kerja OSIS.',
   'Menampung serta menyalurkan aspirasi siswa kepada sekolah.',
   'Menyusun rekomendasi perbaikan kegiatan kesiswaan.',
   'Menyelenggarakan pemilihan ketua OSIS secara demokratis.'
 ], 2);

-- ---------- Kesiswaan: ekstrakurikuler ----------
delete from public.kesiswaan_ekskul;
insert into public.kesiswaan_ekskul (nama, caption, urutan) values
('Pramuka', 'Melatih kemandirian, kedisiplinan, dan jiwa kepemimpinan melalui kegiatan kepramukaan.', 1),
('Palang Merah Remaja', 'Membekali siswa keterampilan pertolongan pertama dan kepedulian sosial.', 2),
('Paskibra', 'Membentuk sikap tegas, rapi, dan cinta tanah air melalui latihan baris-berbaris.', 3),
('Basket', 'Mengembangkan kebugaran, kerja sama tim, dan sportivitas lewat olahraga basket.', 4),
('Futsal', 'Menyalurkan minat olahraga sekaligus melatih strategi dan kekompakan tim.', 5),
('Voly', 'Melatih koordinasi, ketangkasan, dan semangat juang dalam permainan beregu.', 6),
('Paduan Suara', 'Mengasah kemampuan vokal dan kekompakan untuk mengisi berbagai acara sekolah.', 7),
('Seni Tari', 'Melestarikan seni budaya daerah serta mengembangkan ekspresi dan kreativitas siswa.', 8),
('Karya Ilmiah Remaja', 'Menumbuhkan budaya meneliti dan berpikir kritis melalui penulisan karya ilmiah.', 9),
('Rohis', 'Memperkuat nilai keimanan dan akhlak melalui kajian serta kegiatan keagamaan.', 10);

-- ---------- Kesiswaan: tata tertib ----------
delete from public.kesiswaan_tata_tertib;
insert into public.kesiswaan_tata_tertib (jenis, teks, urutan) values
('kewajiban', 'Hadir di sekolah tepat waktu dan mengikuti seluruh pelajaran dengan tertib.', 1),
('kewajiban', 'Memakai seragam sekolah lengkap sesuai ketentuan yang berlaku.', 2),
('kewajiban', 'Menjaga nama baik sekolah di dalam maupun di luar lingkungan sekolah.', 3),
('kewajiban', 'Menghormati guru, karyawan, dan sesama siswa.', 4),
('kewajiban', 'Memelihara kebersihan, keamanan, dan ketertiban lingkungan sekolah.', 5),
('kewajiban', 'Mengikuti kegiatan sekolah yang telah ditetapkan.', 6),
('larangan', 'Membawa dan menggunakan alat komunikasi tanpa izin saat kegiatan belajar.', 1),
('larangan', 'Membawa senjata tajam, rokok, narkoba, atau benda berbahaya lainnya.', 2),
('larangan', 'Melakukan perundungan, kekerasan, atau tindakan tidak menyenangkan.', 3),
('larangan', 'Membolos, keluar kelas, atau meninggalkan sekolah tanpa izin.', 4),
('larangan', 'Merusak fasilitas dan sarana prasarana sekolah.', 5),
('larangan', 'Mencoret-coret dinding, meja, atau fasilitas sekolah.', 6);
