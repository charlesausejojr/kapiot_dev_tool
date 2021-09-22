import React from 'react'
import {Box, LinearProgress, Typography } from '@material-ui/core';

function LinearProgressWithLabel(props) {
    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
                </Box>
            </Box>      
        </div>
    )
}

export default LinearProgressWithLabel
