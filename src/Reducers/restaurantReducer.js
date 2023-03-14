export const initialRestaurantState = {
  shifts: [],
  user: null,
};


const  ADD_WORKER = '[WORKER] Add Worker';
const LOGIN_USER = '[User] Login';

export const loginUser = () => ({
  type: LOGIN_USER,
});


export const addWorker = (worker) => ({
  type: ADD_WORKER,
  payload: { worker },
});

export const workerReducer = (state = initialRestaurantState, action) => {
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
          username: {username},
          name: {name}
        }
      }
  }
}