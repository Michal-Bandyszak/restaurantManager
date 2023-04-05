import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { addShift } from '../../API/Api';


export default function AddNewShiftModal() {
  const [newShift, setNewShift] = useState({
      startHour: '',
      endHour: '',
      date: '',
      isAvaliable: true,
      workerId: ''  
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const dateTimestamp = new Date(newShift.date).getTime();
    const shiftData = {
      ...newShift,
      date: dateTimestamp
    };
    console.log(shiftData)
    addShift(shiftData);
  };

  const handleInputChange =  (event) => {
    const {id, value} = event.target;
    setNewShift((prevShift) => ({
      ...prevShift,
      [id]: id === "date" ? value : value.trim()
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
      <form onSubmit={handleSubmit}>
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
            value={newShift.date}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="startHour"
            label="Enter start hour"
            placeholder="Enter start hour"
            value={newShift.startHour}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="endHour"
            label="Enter end hour"
            placeholder="Enter end hour"
            value={newShift.endHour}
            onChange={handleInputChange}
          />
          <TextField
            required
            id="workerId"
            label="Worker ID"
            placeholder="worker ID"
            type="number"
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
            <MenuItem key="true" value="true">
              true
            </MenuItem>
            <MenuItem key="false" value="false" >
              false
            </MenuItem>
          </TextField> 
        </div>
      </Box>
      <button type="submit">Add shift</button>
    </form>
  </>
  );
}
