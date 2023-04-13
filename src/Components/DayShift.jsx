import React, { useMemo, useContext } from 'react';
import './DayShift.scss';
import { RestaurantContext } from '../Context/Context';
import { groupeShifts } from '../utils/groupShifts';
import WorkerCard from './WorkerCard';

export default function DayShift({ day, date }) {
  const [{ shifts }] = useContext(RestaurantContext);
  const groupedShifts = useMemo(() => groupeShifts(shifts), [shifts]);

  return (
    <div className="col-12 col-md day-shift">
      <div className="week-day">
        <p className="day">{day}</p>
        <p className="date">{date}</p>
      </div>
      <div className="shifts-container">
        <div key={date} className="date-column">
          <div className="shifts-by-date">
            {groupedShifts[date] &&
              groupedShifts[date].map((shift) => (
                <WorkerCard key={shift.id} shift={shift} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
