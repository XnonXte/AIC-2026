import React from 'react';
import { ScanLine, Save, WalletCards, XCircle } from 'lucide-react';
import BuyerCard from './BuyerCard';
import { MOCK_BUYERS } from '../data/mockData';

function formatConfidence(confidence) {
  return `${Math.round(confidence * 100)}%`;
}

function getGrade(confidence) {
  if (confidence >= 0.9) return 'A';
  if (confidence >= 0.75) return 'B';
  return 'C';
}

export default function DetectionResults({ resultData, capturedPhoto, onRetake }) {
  const { model, image, object_count: objectCount, detections = [] } = resultData;
  const averageConfidence = detections.length
    ? detections.reduce((total, detection) => total + detection.confidence, 0) / detections.length
    : 0;
  const totalEstimate = Math.round(detections.length * 1.2 * MOCK_BUYERS[0].pricePerKg / 1000) * 1000;

  if (objectCount === 0) {
    return (
      <div className="detection-results detection-results--empty">
        <div className="detection-empty-state">
          <XCircle className="detection-empty-state__icon" size={76} strokeWidth={1.5} />
          <h1>Deteksi Tidak Berhasil</h1>
          <p>Jenis sampah tidak berhasil terdeteksi. Silakan ambil atau unggah gambar baru, kemudian coba kembali. Cek kembali model!
          </p>
          <button className="btn btn-primary" onClick={onRetake}>Coba Lagi</button>
        </div>
      </div>
    );
  }

  return (
    <div className="detection-results">
      <div className="detection-results__grid">
        <section className="detection-results__left-panel">
          <div className="detection-results__title-row">
            <ScanLine size={22} />
            <div>
              <h1>Hasil Scan Material</h1>
              <p>{objectCount} objek terdeteksi</p>
            </div>
          </div>

          {capturedPhoto && (
            <div className="detection-results__image-wrap">
              <img src={capturedPhoto} alt="Hasil pemindaian material" />
              {detections.map((detection, index) => {
                const { x1, y1, x2, y2 } = detection.bounding_box;
                return (
                  <div
                    className={`detection-box detection-box--${getGrade(detection.confidence).toLowerCase()}`}
                    key={`${detection.class}-${index}`}
                    style={{
                      left: `${(x1 / image.width) * 100}%`,
                      top: `${(y1 / image.height) * 100}%`,
                      width: `${((x2 - x1) / image.width) * 100}%`,
                      height: `${((y2 - y1) / image.height) * 100}%`
                    }}
                  >
                    <span>{index + 1}</span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="detection-list">
            {detections.map((detection, index) => {
              const grade = getGrade(detection.confidence);
              return (
                <div className="detection-list__item" key={`${detection.class}-${index}`}>
                  <div className={`detection-list__rank detection-list__rank--${grade.toLowerCase()}`}>{index + 1}</div>
                  <div className="detection-list__info">
                    <strong>{detection.class}</strong>
                    <span>{grade === 'A' ? 'Material berkualitas baik' : 'Material terdeteksi'}</span>
                    <b className={`detection-list__grade detection-list__grade--${grade.toLowerCase()}`}>GRADE {grade}</b>
                  </div>
                  <div className="detection-list__confidence">
                    <small>Keyakinan sistem</small>
                    <strong>{formatConfidence(detection.confidence)}</strong>
                    <i><em style={{ width: `${detection.confidence * 100}%` }} /></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="detection-results__overall">
            <div className={`detection-results__overall-grade detection-results__overall-grade--${getGrade(averageConfidence).toLowerCase()}`}>
              {getGrade(averageConfidence)}
              <small>GRADE {getGrade(averageConfidence)}</small>
            </div>
            <div>
              <small>Keyakinan sistem keseluruhan</small>
              <strong>{formatConfidence(averageConfidence)}</strong>
              <p>Sebagian besar material terdeteksi dengan baik.</p>
            </div>
          </div>

          <button className="btn btn-primary detection-results__retake" onClick={onRetake}>Foto Material Lagi</button>
        </section>

        <section className="detection-results__buyers-panel">
          <div className="detection-results__buyers-heading">
            <h2>Rekomendasi pembeli</h2>
            <p>Berikut adalah pembeli terbaik untuk material yang terdeteksi</p>
          </div>
          {MOCK_BUYERS.map((buyer, index) => <BuyerCard key={buyer.id} buyer={buyer} rank={index + 1} />)}
          <div className="detection-results__estimate">
            <WalletCards size={30} />
            <div><small>Total Estimasi</small><strong>~ Rp {new Intl.NumberFormat('id-ID').format(totalEstimate)}</strong></div>
            <span>{objectCount} Item<small>Total material terdeteksi</small></span>
            <button type="button"><Save size={15} /> Simpan Hasil</button>
          </div>
          <span className="detection-results__model">Model {model.toUpperCase()} • {image.width} x {image.height}px</span>
        </section>
      </div>
    </div>
  );
}