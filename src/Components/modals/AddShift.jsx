import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/joy/Button';
import { useForm } from 'react-hook-form';

import { addShift } from '../../API/api';
import { RestaurantContext } from '../../Context/Context';
import { addNewShift, loadShifts } from '../../Reducers/restaurantReducer';

export default function AddNewShiftModal({ handleClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [, dispatch] = useContext(RestaurantContext);

  async function onSubmit(formData) {
    const dateTimestamp = new Date(formData.date).getTime();
    const shiftData = {
      ...formData,
      date: dateTimestamp,
    };
    // let { data } = await addShift(shiftData);
    // @TODO should be removed and returned by server
    const data = {
      id: 50,
      worker: {
        id: 1,
        username: 'username1',
        name: 'name1',
        surname: 'surname1',
        workerLevel: 'ADMIN',
      },
      date: '2023-04-15T22:00:00.000+00:00',
      startHour: 1,
      endHour: 1,
      available: true,
    };
    dispatch(addNewShift(data));
    handleClose();
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      sx={{
        p: '0 20px 20px',
        maxWidth: '350px',
        textAlign: 'center',
      }}
    >
      <TextField
        required
        label="Date"
        {...register('date')}
        fullWidth
        placeholder="Enter date"
        type="date"
        sx={{
          mb: 2,
        }}
      />
      <div style={{ display: 'flex' }}>
        <TextField
          required
          label="Start Hour"
          placeholder="Enter start hour"
          {...register('startHour')}
          type="number"
          sx={{
            mb: 2,
            mr: '10px',
          }}
        />
        <TextField
          required
          name="endHour"
          label="End Hour"
          placeholder="Enter end hour"
          {...register('startHour')}
          type="number"
          sx={{
            mb: 2,
          }}
        />
      </div>
      <TextField
        required
        label="Worker ID"
        placeholder="Enter Worker ID"
        type="number"
        {...register('workerId')}
        fullWidth
      />
      <FormControlLabel
        control={<Checkbox {...register('isAvailable')} />}
        label="Is worker available?"
        sx={{
          width: '100%',
        }}
      />
      <Button type="submit" variant="solid">
        Add shift
      </Button>
    </Box>
  );
}
