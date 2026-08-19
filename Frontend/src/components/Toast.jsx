import React from 'react';
import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toastMsg } = useApp();
  return (
    <div className="toast-el" style={{ display: toastMsg ? 'block' : 'none' }}>
      {toastMsg}
    </div>
  );
}
