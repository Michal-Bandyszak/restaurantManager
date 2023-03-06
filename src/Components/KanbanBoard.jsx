import React, { useContext } from 'react';
import { ShiftContext } from './ShiftContext';
import { format } from 'date-fns';
import './KanbanBoard.css';

export function KanbanBoard() {
  const { shifts } = useContext(ShiftContext);

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

  return (
    <div className="kanban-board">
      <h2>Kanban Board</h2>
      <div className="shifts-container">
        {Object.keys(groupedShifts).map((date) => (
          <div key={date} className="date-column">
            <h3>{date}
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
                        <p>Time: {shift.startHour} - {shift.endHour}</p>
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
    </div>
  );
}