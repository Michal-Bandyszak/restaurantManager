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
import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';

export default function Dashboard() {
  const [{ shifts }, dispatch] = useContext(RestaurantContext);
  const [isShiftsActive, setIsShiftsActive] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllShifts()
      .then((shifts) => {
        dispatch(loadShifts(shifts));
      })
      .catch();
  }, [dispatch]);

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
      <RestaurantDialog open={open} onClose={handleClose} title="Add shift">
        <AddNewShiftModal handleClose={handleClose} />
      </RestaurantDialog>
    </div>
  );
}
