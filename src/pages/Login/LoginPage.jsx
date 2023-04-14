import React, { useContext, useState } from 'react';
import { RestaurantContext } from '../../Context/Context';
import { loginUser } from '../../Reducers/restaurantReducer';
import { login } from '../../API/api';
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { useForm } from 'react-hook-form';
import RestaurantDialog from '../../Components/UI/Dialog';

const LoginPage = () => {
  const [, dispatch] = useContext(RestaurantContext);
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit({ username, password }) {
    login(username, password)
      .then((user) => {
        dispatch(loginUser(user));
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="login-wrapper">
      <div className="login-content">
        <h2>Welcome to restaurant manager!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="text"
            label="Login:"
            variant="outlined"
            placeholder="Enter username"
            fullWidth
            sx={{ mb: 3 }}
            InputLabelProps={{
              shrink: true,
            }}
            {...register('username', { required: true })}
          />
          <TextField
            type="password"
            label="Password:"
            variant="outlined"
            placeholder="Enter password"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            {...register('password', { required: true })}
          />
          <div className="login-actions">
            <div>
              <Switch />
              <span>Remember me</span>
            </div>
            <p onClick={() => setIsDialogOpened(true)}>Forgot Password</p>
          </div>
          <Button fullWidth type="submit" variant="contained">
            Sign In
          </Button>
        </form>
      </div>
      <RestaurantDialog
        open={isDialogOpened}
        onClose={() => setIsDialogOpened(false)}
        title="Forgot your password?"
      >
        <p>To reset password please contact your manager.</p>
      </RestaurantDialog>
    </div>
  );
};

export default LoginPage;
