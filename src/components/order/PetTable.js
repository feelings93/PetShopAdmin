import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import PropTypes from 'prop-types';
import { Delete } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: blue[50],
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function PetTable({ pets, onDelete }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell align='left'>Tên</StyledTableCell>
            <StyledTableCell align='right'>Đơn giá</StyledTableCell>
            <StyledTableCell align='right'>Tổng giá thú cưng</StyledTableCell>
            <StyledTableCell align='right'></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pets.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component='th' scope='row'>
                {row.petId}
              </StyledTableCell>
              <StyledTableCell align='left'>{row.name}</StyledTableCell>
              <StyledTableCell align='right'>{row.price}</StyledTableCell>
              <StyledTableCell align='right'>
                { row.price}
              </StyledTableCell>
              <StyledTableCell align='right'>
                {onDelete && (
                  <IconButton onClick={onDelete.bind(null, row.petId)}>
                    <Delete />
                  </IconButton>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

PetTable.propTypes = {
  pets: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onDelete: PropTypes.func,
};
