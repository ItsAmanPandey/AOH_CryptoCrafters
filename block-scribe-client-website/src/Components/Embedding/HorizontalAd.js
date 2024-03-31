import React from 'react';

const HorizontalAd = ({ imageSrc }) => (
  <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src={imageSrc} alt="Horizontal Ad" style={{ maxWidth: '100%', maxHeight: '100px' }} />
  </div>
);

export default HorizontalAd;
