import React, { useState } from 'react';
import { WorkerContext } from './WorkerContext';

export function AddShift() {
  const [shift, setShift] = useState({
    workerId: '',
    date: '',
    startHour: '',
    endHour: '',
    available: true,
  });

  const handleChange = (event) => {
    setShift({ ...shift, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:8088/shift', {
      method: 'POST',
      body: JSON.stringify(shift),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <WorkerContext.Consumer>
      {(context) => (
        <form onSubmit={handleSubmit}>
          <label>
