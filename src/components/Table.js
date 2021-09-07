import './Table.css';
import testData from '../data/test_data.json';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
});


function DataTable() {
  const classes = useStyles();
  const [index,setIndex] = useState();
  return (
    <div className="table">
    <div className="table__main">
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Driver</strong></TableCell>
            <TableCell><strong>Driver Id</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testData.driversList.map((row) => (
            <TableRow key={row.id}>
              <TableCell >{row.user.displayName}</TableCell>
              <TableCell>{row.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Rider</strong></TableCell>
            <TableCell><strong>Rider Id</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testData.ridersList.map((row) => (
            <TableRow key={row.id}>
              <TableCell >{row.user.displayName}</TableCell>
              <TableCell>{row.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </div>
  );
}

export default DataTable;
