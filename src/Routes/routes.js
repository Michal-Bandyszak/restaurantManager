import { Navigate } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import Dashboard from '../pages/Dashboard/Dashboard';

export const routes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: getComponent(Dashboard),
  },
];

function getComponent(Component) {
  const token = localStorage.getItem('restaurant-token');
  return token ? <Component /> : <Navigate to="/login" />;
}
