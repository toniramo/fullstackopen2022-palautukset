/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import '../index.css';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  if (!notification) {
    return null;
  }

  const { content, type } = notification;
  return <div className={`notification ${type}`}>{content}</div>;
};

export default Notification;
