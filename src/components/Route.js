import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Route.css'
import { Box, Button } from '@material-ui/core';
import { FastForward, FastRewind, Pause, PlayArrow, Replay, SettingsInputAntennaTwoTone } from '@material-ui/icons';
import LinearProgressWithLabel from './shared/LinearProgressWithLabel';

function Route({routeList, driverIndex}) {
    const [index,setIndex] = useState(0);
    const [currentArray,setCurrentArray] = useState([]);
    const [isRunning,setIsRunning] = useState(true);
    const [status,setStatus] = useState('');
    const [pushSpeed,setPushSpeed] = useState(1000);
    const [speedStatus,setSpeedStatus] = useState('1.00x');
    const [progress,setProgress] = useState(0);

    const fast_25 = (e) => {
        e.preventDefault();
        setPushSpeed(750);
        setSpeedStatus('1.25x');
    }
    const fast_50 = (e) => {
        e.preventDefault();
        setPushSpeed(500);
        setSpeedStatus('1.50x');
    }
    const slowed_25 = (e) => {
        e.preventDefault();
        setPushSpeed(1250);
        setSpeedStatus('0.25x');
    }
    const slowed_50 = (e) => {
        e.preventDefault();
        setPushSpeed(1500);
        setSpeedStatus('0.50x');
    }
    const normal_speed = (e) => {
        e.preventDefault();
        setPushSpeed(1000);
        setSpeedStatus('1.00x');
    }
    const pause = (e) => {
        e.preventDefault();
        setStatus('Paused');
        setIsRunning(false);
    }
    const play = (e) => {
        e.preventDefault();
        setStatus('');
        setIsRunning(true);
    }
    const reset = (e) => {
        e.preventDefault();
        setStatus('');
        setIndex(0);
        setIsRunning(true);
    }
    async function pushData(url){
        await axios.get(url);
    }
    const manualPush = () => {
        if(isRunning || index > routeList.length){
            var lat = routeList[index][0];
            var lng = routeList[index][1];
            setCurrentArray([lat,lng]);
            var url = 'http://localhost:5001/kapiot-46cbc/us-central1/setRoute?d=' + driverIndex.toString() + '&lat=' + lat.toString() + '&lng=' + lng.toString();
            pushData(url);
            setProgress(Math.round((index/routeList.length) * 100));
            setIndex(index+1);
            if(index > routeList.length){
                setIndex(0);
                setIsRunning(false);
            }
        }
      }
 
    useEffect(()=> {
        if(isRunning && index<routeList.length){
            var intervalId = window.setInterval(manualPush,pushSpeed);
            console.log('pushing...');
        }
        else{
            setProgress(100);
        }
        return () => clearInterval(intervalId);
    },[index,isRunning]);

    return (
        <div className='route'>
            <small>Speed: {speedStatus}</small>
            <h2>Pushing: </h2>
            <h1>{currentArray[0]}</h1>
            <h1>{currentArray[1]}</h1>
            {index!==routeList.length && 
                <div className='route__controls'>
                    <Button onClick={play} className="route__button" variant="contained">
                        <PlayArrow/>
                    </Button>
                    <Button onClick={pause} className="route__button" variant="contained">
                        <Pause/>
                    </Button>
                </div>
            }
            <small><strong>{status}</strong></small>
           {(index===routeList.length || status==='Paused') && 
                <Button onClick={reset} className="route__button" variant="contained">
                    <Replay/>
                </Button>
            }
            {(index!==routeList.length && status!=='Paused') && 
                <div className='route__controls'>
                    <Button onClick={slowed_50} startIcon={<FastRewind/>} className="route__button" variant="contained">0.50x</Button>
                    <Button onClick={slowed_25} startIcon={<FastRewind/>} className="route__button" variant="contained">0.25x</Button>
                    <Button onClick={normal_speed} startIcon={<FastForward/>} className="route__button" variant="contained">1.00x</Button>
                    <Button onClick={fast_25} startIcon={<FastForward/>} className="route__button" variant="contained">1.25</Button>
                    <Button onClick={fast_50} startIcon={<FastForward/>} className="route__button" variant="contained">1.50x</Button>
                </div>
            }
            <Box sx={{ width: '100%' }}>
                        <LinearProgressWithLabel className='progressbar' variant='determinate' value={progress} />
            </Box>

        </div>
    )
}

export default Route
