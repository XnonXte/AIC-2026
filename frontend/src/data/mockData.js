// Mock Data for AI Material Recycling Intelligence
// UI/UX Specification Compliant Datasets

export const MATERIALS = [
  { id: 'pet', name: 'PET', icon: 'Bottle', label: 'Botol PET' },
  { id: 'kardus', name: 'Kardus', icon: 'Box', label: 'Kardus Box' },
  { id: 'kaleng', name: 'Kaleng', icon: 'Can', label: 'Kaleng Alum' }
];

export const MOCK_BUYERS = [
  {
    id: 'b1',
    name: 'CV Bersih Jaya',
    pricePerKg: 4200,
    distanceKm: 2.1,
    capacityStatus: 'Kapasitas tersedia',
    isRealData: true,
    rating: 4.9,
    address: 'Jl. Industri Daur Ulang No. 12, Subang'
  },
  {
    id: 'b2',
    name: 'UD Sumber Plastik',
    pricePerKg: 4050,
    distanceKm: 4.8,
    capacityStatus: 'Kapasitas terbatas',
    isRealData: false,
    rating: 4.7,
    address: 'Kawasan Pergudangan Blok C3, Karawang'
  },
  {
    id: 'b3',
    name: 'PT Daur Nusantara',
    pricePerKg: 3900,
    distanceKm: 7.3,
    capacityStatus: 'Kapasitas tersedia',
    isRealData: true,
    rating: 4.8,
    address: 'Jl. Raya Pantai Utara Km 15'
  }
];

export const MOCK_GRADING_RESULTS = {
  GRADED_A: {
    statusCode: 'GRADED',
    grade: 'A',
    confidenceScore: 92,
    materialName: 'PET - Botol bening, dipres rapi',
    description: 'Tanpa label, tanpa residu terlihat. Tingkat kemurnian sangat tinggi.',
    buyers: MOCK_BUYERS,
    reasonCode: 'PET_CLEAN_COMPRESSED_NO_LABEL',
    submissionId: 'SUB-20260817-0091'
  },
  GRADED_B: {
    statusCode: 'GRADED',
    grade: 'B',
    confidenceScore: 84,
    materialName: 'PET - Botol campur dengan label',
    description: 'Sebagian label belum dilepas, terdapat sedikit residu air murni.',
    buyers: [
      { id: 'b1', name: 'CV Bersih Jaya', pricePerKg: 3600, distanceKm: 2.1, capacityStatus: 'Kapasitas tersedia', isRealData: true },
      { id: 'b2', name: 'UD Sumber Plastik', pricePerKg: 3500, distanceKm: 4.8, capacityStatus: 'Kapasitas terbatas', isRealData: false },
      { id: 'b3', name: 'PT Daur Nusantara', pricePerKg: 3350, distanceKm: 7.3, capacityStatus: 'Kapasitas tersedia', isRealData: true }
    ],
    reasonCode: 'PET_MIXED_WITH_LABELS',
    submissionId: 'SUB-20260817-0092'
  },
  GRADED_C: {
    statusCode: 'GRADED',
    grade: 'C',
    confidenceScore: 78,
    materialName: 'PET - Botol terkontaminasi minyak',
    description: 'Warna botol kusam, terdapat residu oli/minyak yang sulit dibersihkan.',
    buyers: [
      { id: 'b1', name: 'UD Sumber Plastik', pricePerKg: 2800, distanceKm: 4.8, capacityStatus: 'Kapasitas terbatas', isRealData: false },
      { id: 'b2', name: 'PT Daur Nusantara', pricePerKg: 2600, distanceKm: 7.3, capacityStatus: 'Kapasitas tersedia', isRealData: true }
    ],
    reasonCode: 'PET_CONTAMINATED_OIL',
    submissionId: 'SUB-20260817-0093'
  },
  EXCLUSION_TOLAK_FOTO: {
    statusCode: 'TOLAK_FOTO',
    title: 'Foto Terlalu Gelap atau Buram',
    actionableMessage: 'Foto terlalu gelap atau objek tidak fokus. Pindah ke tempat terang dan pastikan seluruh material terlihat jelas dalam frame.',
    actionButtonText: 'Foto Ulang',
    severity: 'c',
    reasonCode: 'EXCL_PHOTO_BLURRY_DARK',
    submissionId: 'SUB-20260817-0094'
  },
  EXCLUSION_TOLAK_PENILAIAN: {
    statusCode: 'TOLAK_PENILAIAN',
    title: 'Material Tidak Dikenali',
    actionableMessage: 'Sistem tidak dapat mengidentifikasi jenis material daur ulang pada foto ini. Pastikan tidak menumpuk lebih dari 2 lapis material berbeda.',
    actionButtonText: 'Foto Ulang Material',
    severity: 'c',
    reasonCode: 'EXCL_UNRECOGNIZED_MATERIAL',
    submissionId: 'SUB-20260817-0095'
  },
  EXCLUSION_WARNING: {
    statusCode: 'LOLOS_DENGAN_PERINGATAN',
    title: 'Lolos dengan Peringatan: Tumpukan Agak Terhalang',
    actionableMessage: 'Pencahayaan agak minim di area bawah. Nilai grade B diberikan namun disarankan foto ulang dari jarak lebih dekat untuk akurasi maksimal.',
    actionButtonText: 'Lanjut ke Rekomendasi Pembeli',
    secondaryButtonText: 'Foto Ulang',
    severity: 'info',
    grade: 'B',
    confidenceScore: 71,
    buyers: MOCK_BUYERS,
    reasonCode: 'EXCL_SHADOW_WARNING',
    submissionId: 'SUB-20260817-0096'
  },
  EXCLUSION_DOWNGRADE: {
    statusCode: 'DOWNGRADE_PAKSA',
    title: 'Grade Diturunkan Otomatis',
    actionableMessage: 'Terdeteksi kontaminasi basah di sudut material. Sistem menurunkan grade dari A ke B secara otomatis sesuai standar toleransi industri.',
    actionButtonText: 'Lihat Rekomendasi Pembeli',
    severity: 'b',
    grade: 'B',
    confidenceScore: 82,
    buyers: MOCK_BUYERS,
    reasonCode: 'EXCL_MOISTURE_DOWNGRADE',
    submissionId: 'SUB-20260817-0097'
  }
};

export const INITIAL_HISTORY = [
  {
    id: 'h1',
    date: '17 Agu 2026, 14:32',
    material: 'PET - Botol bening',
    grade: 'A',
    confidence: 92,
    bestPrice: 4200,
    buyerName: 'CV Bersih Jaya',
    status: 'GRADED'
  },
  {
    id: 'h2',
    date: '17 Agu 2026, 11:15',
    material: 'Kardus Box Cokelat',
    grade: 'B',
    confidence: 85,
    bestPrice: 2150,
    buyerName: 'UD Sumber Plastik',
    status: 'GRADED'
  },
  {
    id: 'h3',
    date: '16 Agu 2026, 16:45',
    material: 'Kaleng Alum Minuman',
    grade: 'A',
    confidence: 94,
    bestPrice: 14500,
    buyerName: 'PT Daur Nusantara',
    status: 'GRADED'
  }
];
