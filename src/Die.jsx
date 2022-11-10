/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react';
import './App.css';

export function Die(props) {
  const {
    value, handleClick, id, isHeld,
  } = props;
  return (
    <div className={isHeld ? 'die-box held' : 'die-box'} onClick={() => handleClick(id)}>
      <h2>{value}</h2>
    </div>
  );
}
