import React, { useContext, useState } from 'react';
import { RestaurantContext } from '../Context/Context';
import { loginUser } from '../Reducers/restaurantReducer';
import { login } from '../API/Api';
import { useNavigate } from 'react-router-dom';


const URL = 'http://localhost:8088';

const LoginPage = () => {
  const [, dispatch] = useContext(RestaurantContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

   const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password).then(() => {
      dispatch(loginUser(username, password));
      navigate('/');
    })
    .catch((error) => {
      console.error(error);
    });
  };


  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default LoginPage;
