import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { addShift } from '../../API/Api';

export default function AddNewShiftModal() {
  const [newShift, setNewShift] = useState({
      startHour: 12,
      endHour: 14,
      date: 1680459207000,
      isAvaliable: true,
      workerId: 2  
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    addShift(newShift)
  };

  const handleInputChange =  (event) => {
    const {name, value} = event.target;
    setNewShift((prevShift) => ({
      ...prevShift,
      [name]: value
    }));
  };

  const handleIsAvaliableChange = (event) => {
    setNewShift((prevShift) => ({
      ...prevShift,
      isAvaliable: event.target.value === 'true' ? true : false
    }));
  };

  return (
    <>
      <h1>New Shift</h1>
  
        <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
        <div>
          <TextField
            required
            id="date"
            label="Enter date"
            placeholder="Enter date"
            value={new Date(newShift.date).toISOString().slice(0, 10)}
            onChange={handleInputChange}
            type="date"
          />
          <TextField
            required
            id="startHour"
            label="Required"
            placeholder="Enter start hour"
            value={newShift.endHour}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="endHour"
            label="Required"
            placeholder="Enter start hour"
            value={newShift.endHour}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="workerId"
            label="Required"
            placeholder="worker ID"
            value={newShift.workerId}
            onChange={handleInputChange}

          />
        </div>
        <div>
          <TextField
            id="outlined-select-currency"
            select
            label="Is worker avaliable?"
            defaultValue="true"
            value={newShift.isAvaliable ? 'true' : 'false'}
            onChange={handleIsAvaliableChange}
          >
            <MenuItem>
              true
            </MenuItem>
            <MenuItem >
              false
            </MenuItem>
          </TextField> 
        </div>
      </Box>
    <button type="submit">Add shift</button>
    </>
  );
}
