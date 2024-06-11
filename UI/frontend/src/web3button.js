import React from 'react';
import { useWeb3Modal } from '@web3modal/ethers5/react';

const ConnectButton = () => {
  const { open } = useWeb3Modal();

  return (
    <>
      <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
    </>
  );
};

export default ConnectButton;