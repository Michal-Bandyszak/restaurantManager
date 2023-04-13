import React, { useContext } from 'react';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import './WorkerCard.scss';
import { RestaurantContext } from '../Context/Context';
import {
  selectShift,
  toggleDeleteModal,
  toggleUpdateModal,
} from '../Reducers/restaurantReducer';

export default function WorkerCard({ shift }) {
  const [, dispatch] = useContext(RestaurantContext);

  return (
    <div
      key={shift.id}
      className={`shift-card ${shift.available ? '' : 'not-available'}`}
    >
      <p className="worker-name">
        Worker:
        {shift.worker
          ? ` ${shift.worker.name} ${shift.worker.surname}`
          : ' Not Available'}
      </p>
      <div className="time-start">
        <p>Start hour: {shift.startHour}</p>
        <p>Availability: {shift.available ? 'Yes' : 'No'}</p>
      </div>
      <p>End hour: {shift.endHour}</p>
      <div
        className="action-icons"
        onClick={() => dispatch(selectShift(shift))}
      >
        <FiEdit onClick={() => dispatch(toggleUpdateModal())} />
        <FiTrash2 onClick={() => dispatch(toggleDeleteModal())} />
      </div>
    </div>
  );
}
