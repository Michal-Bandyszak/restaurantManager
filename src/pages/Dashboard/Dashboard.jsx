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
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';
import DeleteShiftModal from '../../Components/modals/DeleteShift';
import {
  toggleDeleteModal,
  toggleUpdateModal,
} from '../../Reducers/restaurantReducer';

export default function Dashboard() {
  const [
    { shifts, isDeleteModalOpened, isUpdateModalOpened, user, workers },
    dispatch,
  ] = useContext(RestaurantContext);
  const [isShiftsActive, setIsShiftsActive] = useState(true);
  const [open, setOpen] = useState(false);
  console.log(workers);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    dispatch(loginUser(user));
    getWorkers().then((workers) => {
      dispatch(getAllWorkers(workers));
    });
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
  }, [user]);

  if (!shifts.length) {
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
          >
            Workers
          </Button>
        </ButtonGroup>
        <Button
          onClick={() => setOpen(true)}
          className="add-shift"
          variant="contained"
        >
          Add shift
        </Button>
      </div>
      <div className="dashboard-content">
        {isShiftsActive ? (
          <RestaurantCarousel
            firstStepArr={dayOfWeek.filter((day) => day.isFirstStep)}
            secondStepArr={dayOfWeek.filter((day) => !day.isFirstStep)}
          />
        ) : (
          <RestaurantTable />
        )}
      </div>

      <RestaurantDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Add shift"
      >
        <AddNewShiftModal handleClose={() => setOpen(false)} />
      </RestaurantDialog>

      <RestaurantDialog
        open={isDeleteModalOpened}
        onClose={() => dispatch(toggleDeleteModal())}
        title="Are you sure?"
      >
        <DeleteShiftModal onClose={() => dispatch(toggleDeleteModal())} />
      </RestaurantDialog>

      <RestaurantDialog
        open={isUpdateModalOpened}
        onClose={() => dispatch(toggleUpdateModal())}
        title="Edit shift"
      >
        <AddNewShiftModal
          handleClose={() => toggleUpdateModal()}
          isEditModal={true}
        />
      </RestaurantDialog>
    </div>
  );
}
