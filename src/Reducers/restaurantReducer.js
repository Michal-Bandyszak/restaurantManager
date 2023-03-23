export const initialRestaurantState = {
  shifts: [],
  user: null,
};


const  ADD_WORKER = '[WORKER] Add Worker';
const LOGIN_USER = '[User] Login';
const LOGOUT_USER = '[User] Logout';
const LOAD_SHIFTS = '[Shifts] Load Shifts'

export const loginUser = (username, password) => ({
  type: LOGIN_USER,
  payload: { username, password },
});



export const addWorker = (worker) => ({
  type: ADD_WORKER,
  payload: { worker },
});

export const loadShifts = (shifts) => ({
  type: LOAD_SHIFTS,
  payload: {shifts}
})

export const workerReducer = (state = initialRestaurantState, action) => {
  console.group('New Action');
  console.log('Type:', action.type);
  console.log('Payload:', action.payload);
  console.groupEnd('New Action');

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
      case LOGIN_USER:
        return {
          ...state,
          user: {
            username: action.payload.username,
            password: action.payload.password,
          },
        };
      
  }
}