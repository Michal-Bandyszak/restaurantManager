import axios from 'axios';
const URL = 'http://localhost:8088';

const restaurantAPI = axios.create({
  baseURL: URL,
  headers: {
    token: localStorage.getItem('restaurant-token'),
  },
});

export function getAllShifts() {
  return restaurantAPI.get(`${URL}/shift/all`)
    .then((response) => {
      return response.data;
    });

  // const data = [
  //   {
  //     id: 1,
  //     worker: {
  //       id: 1,
  //       username: 'username1',
  //       password: null,
  //       name: 'name1',
  //       surname: 'surname1',
  //       workerLevel: null,
  //     },
  //     date: '2022-12-30T23:00:00.000+00:00',
  //     startHour: 8,
  //     endHour: 16,
  //     available: true,
  //   },
  //   {
  //     id: 2,
  //     worker: {
  //       id: 1,
  //       username: 'username1',
  //       password: null,
  //       name: 'name1',
  //       surname: 'surname1',
  //       workerLevel: null,
  //     },
  //     date: '2022-12-29T23:00:00.000+00:00',
  //     startHour: 9,
  //     endHour: 12,
  //     available: true,
  //   },
  //   {
  //     id: 3,
  //     worker: {
  //       id: 1,
  //       username: 'username1',
  //       password: null,
  //       name: 'name1',
  //       surname: 'surname1',
  //       workerLevel: null,
  //     },
  //     date: '2022-12-28T23:00:00.000+00:00',
  //     startHour: 8,
  //     endHour: 16,
  //     available: false,
  //   },
  //   {
  //     id: 4,
  //     worker: {
  //       id: 2,
  //       username: 'username2',
  //       password: null,
  //       name: 'name2',
  //       surname: 'surname2',
  //       workerLevel: null,
  //     },
  //     date: '2022-12-29T23:00:00.000+00:00',
  //     startHour: 9,
  //     endHour: 17,
  //     available: true,
  //   },
  // ];
  // return Promise.resolve(data);
}

export function login(username, password) {
  const config = {
    params: { username, password },
  };

  return axios.get(`${URL}/login`, config).then((response) => {
    localStorage.setItem('restaurant-token', response.data.token);
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

export function updateWorkerShift(
  token,
  startHour,
  endHour,
  isAvailable,
  shiftId,
  workerId
) {
  const data = { startHour, endHour, isAvailable, workerId };
  return restaurantAPI.put(`${URL}/shift/${shiftId}`, data).then((response) => {
    return response.data;
  });
}

export function deleteWorkerShift(shiftId) {
  console.log(shiftId);
  return restaurantAPI
    .delete(`${URL}/shift/${shiftId}`)
    .then((response) => {
      console.log(response);
      return response.data;
    })
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

export function getWorkerShift(startDate, endDate, workerId) {
  const params = { startDate, endDate, workerId };
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
