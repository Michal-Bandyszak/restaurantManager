import React, { useContext, useState } from 'react';
import { RestaurantContext } from '../Context/Context';
import { loginUser } from '../Reducers/restaurantReducer';
import { login } from '../API/Api';

const URL = 'http://localhost:8088';

const LoginPage = () => {
  const [, dispatch] = useContext(RestaurantContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

   const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password).then((token) => {
      dispatch(loginUser(username, password));
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
