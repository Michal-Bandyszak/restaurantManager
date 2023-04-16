import { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/joy/Button';
import { useForm } from 'react-hook-form';

import { addWorker, updateWorker } from '../../API/api';
import { RestaurantContext } from '../../Context/Context';
import { addNewWorker } from '../../Reducers/restaurantReducer';

export default function AddNewWorkerModal({ handleClose, isEditModal }) {
  const [{ worker }, dispatch] = useContext(RestaurantContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: isEditModal ? worker.name : null,
      surname: isEditModal ? worker.surname : null,
      username: isEditModal ? worker.username : null,
      password: isEditModal ? worker.password : null,
      workerLevel: isEditModal ? worker.workerLevel : null
    },
  });

  async function onSubmit(formData) {
    if (isEditModal) {
      const workerData = {
        ...formData,
        workerId: parseInt(worker.id),
      };

      const data = await updateWorker(workerData);
      dispatch(updateWorker(data));

    } else {
      const workerData = {
        ...formData
      };
      const data = await addWorker(workerData);
      dispatch(addNewWorker(data));
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
        label="name"
        {...register('name')}
        fullWidth
        placeholder="name"
        type="textfield"
        sx={{
          mb: 2,
        }}
      />
      <div style={{ display: 'flex' }}>
        <TextField
          required
          label="Start Hour"
          placeholder="Enter surname"
          {...register('surname')}
          sx={{
            mb: 2,
            mr: '10px',
          }}
        />
        <TextField
          required
          name="username"
          label="username"
          placeholder="Enter username"
          {...register('username')}
          sx={{
            mb: 2,
          }}
        />
      </div>
      <TextField
        required
        label="password"
        placeholder="Enter password"
        type="password"
        {...register('password')}
      />
     
      <Button type="submit" variant="solid">
        {isEditModal ? 'Edit' : 'Add'} shift
      </Button>
    </Box>
  );
}
