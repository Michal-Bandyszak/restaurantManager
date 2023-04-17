import { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/joy/Button';
import { useForm } from 'react-hook-form';

import { addShift, updateWorkerShift } from '../../API/api';
import { RestaurantContext } from '../../Context/Context';
import { addNewShift, updateShift } from '../../Reducers/restaurantReducer';
import { parseDate } from '../../utils/parseDate';

export default function AddNewShiftModal({ handleClose, isEditModal }) {
  const [{ shift }, dispatch] = useContext(RestaurantContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: isEditModal ? parseDate(shift.date) : null,
      startHour: isEditModal ? shift.startHour : null,
      endHour: isEditModal ? shift.endHour : null,
      isAvailable: isEditModal ? shift.isAvailable : false,
      workerId: isEditModal ? shift.worker.id : null,
    },
  });

  async function onSubmit(formData) {
    const dateTimestamp = new Date(formData.date).getTime();
    if (isEditModal) {
      const shiftData = {
        ...formData,
        startHour: parseInt(formData.startHour),
        endHour: parseInt(formData.endHour),
        workerId: parseInt(shift.worker.id),
        shiftId: parseInt(shift.id),
        date: dateTimestamp,
      };

      const data = await updateWorkerShift(shiftData);
      dispatch(updateShift(data));

    } else {
      const shiftData = {
        ...formData,
        date: dateTimestamp,
      };
      const data = await addShift(shiftData);
      dispatch(addNewShift(data));
    }
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
        InputLabelProps={{
          shrink: true,
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
          {...register('endHour')}
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
        {isEditModal ? 'Edit' : 'Add'} shift
      </Button>
    </Box>
  );
}
