// Lista funkcji z fetch request np. sam fetch

export function login(username, password) {
  const params = new URLSearchParams({token, shiftId});
  return fetch(`http://localhost:8088/login?${params.toString()}`)
    .then((response) => {
      if(!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    })
}

export function getShiftById(token, shiftId) {
  const params = new URLSearchParams({token, shiftId});
  return fetch(`http://localhost:8088/shift?${params.toString()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    })
}


export function addShift(token, date, startHour, endHour, isAvailable, workerId) {
  const data = new FormData();
  data.append('token', token);
  data.append('date', date);
  data.append('startHour', startHour);
  data.append('endHour', endHour);
  data.append('isAvailable', isAvailable);
  data.append('workerId', workerId);

  return fetch('http://localhost:8088/shift', {
    method: 'POST',
    body: data
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json();
  });
}

export function updateWorkerShift(token, startHour, endHour, isAvailable, shiftId, workerId) {
  const formData = new FormData();
  formData.append('startHour', startHour);
  formData.append('endHour', endHour);
  formData.append('isAvailable', isAvailable);
  formData.append('workerId', workerId);
  
  return fetch(`http://localhost:8088/shift?${shiftId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json();
  });
}

export function deleteWorkerShift(token, shiftId, workerId) {
  const formData = new FormData();
  formData.append('shiftId', shiftId);
  formData.append('workerId', workerId);
  return fetch(`http://localhost:8088/shift?${shiftId, workerId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json();
  });
}


//Function to get all shifts from server -> main function 
export function getAllShifts() {
  return fetch('http://localhost:8088/shift/all')
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json()
  })
}

export function getAllWorkersShiftsByDates(startDate, endDate) {
  const params = new URLSearchParams({startDate, endDate});
  return fetch(`http://localhost:8088/shift/everyone?${params.toString()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    });
}


export function getWorkerShift(startDate, endDate, workerId) {
  const params = new URLSearchParams({startDate, endDate, workerId});
  return fetch(`https://localhost:8088/shift/worker?${params.toString()}`)
    .then((response) => {
      if(!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      return response.json();
    });
}

export function getWorker(token, workerId) {
  const params = new URLSearchParams({token, workerId});
  return fetch(`https://localhost:8088/workers?${token, workerId}`)
    .then((response) => {
      if(!response.ok) {
        throw new Error("HTTP status " + response.status)
      }
      return response.json();
    });
}

export function addWorker(token, name, surname, password, username, workerLevel) {
  const data = new FormData();
  data.append('token', token);
  data.append('name', name);
  data.append('surname', surname);
  data.append('password', password);
  data.append('username', username);
  data.append('workerLevel', workerLevel);

  return fetch(`http://localhost:8088/workers/`, {
    method: 'POST',
    body: data
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json();
  });
}


export function updateWorker(token, workerId, name, surname, password, username, workerLevel) {
  const data = new FormData();
  data.append('token', token);
  data.append('name', name);
  data.append('surname', surname);
  data.append('password', password);
  data.append('username', username);
  data.append('workerLevel', workerLevel);

  return fetch(`http://localhost:8088/workers/${workerId}`, {
    method: 'PUT',
    body: data
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json();
  });
}


export function deleteWorker(token, workerId) {
  const data = new FormData();
  data.append('token', token);
  data.append('workerId', workerId);

  return fetch(`http://localhost:8088/workers`, {
    method: 'DELETE',
    body: data
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }
    return response.json();
  });
}


export function getAllWorkers(token) {
  const params = new URLSearchParams({token});
  return fetch(`https://localhost:8088/workers/all?${params}`)
    .then((response) => {
      if(!response.ok) {
        throw new Error("HTTP status " + response.status)
      }
      return response.json();
    });
}
