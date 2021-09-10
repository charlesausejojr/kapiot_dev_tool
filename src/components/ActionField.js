import React, { useEffect, useState } from 'react'
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
    const [routeDriverPhoto,setRouteDriverPhoto] = useState("");
    const [routeDriverName,setRouteDriverName] = useState("None");
    const [riderName,setRiderName] = useState("None");
    const [driverName,setDriverName] = useState("None");
    const [routeList,setRouteList] = useState([]);
    const [index,setIndex] = useState(0);
    const [hasRoute,setHasRoute] = useState(false);

    const driversList = testData.driversList;
    const ridersList = testData.ridersList;

    useEffect(()=> {
        console.log(routeList);
    },[routeList]);
    useEffect(()=> {

    },[index])
    async function pushData(url){
        await axios.get(url);
    }
    const manualPush = async (e) => {
        var lat = routeList[index][0];
        var lng = routeList[index][1];
        console.log(lat);
        console.log(lng);
        var url = 'http://localhost:5001/kapiot-46cbc/us-central1/setRoute?d=' + driverIndex.toString() + '&lat=' + lat.toString() + '&lng=' + lng.toString();
        pushData(url);
        setIndex(index+1);
    }
    const startPush = async (e) => {
        e.preventDefault();
        for(var i = 0; i < routeList.length; i ++){
            var lat = routeList[i][0];
            var lng = routeList[i][1];
            console.log(lat);
            console.log(lng);
            var url = 'http://localhost:5001/kapiot-46cbc/us-central1/setRoute?d=' + driverIndex.toString() + '&lat=' + lat.toString() + '&lng=' + lng.toString();
            setTimeout(pushData,3000,url);
        }
    }
    const setRoute = async (e) =>  {
        e.preventDefault();
        const foundRoute = await axios.get("http://localhost:5001/kapiot-46cbc/us-central1/getRoute?d="+driverIndex.toString());
        setRouteList(foundRoute.data);
        setRouteDriverPhoto(driversList[driverIndex].user.photoUrl);
        setRouteDriverName(driversList[driverIndex].user.displayName);
        setHasRoute(true);
    }
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
                <Button onClick={setRoute} variant='contained' color='primary' className="action__button">Set Route</Button>
                {hasRoute && <> 
                    <Button onClick={startPush} variant='contained' color='primary' className="action__button">Start Route Push</Button>
                    <Button onClick={manualPush} variant='contained' color='primary' className="action__button">Manual Route Push</Button>
                    </>
                }
            </div>
        </div>
        <Paper className="actionField__right">
        <div className="actionField__right__info">
            <h1>Route:</h1>
            <Avatar className="user__avatar" src = {routeDriverPhoto}/>
            <h3>{routeDriverName}</h3>
        </div> 
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
