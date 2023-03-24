import axios from 'axios';
const URL = 'http://localhost:8088';

const restaurantAPI = axios.create({
  baseURL: URL,
  headers: {
    'Authorization': String(`Bearer ${localStorage.getItem('restaurant-token')}`),
  },
});


export function login(username, password) {
  const config = {
    params: {username, password}
  };
  
  return axios.get(`${URL}/login`, config)
    .then((response) => {
      localStorage.setItem('restaurant-token', response.data.token);
    });
}

// export function login(username, password) {
//   console.log(username, password)
//   const queryParams = new URLSearchParams({
//     username: username,
//     password: password,
//   });
  

// export function login(username, password) {
//   const params = {username, password};
  
//   return axios.get(`${URL}/login`, params)
//     .then((token) => {
//       localStorage.setItem('restaurant-token', token);
//       return token;
//     });
// }


export function getAllShifts() {
  return restaurantAPI.get(`${URL}/shift/all`)
    .then((response) => {
      return response.data;
    });
}


export function getShiftById(token, shiftId) {
  const params = {token, shiftId};
  return restaurantAPI.get(`${URL}/shift`, {params})
    .then((response) => {
      return response.data;
    });
}

export function addShift(token, date, startHour, endHour, isAvailable, workerId) {
  const data = {token, date, startHour, endHour, isAvailable, workerId};
  return restaurantAPI.post(`${URL}/shift`, data)
    .then((response) => {
      return response.data;
    });
}

export function updateWorkerShift(token, startHour, endHour, isAvailable, shiftId, workerId) {
  const data = {startHour, endHour, isAvailable, workerId};
  return restaurantAPI.put(`${URL}/shift/${shiftId}`, data, {headers: {'Authorization': `Bearer ${token}`} })
    .then((response) => {
      return response.data;
    });
}

export function deleteWorkerShift(token, shiftId, workerId) {
  const data = {shiftId, workerId};
  return restaurantAPI.delete(`${URL}/shift/${shiftId}`, {headers: {'Authorization': `Bearer ${token}`}, data})
    .then((response) => {
      return response.data;
    });
}



export function getAllWorkersShiftsByDates(startDate, endDate) {
  const params = {startDate, endDate};
  return restaurantAPI.get(`${URL}/shift/everyone`, {params})
    .then((response) => {
      return response.data;
    });
}

export function getWorkerShift(startDate, endDate, workerId) {
  const params = {startDate, endDate, workerId};
  return restaurantAPI.get(`${URL}/shift/worker`, {params})
    .then((response) => {
      return response.data;
    });
}

export function getWorker(token, workerId) {
  const params = {token, workerId};
  return restaurantAPI.get(`${URL}/workers`, {params})
    .then((response) => {
      return response.data;
    });
}

export function addWorker(token, name, surname, password, username, workerLevel) {
  const data = {token, name, surname, password, username, workerLevel};
  return restaurantAPI.post(`${URL}/workers`, data)
    .then((response) => {
      return response.data;
    });
}

export function updateWorker(token, workerId, name, surname, password, username, workerLevel) {
  const data = {token, name, surname, password, username, workerLevel};
  return restaurantAPI.put(`${URL}/workers/${workerId}`, data)
    .then((response) => {
      return response.data;
    });
}
