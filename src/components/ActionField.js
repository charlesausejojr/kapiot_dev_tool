import React, { useEffect, useState } from 'react'
import AutoRoute from './AutoRoute';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import testData from '../data/test_data.json';
import { Avatar, Box, Paper } from '@material-ui/core';
import './ActionField.css';
import { FastForward, Room } from '@material-ui/icons';
import LinearProgressWithLabel from './shared/LinearProgressWithLabel';

var routesToPush  = [];
var tempInfo = {};

function ActionField() {
    const [riderIndex,setRiderIndex] = useState(0);
    const [driverIndex,setDriverIndex] = useState(0);
    const [riderPhoto,setRiderPhoto] = useState("");
    const [driverPhoto,setDriverPhoto] = useState("");
    const [routeDriverPhoto,setRouteDriverPhoto] = useState("");
    const [riderName,setRiderName] = useState("None");
    const [driverName,setDriverName] = useState("None");
    const [routeList,setRouteList] = useState([]);
    const [index,setIndex] = useState(0);
    const [isManual,setIsManual] = useState(false);
    const [hasRoute,setHasRoute] = useState(false);
    const [isAuto,setIsAuto] = useState(false);
    const [currentArray,setCurrentArray] = useState([]);
    const [percentage,setPercentage] = useState(1);
    const [progress,setProgress] = useState(0);
    const [routes,setRoutes] = useState([]);
    const [routesIndex,setRoutesIndex] = useState(0);
    const [autoIsPressed,setAutoIsPressed] = useState(false);

    const driversList = testData.driversList;
    const ridersList = testData.ridersList;

    useEffect(()=> {
        console.log(routeList);
    },[routeList]);
    useEffect(()=> {
        setRoutes(routesToPush);
    },[routesIndex]);
    useEffect(()=> {
        var indexFromPercent = Math.round(routeList.length * (percentage/100));
        setIndex(indexFromPercent);
    },[percentage, routeList.length]);

    useEffect(()=>{
        if(index===routeList.length){
            setProgress(100);
        }
    },[index,routeList.length])
    function pushData(url){
        axios.get(url);
    }
    function setInfo() {
        setDriverPhoto(driversList[driverIndex].user.photoUrl);
        setRiderPhoto(ridersList[riderIndex].user.photoUrl);
        setDriverName(driversList[driverIndex].user.displayName);
        setRiderName(ridersList[riderIndex].user.displayName);
    }
    const deleteAll = async (e) => {
        e.preventDefault();
        var url = 'http://localhost:5001/kapiot-46cbc/us-central1/recursiveDelete';
        axios.get(url);
    }
    const reset = (e) => {
        e.preventDefault();
        setHasRoute(false);
        setIndex(0);
        setRoutesIndex(0);
        setRoutes([]);
        routesToPush = [];
        setRouteList([]);
        autoIsPressed(false);
        setIsManual(false);
        setIsAuto(false);
        setProgress(0);
        setPercentage(1);
        setCurrentArray([]);
    }
    const manualPush = (e) => {
        e.preventDefault();
        setIsManual(true);
        var lat = routeList[index][0];
        var lng = routeList[index][1];
        var url = 'http://localhost:5001/kapiot-46cbc/us-central1/setRoute?d=' + driverIndex.toString() + '&lat=' + lat.toString() + '&lng=' + lng.toString();
        setCurrentArray([lat,lng]);
        pushData(url);
        setIndex(index => index+1);
        setProgress(Math.round((index/routeList.length) * 100));
        if(index>=routeList.length){
            setIndex(0);
            isManual(false);
        }
    }
    const startPush = async (e) => {
        e.preventDefault();
        setAutoIsPressed(true);
    }
    const setManualRoute = async (e) =>  {
        e.preventDefault();
        const foundRoute = await axios.get("http://localhost:5001/kapiot-46cbc/us-central1/getRoute?d="+driverIndex.toString());
        setRouteList(foundRoute.data);
        setRouteDriverPhoto(driversList[driverIndex].user.photoUrl);
        setIsManual(true);
        setHasRoute(true);
    }
    const setAutoRoute = async (e) =>  {
        e.preventDefault();
        const foundRoute = await axios.get("http://localhost:5001/kapiot-46cbc/us-central1/getRoute?d="+driverIndex.toString());
        tempInfo = {
            routesToPush: foundRoute.data,
            driverPhoto: routeDriverPhoto,
            driverIndex: driverIndex,
        };
        routesToPush[routesIndex] = tempInfo;
        setRoutesIndex(routesIndex + 1);
        setRouteList(routesToPush);
        setRouteDriverPhoto(driversList[driverIndex].user.photoUrl);
        setIsAuto(true);
        setHasRoute(true);
    }
    const populateAll = (e) => {
        e.preventDefault();
        axios.get("http://localhost:5001/kapiot-46cbc/us-central1/populateAll");
    }
    const requestDriver = (e) => {
        e.preventDefault();
        setInfo();
        axios.get("http://localhost:5001/kapiot-46cbc/us-central1/requestDriver?r=" + riderIndex.toString() + "&d=" + driverIndex.toString());
    }
    const requestAllDrivers = (e) => {
        e.preventDefault();
        axios.get("http://localhost:5001/kapiot-46cbc/us-central1/requestAllDrivers?r=" + riderIndex.toString());
    }
    const acceptRider = (e) => {
        e.preventDefault();
        setInfo();
        axios.get("http://localhost:5001/kapiot-46cbc/us-central1/acceptRider?r=" + riderIndex.toString() + "&d=" + driverIndex.toString());
    }
    const dropRider = (e) => {
        e.preventDefault();
        setInfo();
        axios.get("http://localhost:5001/kapiot-46cbc/us-central1/dropRider?r=" + riderIndex.toString() + "&d=" + driverIndex.toString());
    }
    return (
        <div>
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
      
        </div>
        <div className="actionField__center">
            <div className="actionField__center__buttons">
                <Button onClick={requestDriver} variant='contained' color='primary' className="action__button">Request Driver</Button>
                <Button onClick={requestAllDrivers}variant='contained' color='primary' className="action__button">Request All Drivers</Button>
                <Button onClick={acceptRider}variant='contained' color='primary' className="action__button">Accept Rider</Button>
                <Button onClick={dropRider} variant='contained' color='primary' className="action__button">Drop Rider</Button>
                <Button onClick={populateAll} variant='contained' color='primary' className="action__button">Populate Firestore Data</Button>
                <Button onClick={deleteAll} variant='contained' color='secondary' className="action__button">Delete Firestore Data</Button>
                {(!isAuto && !isManual) &&
                    <>
                        <Button onClick={setManualRoute} variant='contained' color='primary' className="action__button">Set Manual Route</Button>
                        <Button onClick={setAutoRoute} variant='contained' color='primary' className="action__button">Set Auto Route</Button>
                    </>
                }
                {( isAuto && !isManual ) && 
                    <>
                        <Button onClick={setAutoRoute} variant='contained' color='primary' className="action__button">Set Another Route</Button>
                        <Button onClick={startPush} variant='contained' color='primary' className="action__button">Auto Route Push</Button>
                    </>
                }
                {( hasRoute && !isAuto && !isManual)&&
                  <> 
                    <Button onClick={startPush} variant='contained' color='primary' className="action__button">Auto Route Push</Button>
                    <Button onClick={manualPush} variant='contained' color='primary' className="action__button">Manual Route Push</Button>
                    </>
                }
                {(isManual || isAuto) &&
                    <Button onClick={reset} variant="contained" color='primary' className="action__button">Reset</Button>
                }

            </div>
        </div>

        <Paper className="actionField__right">
        { (isAuto && !autoIsPressed) && 
            <Paper className="actionField__right__autoRouteInfo">
                <h2>Auto Routes:</h2>
                {routes.map((currentRoute) => (
                    <Avatar className="actionField__right__autoRouteInfo__avatar" src={currentRoute.driverPhoto}></Avatar>
                ))}
            </Paper>
        }
       
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
        {isManual &&
           <div className="actionfield__right__info">
                <div className="route__manual">
                    <div className="actionField__left__input">
                        <h5>Percentage:</h5>
                        <TextField
                            id="outlined-number-percentage"
                            label="Number"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            style={{width: 90,}}
                            onChange={(e) => setPercentage(e.target.value)}
                        />
                        <Button onClick={manualPush} variant='contained' color='primary' id="action__button__percentage">
                            <Room/>
                        </Button>
                </div>
                    <Button onClick={manualPush} variant='contained' color='primary' id="action__button__push">
                        <FastForward/>
                    </Button>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgressWithLabel className='progressbar' variant='determinate' value={progress} />
                    </Box>
                    <h4>Manual Pushed:</h4>
                    <h2>Lat: <small>{currentArray[0]}</small></h2>
                    <h2>Lng: <small>{currentArray[1]}</small></h2>
                </div>
    
          </div> 
        }

        </Paper>

        </div>
        {autoIsPressed && routes.map((currentRoute) => (
            <Paper>
                <AutoRoute routeDriverPhoto={currentRoute.driverPhoto} routeList={currentRoute.routesToPush} driverIndex={currentRoute.driverIndex} />               
            </Paper>
        ))}

    </div>
    )
}

export default ActionField
