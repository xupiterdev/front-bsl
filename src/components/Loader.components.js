import React from 'react'

import {CircularProgress, Typography} from '@material-ui/core'

export function Loader({open}){
    // FUNCTIONS

    // RENDER
    return(
        <React.Fragment>
            {open && 
            <div className='loader'>
                <div className="text-center">
                    <div><CircularProgress /></div>
                    <div><Typography variant="h3">BSL System</Typography></div>
                </div>
            </div>}
        </React.Fragment>
    )
}
