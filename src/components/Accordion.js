import React from 'react';
import './Accordion.css';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataTable from './Table';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function DataAccordion() {
  const classes = useStyles();
  return (
    <div className={classes.root} >
      <Accordion className='accordion'>
        <AccordionSummary
        className='accordion'
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Hide/Unhide Table</Typography>
        </AccordionSummary>
        <AccordionDetails className='accordion'>
          <DataTable className='accordion'></DataTable>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}