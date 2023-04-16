import axios from 'axios';
const URL = 'http://localhost:8088';

const restaurantAPI = axios.create({
  baseURL: URL,
  headers: {
    token: localStorage.getItem('restaurant-token'),
  },
});

export function getAllShifts() {
  return restaurantAPI.get(`${URL}/shift/all`).then((response) => {
    return response.data;
  });
}

export function login(username, password) {
  const config = {
    username,
    password,
  };

  return axios.post(`${URL}/login`, config).then((response) => {
    localStorage.setItem('restaurant-token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  });
}

export function getShiftById(token, shiftId) {
  const params = { token, shiftId };
  return restaurantAPI.get(`${URL}/shift`, { params }).then((response) => {
    return response.data;
  });
}

export function addShift(shiftData) {
  return restaurantAPI.post(`${URL}/shift`, shiftData).then((response) => {
    return response.data;
  });
}

export function updateWorkerShift(data) {
  return restaurantAPI.put(`${URL}/shift/`, data).then((response) => {
    return response.data;
  });
}

export function deleteShift(shiftId) {
  return restaurantAPI
    .delete(`${URL}/shift/${shiftId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export function getAllWorkersShiftsByDates(startDate, endDate) {
  const params = { startDate, endDate };
  return restaurantAPI
    .get(`${URL}/shift/everyone`, { params })
    .then((response) => {
      return response.data;
    });
}

export function getWorkerShift(workerId) {
  const params = { workerId };
  return restaurantAPI
    .get(`${URL}/shift/worker`, { params })
    .then((response) => {
      return response.data;
    });
}

export function getWorker(token, workerId) {
  const params = { token, workerId };
  return restaurantAPI.get(`${URL}/workers`, { params }).then((response) => {
    return response.data;
  });
}

export function addWorker(
  token,
  name,
  surname,
  password,
  username,
  workerLevel
) {
  const data = { token, name, surname, password, username, workerLevel };
  return restaurantAPI.post(`${URL}/workers`, data).then((response) => {
    return response.data;
  });
}

export function updateWorker(
  token,
  workerId,
  name,
  surname,
  password,
  username,
  workerLevel
) {
  const data = { token, name, surname, password, username, workerLevel };
  return restaurantAPI
    .put(`${URL}/workers/${workerId}`, data)
    .then((response) => {
      return response.data;
    });
}

export function deleteWorker(workerId) {
  return restaurantAPI
    .delete(`${URL}/shift/${workerId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
}

export function getWorkers() {
  return restaurantAPI.get(`${URL}/workers/all`).then((response) => {
    return response.data;
  });
}
