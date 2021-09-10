import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Route.css'
import { Button } from '@material-ui/core';
function Route({routeList, driverIndex}) {
    const [index,setIndex] = useState(0);
    const [currentArray,setCurrentArray] = useState([]);
    const [isRunning,setIsRunning] = useState(true);
   
    const reset = (e) => {
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
    },[index]);

    return (
        <div className='route'>
            <h2>Pushing Next:</h2>
            <h1>{currentArray[0]}</h1>
            <h1>{currentArray[1]}</h1>
            {index===routeList.length && 
                <Button onClick={reset} className="route__button" variant="contained">Run Again</Button>
            }
        </div>
    )
}

export default Route
