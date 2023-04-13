import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { addShift } from '../../API/api';
import { RestaurantContext } from '../../Context/Context';
import { addNewShift, loadShifts } from '../../Reducers/restaurantReducer';

export default function AddNewShiftModal({ handleClose }) {
  const [newShift, setNewShift] = useState({
    startHour: '',
    endHour: '',
    date: '',
    isAvailable: true,
    workerId: 0,
  });
  const [state, dispatch] = useContext(RestaurantContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dateTimestamp = new Date(newShift.date).getTime();
    const shiftData = {
      ...newShift,
      date: dateTimestamp,
    };
    let { data } = await addShift(shiftData);
    // @TODO should be removed and returned by server
    data = {
      "id":50,
      "worker": {
        "id":1,
        "username":"username1",
        "name":"name1",
        "surname":"surname1",
        "workerLevel":"ADMIN"
      },
      "date":"2023-04-15T22:00:00.000+00:00",
      "startHour":1,
      "endHour":1,
      "available":true
    };
    console.log(data);
    dispatch(addNewShift(data));
    setNewShift({
      startHour: '',
      endHour: '',
      date: '',
      isAvailable: true,
      workerId: 0,
    });
    handleClose();
  };

  const handleInputChange = (event) => {
    let { name, value } = event.target;

    if (name === 'date') {
      value = new Date(value).getTime();
    }

    setNewShift({
      ...newShift,
      [name]: Number(value),
    });
  };

  const handleIsAvailableChange = (event) => {
    setNewShift({
      ...newShift,
      isAvailable: event.target.checked,
    });
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
        <TextField
          required
          name="date"
          value={
            newShift.date
              ? new Date(newShift.date).toISOString().substring(0, 10)
              : ''
          }
          onChange={handleInputChange}
          type="date"
        />
        <TextField
          required
          name="startHour"
          label="Enter start hour"
          value={newShift.startHour}
          onChange={handleInputChange}
        />
        <TextField
          required
          name="endHour"
          label="Enter end hour"
          value={newShift.endHour}
          onChange={handleInputChange}
        />
        <TextField
          required
          name="workerId"
          label="Worker ID"
          placeholder="worker ID"
          type="number"
          value={newShift.workerId}
          onChange={handleInputChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={newShift.isAvailable}
              onChange={handleIsAvailableChange}
            />
          }
          label="Is worker available?"
        />
        <button type="submit">Add shift</button>
      </Box>
    </>
  );
}
