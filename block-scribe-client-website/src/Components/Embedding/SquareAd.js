import React from 'react';

const SquareAd = ({ imageSrc }) => (
  <div style={{ width: '200px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
    <img src={imageSrc} alt="Square Ad" style={{ maxWidth: '200px', maxHeight: '200px' }} />
  </div>
);

export default SquareAd;
