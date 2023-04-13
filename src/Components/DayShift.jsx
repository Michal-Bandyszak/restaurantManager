import React, { useMemo, useContext } from 'react';
import './DayShift.scss';
import { RestaurantContext } from '../Context/Context';
import { groupeShifts } from '../utils/groupShifts';
import WorkerCard from './WorkerCard';

export default function DayShift({ day, date }) {
  const [{ shifts }] = useContext(RestaurantContext);
  console.log(shifts);
  const groupedShifts = useMemo(() => groupeShifts(shifts), [shifts]);
  console.log(groupedShifts);

  //In date mamy objekt z data, trzeba posortowac shifty tak jak to bylo w kanban borad
  //sprawdzic konsole jak to wyglada
  
  return (
    <div className="col-12 col-md day-shift">
      <div className="week-day">
        <p className="day">{day}</p>
        <p className="date">{date}</p>
      </div>
      <div className="shifts-container">
        {Object.keys(groupedShifts).map((date) => (
          <div key={date} className="date-column">
            <div className="shifts-by-date">
              {groupedShifts[date].map((shift) => (
                <WorkerCard key={shift.id} shift={shift} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
