import React, {useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {api} from '../../utils/api.util'

function ListUsers(){
    // VARIABLES
    const [state, setState] = useState(false)

    // FUNCTIONS

    // RENDER
    return(
        <React.Fragment>
            <Helmet>
                <title>{api.NAME_APP} - Lista de usuarios</title>
           </Helmet>
        </React.Fragment>
    )
}

export default ListUsers;