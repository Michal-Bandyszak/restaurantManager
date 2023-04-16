import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { RestaurantContext } from '../../Context/Context';
import { toggleDeleteModal } from '../../Reducers/restaurantReducer';

export default function RestaurantTable({ workers }) {
  const [, dispatch] = useContext(RestaurantContext);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Surname</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Worker Level</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker) => (
            <TableRow
              key={worker.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {worker.id}
              </TableCell>
              <TableCell align="right">{worker.name}</TableCell>
              <TableCell align="right">{worker.surname}</TableCell>
              <TableCell align="right">{worker.username}</TableCell>
              <TableCell align="right">{worker.workerLevel}</TableCell>
              <TableCell align="right">
                <FiEdit />
                <FiTrash2 onClick={() => dispatch(toggleDeleteModal())} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
