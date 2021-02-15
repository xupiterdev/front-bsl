import React, {useState, useEffect} from 'react'
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
    Divider,
    Collapse
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
import {GetModule} from '../redux/actions/modules.action'

import {Loader} from '../components/Loader.components'

// VISTAS
import AllUsers from '../views/users/allUsers.view'
import AddOrUpdateUser from '../views/users/addOrUpdateUser.view'

import AllModules from '../views/modules/allModules.view'

import CustomerServices from '../views/imports/customerServices.view'
import AddOrUpdateReference from '../views/imports/addOrUpdateReference.view'

function RouteIndex(){
    // VARIABLES
    const [show, setShow] = useState({
        userOptions : null,
        menu : false,
        loader : true
    })

    const {userData} = useSelector(state => state.Session)
    const modules = useSelector(state => state.Modules.modules)

    const dispatch = useDispatch();
    
    // FUNCTIONS
    const toggle = (type, value) => setShow({...show, [type] : value})

    const fetchModules = async () => {
        try{
            await dispatch(GetModule())
        }catch(err){
            console.log(err)
        }
    }

    const handleSignOut = async () => {
        localStorage.clear()
        // try{
        //     await dispatch(SignOut)
        // }catch(err){
        //     console.log(err)
        // }
    }

    setHeaderAXIOS();

    useEffect(() => {
        fetchModules()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        toggle("loader", false)
    }, [])

    // RENDER
    return(
        <React.Fragment>
            <Loader open={show.loader}/>
            <Helmet>
                <title>{api.NAME_APP} - Inicio</title>
           </Helmet>
           <AppBar position="sticky">
               <Toolbar variant="dense">
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
                            {
                                modules.map((module, i) => {
                                    if(module.children.length !== 0){
                                        let p = module.children.filter((c) => {
                                            let ac = c._Action.map((a) => userData._Action.includes(a._id))
                                            return ac.includes(true)
                                        })
                                        if(p.length !== 0){
                                            let link = module.shortName.replace(" ", "-")
                                            return(
                                                <div>
                                                    <ListItem button component={NavLink} to="/s/users/all" activeClassName="link-active" key={i}>
                                                        <ListItemIcon><Person /></ListItemIcon>
                                                        <ListItemText primary={module.shortName}/>
                                                    </ListItem>
                                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            {
                                                                module.children.map((c, x) => {
                                                                    link += `/${c.shortName.replace(" ", "-")}`
                                                                    return(
                                                                        <ListItem button component={NavLink} to={`/s/${link}`} activeClassName="link-active ml-1" key={x}>
                                                                            <ListItemIcon><Person /></ListItemIcon>
                                                                            <ListItemText primary={c.shortName}/>
                                                                    </ListItem>
                                                                    )
                                                                })
                                                            }
                                                        </List>
                                                    </Collapse>
                                                </div>
                                            )
                                        } 
                                    }else{
                                        let ac = module._Action.map((a) => userData._Action.includes(a._id))

                                        let link = module.shortName.replace(" ", "-")
                                            
                                        if(ac.includes(true)){
                                            return(<ListItem button component={NavLink} to={`/s/${link}`} activeClassName="link-active" key={i}>
                                                        <ListItemIcon><Person /></ListItemIcon>
                                                        <ListItemText primary={module.shortName}/>
                                                </ListItem>) 
                                        }
                                    }
                                })
                            }
                            {/* <ListItem button component={NavLink} to="/s/users/all" activeClassName="link-active">
                                    <ListItemIcon><Person /></ListItemIcon>
                                    <ListItemText primary="Usuarios"/>
                            </ListItem>
                            <ListItem button component={NavLink} to="/s/modules/all" activeClassName="link-active">
                                    <ListItemIcon><Person /></ListItemIcon>
                                    <ListItemText primary="Modulos"/>
                            </ListItem> */}
                        </List>
                    </div>
                </Drawer>
                <div>
                    <Switch>
                        <Route exact path="/s/users/all" render={(props) => <AllUsers {...props} />} />
                        <Route exact path="/s/users/add-user" render={(props) => <AddOrUpdateUser {...props} />} />
                        
                        <Route exact path="/s/modules/all" render={(props) => <AllModules {...props} />} />

                        <Route exact path="/s/importacion/atencion-cliente" render={(props) => <CustomerServices {...props}/> } />
                        <Route exact path="/s/importacion/atencion-cliente/agregar-referencia" render={(props) => <AddOrUpdateReference {...props}/> } />
                    </Switch>
                </div>
           </React.Fragment>
    )
}

export default RouteIndex;