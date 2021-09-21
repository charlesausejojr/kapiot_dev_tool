import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Route.css'
import { Button } from '@material-ui/core';
import { Pause, PlayArrow, Replay } from '@material-ui/icons';
function Route({routeList, driverIndex}) {
    const [index,setIndex] = useState(0);
    const [currentArray,setCurrentArray] = useState([]);
    const [isRunning,setIsRunning] = useState(true);
    const [status,setStatus] = useState('');
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
            setIndex(index+1);
            if(index > routeList.length){
                setIndex(0);
                setIsRunning(false);
            }
        }
      }
 
    useEffect(()=> {
        if(isRunning && index<routeList.length){
            var intervalId = window.setInterval(manualPush,1000);
            console.log('pushing...');
        }
        return () => clearInterval(intervalId);
    },[index,isRunning]);

    return (
        <div className='route'>
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
           {index===routeList.length && 
                <Button onClick={reset} className="route__button" variant="contained">
                    <Replay/>
                </Button>
            }
        </div>
    )
}

export default Route
