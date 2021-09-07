import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import testData from '../data/test_data.json';
import { Avatar, Paper } from '@material-ui/core';
import './ActionField.css';

function ActionField() {
    const [riderIndex,setRiderIndex] = useState(0);
    const [driverIndex,setDriverIndex] = useState(0);
    const [riderPhoto,setRiderPhoto] = useState("");
    const [driverPhoto,setDriverPhoto] = useState("");
    const [riderName,setRiderName] = useState("None");
    const [driverName,setDriverName] = useState("None");
    const driversList = testData.driversList;
    const ridersList = testData.ridersList;

    const populateAll = (e) => {
        e.preventDefault();
        axios.get("http://localhost:5001/kapiot-46cbc/us-central1/populateAll");
    }
    const requestDriver = (e) => {
        e.preventDefault();
        setDriverPhoto(driversList[driverIndex].user.photoUrl);
        setRiderPhoto(ridersList[riderIndex].user.photoUrl);
        setDriverName(driversList[driverIndex].user.displayName);
        setRiderName(ridersList[riderIndex].user.displayName);
        console.log(driverPhoto);
        axios.get("http://localhost:5001/kapiot-46cbc/us-central1/requestDriver?r=" + riderIndex.toString() + "&d=" + driverIndex.toString());
    }
    const requestAllDrivers = (e) => {
        e.preventDefault();
        axios.get("http://localhost:5001/kapiot-46cbc/us-central1/requestAllDrivers?r=" + riderIndex.toString());
    }
    const acceptRider = (e) => {
        e.preventDefault();
        setDriverPhoto(driversList[driverIndex].user.photoUrl);
        setRiderPhoto(ridersList[riderIndex].user.photoUrl);
        setDriverName(driversList[driverIndex].user.displayName);
        setRiderName(ridersList[riderIndex].user.displayName);
        axios.get("http://localhost:5001/kapiot-46cbc/us-central1/acceptRider?r=" + riderIndex.toString() + "&d=" + driverIndex.toString());
    }
    const dropRider = (e) => {
        e.preventDefault();
        setDriverPhoto(driversList[driverIndex].user.photoUrl);
        setRiderPhoto(ridersList[riderIndex].user.photoUrl);
        setDriverName(driversList[driverIndex].user.displayName);
        setRiderName(ridersList[riderIndex].user.displayName);
        axios.get("http://localhost:5001/kapiot-46cbc/us-central1/dropRider?r=" + riderIndex.toString() + "&d=" + driverIndex.toString());
    }
    return (
        <div className="actionField">
        <div className="actionField__left">
            <div className="actionField__left__input">
                <h3>Rider Index</h3>
                <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                style={{width: 120,}} 
                onChange={(e) => setRiderIndex(e.target.value)}
                />
            </div>
            <div className="actionField__left__input">
            <h3>Driver Index</h3>
                <TextField
                id="outlined-number"
                label="Number"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                style={{width: 120,}}
                onChange={(e) => setDriverIndex(e.target.value)}
                />
            </div>
      
        {console.log(riderIndex)}
        {console.log(driverIndex)}
        </div>
        <div className="actionField__center">
            <div className="actionField__center__buttons">
                <Button onClick={requestDriver} variant='contained' color='primary' className="action__button">Request Driver</Button>
                <Button onClick={requestAllDrivers}variant='contained' color='primary' className="action__button">Request All Drivers</Button>
                <Button onClick={acceptRider}variant='contained' color='primary' className="action__button">Accept Rider</Button>
                <Button onClick={dropRider} variant='contained' color='primary' className="action__button">Drop Rider</Button>
                <Button onClick={populateAll} variant='contained' color='primary' className="action__button">Populate Firebase</Button>
            </div>
        </div>
        <Paper className="actionField__right">
        <div className="actionField__right__info">
            <h1>Rider:</h1>
            <Avatar className="user__avatar" src = {riderPhoto}/>
            <h3>{riderName}</h3>
        </div> 
        <div className="actionField__right__info">
            <h1>Driver:</h1>
            <Avatar className="user__avatar" src = {driverPhoto}/>
            <h3>{driverName}</h3>
        </div>

        </Paper>
    </div>
    )
}

export default ActionField
