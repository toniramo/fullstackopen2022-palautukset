/* eslint-disable react/prop-types */
import React from 'react';
import '../index.css';

function Notification({ message, type }) {
  if (message === null) {
    return null;
  }

  return <div className={`notification ${type}`}>{message}</div>;
}

export default Notification;
