import React, {useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {api} from '../utils/api.util'
import {setHeaderAXIOS} from '../utils/helper.util'

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Drawer,
    Divider
} from '@material-ui/core'

import {
    Menu as MenuIcono,
    AccountCircle,
    Person
} from '@material-ui/icons'

import { 
    // BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";

import {useSelector, useDispatch} from 'react-redux'
import {SignOut} from '../redux/actions/session.action'

// VISTAS
import ListUsers from '../views/users/listUsers.view'

setHeaderAXIOS();

function RouteIndex(){
    // VARIABLES
    const [show, setShow] = useState({
        userOptions : null,
        menu : false
    })

    const {userData} = useSelector(state => state.Session)
    const dispatch = useDispatch();

    const handleSignOut = async () => {
        localStorage.clear()
        // try{
        //     await dispatch(SignOut)
        // }catch(err){
        //     console.log(err)
        // }
    }

    // RENDER
    return(
        <React.Fragment>
            <Helmet>
                <title>{api.NAME_APP} - Inicio</title>
           </Helmet>
           <AppBar>
               <Toolbar >
                    <IconButton color="inherit" onClick={() => setShow({...show, menu : !show.menu})}>
                       <MenuIcono />
                    </IconButton>
                    <Typography style={{flexGrow:1}}>BSL System</Typography>
                    <div>
                        <IconButton
                            aria-label="Cuenta del usuario actual"
                            aria-controls="menu-appbar"
                            onClick={(event) => setShow({...show, userOptions : event.currentTarget})}
                            color="inherit"
                        >
                            <AccountCircle />&nbsp;{userData.name}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={show.userOptions}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={show.userOptions !== null ? true : false}
                            onClose={() => setShow({...show, userOptions : null})}
                        >
                            <MenuItem onClick={() => setShow({...show, userOptions : null})}>Mi Perfil</MenuItem>
                            <MenuItem onClick={handleSignOut}>Cerrar Sesion</MenuItem>
                        </Menu>
                    </div>
               </Toolbar>
           </AppBar>
           <Drawer
                className="drawer"
                anchor="left"
                open={show.menu}
                onClick={() => setShow({...show, menu : !show.menu})}
            >
                    <div className="sidebar">
                        <List>
                            <div className="sidebar-header text-center row align-items-center justify-content-center">
                                <div><Typography variant="h6">Menu</Typography></div>
                            </div>
                            <Divider />
                            <ListItem button component={NavLink} to="/s/users" activeClassName="link-active">
                                    <ListItemIcon><Person /></ListItemIcon>
                                    <ListItemText primary="Usuarios"/>
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
                <div>
                    <Switch>
                        <Route exact path="/s/users" render={(props) => <ListUsers {...props} />} />
                    </Switch>
                </div>
           </React.Fragment>
    )
}

export default RouteIndex;