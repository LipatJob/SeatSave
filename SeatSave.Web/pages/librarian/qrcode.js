import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const QrReader = dynamic(() => import('react-qr-reader'), {
  ssr: false,
});

export default function qrcode() {
  const [scannedCode, setScannedCode] = useState('');

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScannedQRCode = (data) => {
    if (data) {
      setScannedCode(data);
    }
  };

  return (
    <div>
      <div>
        <QrReader
          delay={300}
          style={{ width: '100%' }}
          onError={handleErrorWebCam}
          onScan={handleScannedQRCode}
        />
        <h3>Code: {scannedCode}</h3>
      </div>
    </div>
  );
}
