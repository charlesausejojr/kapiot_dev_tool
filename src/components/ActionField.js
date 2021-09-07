import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './ActionField.css';

function ActionField() {
    const [riderIndex,setRiderIndex] = useState(0);
    const [driverIndex,setDriverIndex] = useState(0);

    const populateFirebase = async (e) => {
        await fetch("http://localhost:5001/kapiot-46cbc/us-central1/populateAll");
        e.preventDefault();
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
        <div className="actionField__right">
            <div className="actionField__right__buttons">
                <Button onClick={() => axios.get("http://localhost:5001/kapiot-46cbc/us-central1/requestDriver?r=" + riderIndex.toString() + "&d=" + driverIndex.toString())} variant='contained' color='primary' className="action__button">Request Driver</Button>
                <Button variant='contained' color='primary' className="action__button">Request All Drivers</Button>
                <Button variant='contained' color='primary' className="action__button">Accept Rider</Button>
                <Button variant='contained' color='primary' className="action__button">Drop Rider</Button>
                <Button onClick={() => axios.get("http://localhost:5001/kapiot-46cbc/us-central1/populateAll")} variant='contained' color='primary' className="action__button">Populate Firebase</Button>
            </div>
        </div>
    </div>
    )
}

export default ActionField
