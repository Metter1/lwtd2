import { Spin } from 'antd';
import { FC } from 'react';

const Preloader: FC = () => {
  return (
    <Spin
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      tip="Loading..."
      size="large"
    ></Spin>
  );
};

export default Preloader;
