import React, { useState, useEffect, useContext } from 'react';
import './Dashboard.scss';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import RestaurantCarousel from '../../Components/UI/Carousel/Carousel';
import RestaurantTable from '../../Components/UI/Table';
import { dayOfWeek } from '../../data/dayOfWeek';
import { getAllShifts, getWorkers, getWorkerShift } from '../../API/api';
import { RestaurantContext } from '../../Context/Context';
import {
  getAllWorkers,
  loadShifts,
  loginUser,
} from '../../Reducers/restaurantReducer';
import RestaurantDialog from '../../Components/UI/Dialog';
import AddNewShiftModal from '../../Components/modals/AddShift';
import AddNewWorkerModal from '../../Components/modals/AddWorker';
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';
import DeleteShiftModal from '../../Components/modals/DeleteShift';
import DeleteWorkerModal from '../../Components/modals/DeleteWorker';
import {
  toggleDeleteModal,
  toggleUpdateModal,
} from '../../Reducers/restaurantReducer';

export default function Dashboard() {
  const [
    { isDeleteModalOpened, isUpdateModalOpened, user, workers },
    dispatch,
  ] = useContext(RestaurantContext);
  const [isShiftsActive, setIsShiftsActive] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    dispatch(loginUser(user));
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const promise =
      user.workerLevel === 'ADMIN' ? getAllShifts() : getWorkerShift(user.id);

    promise
      .then((shifts) => {
        dispatch(loadShifts(shifts));
      })
      .catch();

    if (user.workerLevel === 'ADMIN') {
      getWorkers().then((workers) => dispatch(getAllWorkers(workers)));
    }
  }, [user]);

  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size="lg" variant="plain" />
      </Box>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <ButtonGroup className="data-type" disableElevation variant="contained">
          <Button
            onClick={() => setIsShiftsActive(true)}
            className={!isShiftsActive ? 'active' : ''}
          >
            Shifts
          </Button>
          <Button
            onClick={() => setIsShiftsActive(false)}
            className={isShiftsActive ? 'active' : ''}
            sx={{
              display: user && user.workerLevel === 'ADMIN' ? 'block' : 'none',
            }}
          >
            Workers
          </Button>
        </ButtonGroup>
        <Button
          onClick={() => setOpen(true)}
          className="add-shift"
          variant="contained"
        >
          {isShiftsActive ? 'Add shift' : 'Add Worker'}
        </Button>
      </div>
      <div className="dashboard-content">
        {isShiftsActive ? (
          <RestaurantCarousel
            firstStepArr={dayOfWeek.filter((day) => day.isFirstStep)}
            secondStepArr={dayOfWeek.filter((day) => !day.isFirstStep)}
          />
        ) : (
          <RestaurantTable workers={workers} />
        )}
      </div>

      <RestaurantDialog
        open={open}
        onClose={() => setOpen(false)}
        title={isShiftsActive ? 'Add shift' : 'Add worker'}
      >
        {isShiftsActive ? (
          <AddNewShiftModal handleClose={() => setOpen(false)} />
        ) : (
          <AddNewWorkerModal
            handleClose={() => setOpen(false)}
          ></AddNewWorkerModal>
        )}
      </RestaurantDialog>

      <RestaurantDialog
        open={isDeleteModalOpened}
        onClose={() => dispatch(toggleDeleteModal())}
        title="Are you sure?"
      >
        {isShiftsActive ? (
          <DeleteShiftModal onClose={() => dispatch(toggleDeleteModal())} />
        ) : (
          <DeleteWorkerModal onClose={() => dispatch(toggleDeleteModal())} />
        )}
      </RestaurantDialog>

      <RestaurantDialog
        open={isUpdateModalOpened}
        onClose={() => dispatch(toggleUpdateModal())}
        title={isShiftsActive ? 'Edit shift' : 'Edit worker'}
      >
        {isShiftsActive ? (
          <AddNewShiftModal
            handleClose={() => toggleUpdateModal()}
            isEditModal={true}
          />
        ) : (
          <AddNewWorkerModal
            handleClose={() => toggleUpdateModal()}
            isEditModal={true}
          />
        )}
      </RestaurantDialog>
    </div>
  );
}
