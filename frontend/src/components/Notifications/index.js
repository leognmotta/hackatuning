import React from 'react';

import { FaBell } from 'react-icons/fa';

// import { Container } from './styles';

export default function Notifications({
  notifications,
  toggleNotifications,
  showNotifications,
}) {
  return (
    <>
      <FaBell
        onClick={
          notifications ? () => toggleNotifications(!showNotifications) : null
        }
        color="#1437E3"
        size={24}
      />
      {notifications && notifications.length > 0 ? (
        <div className="badge" />
      ) : null}
      {showNotifications && notifications ? (
        <div className="notification">
          {notifications.map(notification => (
            <div key={notification._id}>{notification.content}</div>
          ))}
        </div>
      ) : null}
    </>
  );
}
