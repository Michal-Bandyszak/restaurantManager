import { Navigate } from "react-router-dom"
import KanbanBoard from "../Components/KanbanBoard";
import LoginPage from "../Components/LoginPage";

export const routes = [
  {
    path:"/login",
    element: <LoginPage />

  },
  {
    path:"/",
    element: getComponent(KanbanBoard)
  }
]

function getComponent(Component) {
  const token = localStorage.getItem("restaurant-token");
  return token ? <Component /> : <Navigate to="/login" />
}
