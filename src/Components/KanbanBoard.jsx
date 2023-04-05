import React, { useContext, useState } from "react";
import { RestaurantContext } from "../Context/Context";
import { format } from "date-fns";
import "./KanbanBoard.css";
import { useEffect } from "react";
import { getAllShifts } from "../API/Api";
import {loadShifts} from "../Reducers/restaurantReducer"
import Button from '@mui/material/Button';
import RestaurantDialog from './UI/Dialog';
import AddNewShiftModal from './modals/AddShift';
import UpdateShiftModal from './modals/UpdateShift';

export default function KanbanBoard() {
  //reaading from state
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [{ shifts }, dispatch] = useContext(RestaurantContext);

  //writing to state -> getting fetch from server and adding it to state.
  useEffect(() => {
    getAllShifts()
      .then((shifts) => {
        console.log(shifts)
        dispatch(loadShifts(shifts));
      })
      .catch();
  }, []);

  // group shifts by date and sort by date
  const groupedShifts = shifts
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .reduce((acc, shift) => {
      const date = format(new Date(shift.date), "dd.MM.yyyy");
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

    const handleClose = (value) => {
      setOpen(false);
    };

  return (
    <div className="kanban-board">
      <h2>Kanban Board</h2>
      <div className="shifts-container">
        {Object.keys(groupedShifts).map((date) => (
          <div key={date} className="date-column" onClick={handleClickUpdateOpen}>
            <h3>
              {date}
              <div className="shifts-by-date">
                {groupedShifts[date].map((shift) => (
                  <div
                    key={shift.id}
                    className={`shift-card ${
                      shift.available ? "" : "not-available"
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

    <RestaurantDialog
        open={open}
        onClose={handleClose}>
          <AddNewShiftModal />
    </RestaurantDialog>

    <RestaurantDialog
        open={updateOpen}
        onClose={handleClickUpdateClose}>
          <UpdateShiftModal />
    </RestaurantDialog>
    </div>
  );
}
