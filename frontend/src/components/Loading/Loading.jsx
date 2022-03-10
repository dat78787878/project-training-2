import React from 'react';
import { RingLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="loading">
      <RingLoader size={60} />;
    </div>
  );
};

export default Loading;
