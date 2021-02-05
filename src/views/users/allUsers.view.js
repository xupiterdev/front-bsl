import React, {useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {api} from '../../utils/api.util'

import {NavLink} from 'react-router-dom'

import {
    Button,
    Typography,
    Menu,
    MenuItem
} from '@material-ui/core'

import {BreadCrumbs} from '../../components/BreadCrumbs.component'

function ListUsers(){
    // VARIABLES
    const [show, setShow] = useState({
        menuAdd : null
    })
    // FUNCTIONS
    const toggleShow = (type, value) => setShow({...show, [type] : value})

    // RENDER
    return(
        <React.Fragment>
            <Helmet>
                <title>{api.NAME_APP} - Todos los usuarios</title>
           </Helmet>
           <div id="allUsers" className="py-1">
                <div className="container">
                    {/* titulo */}
                    <BreadCrumbs
                        title="Lista de usuarios"
                    >
                        <Typography>Usuarios</Typography>
                        <Typography>Todos los usuarios</Typography>
                    </BreadCrumbs>
                    {/* lista de acciones */}
                    <div className="row">
                        <div className="col-md-2">
                            <Button 
                                variant="contained"
                                id="btnAdd"
                                size="small"
                                className="btn-success"
                                arial-controls="menuAdd"
                                onClick={(event) => toggleShow("menuAdd", event.currentTarget)}
                            >agregar</Button>
                            <Menu
                                id="menuAdd"
                                anchorEl={show.menuAdd}
                                open={show.menuAdd}
                                onClose={() => toggleShow("menuAdd", null)}
                            >
                                <MenuItem component={NavLink} to="/s/users/add-user">Usuario</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>
           </div>
        </React.Fragment>
    )
}

export default ListUsers;
