export const initialRestaurantState = {
  shifts: [],
  user: null,
};


const  ADD_WORKER = '[WORKER] Add Worker';
const LOGIN_USER = '[USER] Login';
const LOAD_SHIFTS = '[SHIFTS] Load Shifts'
const DELETE_SHIFT = '[SHIFT] Delete Shift'

export const loginUser = (username, password) => ({
  type: LOGIN_USER,
  payload: { username, password },
});

export const addWorker = (worker) => ({
  type: ADD_WORKER,
  payload: { worker },
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
  // console.group('New Action');
  // console.log('Type:', action.type);
  // console.log('Payload:', action.payload);
  // console.groupEnd('New Action');

  switch (action.type) {
    case ADD_WORKER:
      return {
        ...state,
        worker: [action.payload.worker, ...state.user]
      }
    case LOGIN_USER:
      return {
        ...state,
        user: {
          username: action.payload.username,
          password: action.payload.password,
        }
      }
    case LOAD_SHIFTS:
      return {
        ...state,
        shifts: [
          ...action.payload.shifts
        ]
      }
      case "DELETE_SHIFT":
        return {
          ...state,
          shifts: state.shifts.filter((shift) => shift.id !== action.payload.id),
        };

      default:
        return state;
  }
}