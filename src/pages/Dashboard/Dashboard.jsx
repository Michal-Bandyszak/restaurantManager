import React, { useState, useEffect, useContext } from 'react';
import './Dashboard.scss';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import RestaurantCarousel from '../../Components/UI/Carousel/Carousel';
import RestaurantTable from '../../Components/UI/Table';
import { dayOfWeek } from '../../data/dayOfWeek';
import { getAllShifts } from '../../API/api';
import { RestaurantContext } from '../../Context/Context';
import { loadShifts } from '../../Reducers/restaurantReducer';
import RestaurantDialog from '../../Components/UI/Dialog';
import AddNewShiftModal from '../../Components/modals/AddShift';

export default function Dashboard() {
  const [, dispatch] = useContext(RestaurantContext);
  const [isShiftsActive, setIsShiftsActive] = useState(true);
  const [open, setOpen] = useState(false);
  const [shiftsChanged, setShiftsChanged] = useState(0);

  const handleClose = (newShift) => {
    setOpen(false);
    if (newShift) {
      dispatch({ type: 'ADD_SHIFT', payload: newShift });
    }
    setShiftsChanged(shiftsChanged + 1); // increment shiftsChanged to trigger a re-render
  };

  useEffect(() => {
    getAllShifts()
      .then((shifts) => {
        dispatch(loadShifts(shifts));
      })
      .catch();
  }, [dispatch]);

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
      <RestaurantDialog open={open} onClose={handleClose}>
        <AddNewShiftModal />
      </RestaurantDialog>
    </div>
  );
}
