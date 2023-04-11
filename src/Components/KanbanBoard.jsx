import React, { useContext, useState } from 'react';
import { RestaurantContext } from '../Context/Context';
import { format } from 'date-fns';
import './KanbanBoard.css';
import { useEffect } from 'react';
import { getAllShifts } from '../API/api';
import { loadShifts } from '../Reducers/restaurantReducer';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import RestaurantDialog from './UI/Dialog';
import AddNewShiftModal from './modals/AddShift';
import UpdateShiftModal from './modals/UpdateShift';
import DeleteShiftModal from './modals/DeleteShift';

export default function KanbanBoard() {
  //reaading from state
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [state, dispatch] = useContext(RestaurantContext);
  const { shifts } = state;

  //writing to state -> getting fetch from server and adding it to state.
  useEffect(() => {
    getAllShifts()
      .then((shifts) => {
        dispatch(loadShifts(shifts));
      })
      .catch();
  }, [dispatch]);

  // group shifts by date and sort by date
  const groupedShifts = shifts
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, shift) => {
      const date = format(new Date(shift.date), 'dd.MM.yyyy');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(shift);
      return acc;
    }, {});

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickUpdateOpen() {
    setUpdateOpen(true);
  }

  function handleClickUpdateClose() {
    setUpdateOpen(false);
  }

  function handleClickDeleteClose() {
    setDeleteOpen(false);
  }

  const handleClose = (value) => {
    setOpen(false);
  };

  function handleClickDeleteOpen(shift) {
    setSelectedShift(shift);
    setDeleteOpen(true);
  }

  return (
    <div className="kanban-board">
      <h2>Kanban Board</h2>
      <div className="shifts-container">
        {Object.keys(groupedShifts).map((date) => (
          <div key={date} className="date-column">
            {/* onClick={handleClickUpdateOpen} */}
            <h3>
              {date}
              <div className="shifts-by-date">
                {groupedShifts[date].map((shift) => (
                  <div
                    key={shift.id}
                    className={`shift-card ${
                      shift.available ? '' : 'not-available'
                    }`}
                  >
                    {shift.worker ? (
                      <p>
                        Worker: {shift.worker.name} {shift.worker.surname}
                      </p>
                    ) : (
                      <p>Worker: Not Available</p>
                    )}
                    {shift.available && (
                      <>
                        <p>
                          Time: {shift.startHour} - {shift.endHour}
                        </p>
                        <p>Availability: Yes</p>
                      </>
                    )}
                    {!shift.available && <p>Availability: No</p>}
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleClickDeleteOpen(shift.id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </h3>
          </div>
        ))}
      </div>

      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>

      <RestaurantDialog open={open} onClose={handleClose}>
        <AddNewShiftModal />
      </RestaurantDialog>

      <RestaurantDialog open={deleteOpen} onClose={handleClickDeleteClose}>
        <DeleteShiftModal
          shift={selectedShift}
          onClose={handleClickDeleteClose}
        />
      </RestaurantDialog>

      <RestaurantDialog open={updateOpen} onClose={handleClickUpdateClose}>
        <UpdateShiftModal />
      </RestaurantDialog>
    </div>
  );
}
