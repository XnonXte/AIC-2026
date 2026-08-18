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
    phone: '6281234567890',
    address: 'Jl. Industri No. 12, Subang'
  },
  {
    id: 'b2',
    name: 'UD Sumber Plastik',
    pricePerKg: 4050,
    distanceKm: 4.8,
    capacityStatus: 'Kapasitas terbatas',
    phone: '6289876543210',
    address: 'Kawasan Pergudangan C3, Karawang'
  },
  {
    id: 'b3',
    name: 'PT Daur Nusantara',
    pricePerKg: 3900,
    distanceKm: 7.3,
    capacityStatus: 'Kapasitas tersedia',
    phone: '6285555555555',
    address: 'Jl. Pantai Utara Km 15'
  }
];

export const MOCK_GRADING_RESULTS = {
  GRADED_A: {
    statusCode: 'GRADED',
    items: [
      {
        id: 'item-1',
        grade: 'A',
        confidenceScore: 92,
        materialName: 'PET - Botol bening, dipres rapi',
        description: 'Tanpa label, tanpa residu terlihat. Tingkat kemurnian sangat tinggi.',
        buyers: MOCK_BUYERS,
        reasonCode: 'PET_CLEAN_COMPRESSED_NO_LABEL'
      }
    ],
    submissionId: 'SUB-20260817-0091'
  },
  GRADED_B: {
    statusCode: 'GRADED',
    items: [
      {
        id: 'item-1',
        grade: 'B',
        confidenceScore: 84,
        materialName: 'PET - Botol campur dengan label',
        description: 'Sebagian label belum dilepas, terdapat sedikit residu air murni.',
        buyers: MOCK_BUYERS,
        reasonCode: 'PET_MIXED_WITH_LABELS'
      }
    ],
    submissionId: 'SUB-20260817-0092'
  },
  GRADED_MULTIPLE: {
    statusCode: 'GRADED',
    items: [
      {
        id: 'item-1',
        grade: 'A',
        confidenceScore: 90,
        materialName: 'PET - Botol bening',
        description: 'Botol plastik bening berkualitas tinggi',
        buyers: MOCK_BUYERS,
        reasonCode: 'PET_CLEAN'
      },
      {
        id: 'item-2',
        grade: 'B',
        confidenceScore: 85,
        materialName: 'Kardus - Cokelat tebal',
        description: 'Kardus box berwarna cokelat dengan kualitas baik',
        buyers: MOCK_BUYERS,
        reasonCode: 'KARDUS_GOOD'
      },
      {
        id: 'item-3',
        grade: 'C',
        confidenceScore: 78,
        materialName: 'Kaleng - Aluminium',
        description: 'Kaleng minuman aluminium dengan noda/residu',
        buyers: MOCK_BUYERS,
        reasonCode: 'KALENG_CONTAMINATED'
      }
    ],
    submissionId: 'SUB-20260817-0098'
  },
  GRADED_MULTIPLE_MIXED: {
    statusCode: 'GRADED',
    items: [
      {
        id: 'item-1',
        grade: 'B',
        confidenceScore: 88,
        materialName: 'PET - Botol campur warna',
        description: 'Botol plastik berbagai warna campur, kualitas sedang',
        buyers: MOCK_BUYERS,
        reasonCode: 'PET_MIXED_COLORS'
      },
      {
        id: 'item-2',
        grade: 'C',
        confidenceScore: 82,
        materialName: 'PET - Botol dengan kontaminasi',
        description: 'Botol dengan residu minyak dan noda, kualitas rendah',
        buyers: MOCK_BUYERS,
        reasonCode: 'PET_CONTAMINATED'
      }
    ],
    submissionId: 'SUB-20260817-0099'
  },
  GRADED_FOUR_ITEMS: {
    statusCode: 'GRADED',
    items: [
      {
        id: 'item-1',
        grade: 'A',
        confidenceScore: 94,
        materialName: 'PET Jernih - Botol Air',
        description: 'Botol air mineral bening, kemurnian tinggi, bersih sempurna',
        buyers: MOCK_BUYERS,
        reasonCode: 'PET_MINERAL_WATER'
      },
      {
        id: 'item-2',
        grade: 'B',
        confidenceScore: 86,
        materialName: 'PET Warna - Botol Minuman',
        description: 'Botol minuman berwarna, agak keruh, kualitas baik',
        buyers: MOCK_BUYERS,
        reasonCode: 'PET_COLORED'
      },
      {
        id: 'item-3',
        grade: 'A',
        confidenceScore: 91,
        materialName: 'Kardus Putih - Kemasan',
        description: 'Kardus putih bersih tanpa tinta, kualitas premium',
        buyers: MOCK_BUYERS,
        reasonCode: 'KARDUS_WHITE'
      },
      {
        id: 'item-4',
        grade: 'C',
        confidenceScore: 83,
        materialName: 'Kaleng - Minuman Ringan',
        description: 'Kaleng aluminium dengan sedikit noda, kualitas rendah',
        buyers: MOCK_BUYERS,
        reasonCode: 'KALENG_BEVERAGE'
      }
    ],
    submissionId: 'SUB-20260817-0100'
  },
  GRADED_C: {
    statusCode: 'GRADED',
    items: [
      {
        id: 'item-1',
        grade: 'C',
        confidenceScore: 78,
        materialName: 'PET - Botol terkontaminasi minyak',
        description: 'Warna botol kusam, terdapat residu oli/minyak yang sulit dibersihkan.',
        buyers: MOCK_BUYERS,
        reasonCode: 'PET_CONTAMINATED_OIL'
      }
    ],
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
    items: [
      {
        id: 'item-1',
        grade: 'B',
        confidenceScore: 71,
        materialName: 'PET - Botol campur',
        description: 'Botol plastik campur dengan pencahayaan agak minim',
        buyers: MOCK_BUYERS,
        reasonCode: 'EXCL_SHADOW_WARNING'
      }
    ],
    submissionId: 'SUB-20260817-0096'
  },
  EXCLUSION_DOWNGRADE: {
    statusCode: 'DOWNGRADE_PAKSA',
    title: 'Grade Diturunkan Otomatis',
    actionableMessage: 'Terdeteksi kontaminasi basah di sudut material. Sistem menurunkan grade dari A ke B secara otomatis sesuai standar toleransi industri.',
    actionButtonText: 'Lihat Rekomendasi Pembeli',
    severity: 'b',
    items: [
      {
        id: 'item-1',
        grade: 'B',
        confidenceScore: 82,
        materialName: 'PET - Botol dengan kontaminasi',
        description: 'Botol dengan sedikit kontaminasi basah',
        buyers: MOCK_BUYERS,
        reasonCode: 'EXCL_MOISTURE_DOWNGRADE'
      }
    ],
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
