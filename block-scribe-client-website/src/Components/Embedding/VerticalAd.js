import React from 'react';

const VerticalAd = ({ imageSrc }) => (
  <div style={{ width: '120px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src={imageSrc} alt="Vertical Ad" style={{ maxWidth: '120px', maxHeight: '100%' }} />
  </div>
);

export default VerticalAd;
