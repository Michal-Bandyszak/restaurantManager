import axios from 'axios';

export function login(username, password) {
  const params = {username, password};
  return axios.post('http://localhost:8088/login', params)
    .then((response) => {
      return response.data;
    });
}

export function getShiftById(token, shiftId) {
  const params = {token, shiftId};
  return axios.get(`http://localhost:8088/shift`, {params})
    .then((response) => {
      return response.data;
    });
}

export function addShift(token, date, startHour, endHour, isAvailable, workerId) {
  const data = {token, date, startHour, endHour, isAvailable, workerId};
  return axios.post('http://localhost:8088/shift', data)
    .then((response) => {
      return response.data;
    });
}

export function updateWorkerShift(token, startHour, endHour, isAvailable, shiftId, workerId) {
  const data = {startHour, endHour, isAvailable, workerId};
  return axios.put(`http://localhost:8088/shift/${shiftId}`, data, {headers: {'Authorization': `Bearer ${token}`} })
    .then((response) => {
      return response.data;
    });
}

export function deleteWorkerShift(token, shiftId, workerId) {
  const data = {shiftId, workerId};
  return axios.delete(`http://localhost:8088/shift/${shiftId}`, {headers: {'Authorization': `Bearer ${token}`}, data})
    .then((response) => {
      return response.data;
    });
}

export function getAllShifts() {
  return axios.get('http://localhost:8088/shift/all')
    .then((response) => {
      return response.data;
    });
}

export function getAllWorkersShiftsByDates(startDate, endDate) {
  const params = {startDate, endDate};
  return axios.get(`http://localhost:8088/shift/everyone`, {params})
    .then((response) => {
      return response.data;
    });
}

export function getWorkerShift(startDate, endDate, workerId) {
  const params = {startDate, endDate, workerId};
  return axios.get(`http://localhost:8088/shift/worker`, {params})
    .then((response) => {
      return response.data;
    });
}

export function getWorker(token, workerId) {
  const params = {token, workerId};
  return axios.get(`http://localhost:8088/workers`, {params})
    .then((response) => {
      return response.data;
    });
}

export function addWorker(token, name, surname, password, username, workerLevel) {
  const data = {token, name, surname, password, username, workerLevel};
  return axios.post('http://localhost:8088/workers', data)
    .then((response) => {
      return response.data;
    });
}

export function updateWorker(token, workerId, name, surname, password, username, workerLevel) {
  const data = {token, name, surname, password, username, workerLevel};
  return axios.put(`http://localhost:8088/workers/${workerId}`, data)
    .then((response) => {
      return response.data;
    });
}
