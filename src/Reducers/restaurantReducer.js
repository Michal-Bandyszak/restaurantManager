export const initialRestaurantState = {
  shifts: [],
  user: null,
  workers: []
};


const LOGIN_USER = '[USER] Login';

const LOAD_SHIFTS = '[SHIFT] Load Shifts';
const ADD_SHIFT = '[SHIFT Add Shift'
const DELETE_SHIFT = '[SHIFT] Delete Shift';

const ADD_WORKER = '[WORKER] Add Worker';
const DELETE_WORKER = '[WORKER] Delete Worker';

export const loginUser = (username, password) => ({
  type: LOGIN_USER,
  payload: { username, password },
});

export const addNewShift = (shift) => ({
  type: ADD_SHIFT,
  payload: { shift }
});

export const addWorker = (worker) => ({
  type: ADD_WORKER,
  payload: { worker },
});


export const deleteWorker = (workerId) => ({
  type: DELETE_WORKER,
  payload: { workerId },
});


export const deleteWorkerShift = (shift) => ({
  type: DELETE_SHIFT,
  payload: {shift}
})

export const loadShifts = (shifts) => ({
  type: LOAD_SHIFTS,
  payload: {shifts}
})

export const workerReducer = (state = initialRestaurantState, action) => {
  switch (action.type) {
    case ADD_WORKER:
      return {
        ...state,
        workers: [...state.workers, action.payload.worker],
      };

    case LOGIN_USER:
      return {
        ...state,
        user: {
          username: action.payload.username,
          password: action.payload.password,
        }
      };
    
      case ADD_SHIFT:
        return {
          ...state,
          shifts: [...state.shifts, action.payload]
        }

    case LOAD_SHIFTS:
      return {
        ...state,
        shifts: [
          ...action.payload.shifts
        ]
      };

    case DELETE_SHIFT:
      return {
        ...state,
        shifts: state.shifts.filter((shift) => shift.id !== action.payload.shiftId),
      };

    case DELETE_WORKER:
      return {
        ...state,
        workers: state.workers.filter((worker) => worker.id !== action.payload.workerId),
      };

    default:
      return state;
  }
}