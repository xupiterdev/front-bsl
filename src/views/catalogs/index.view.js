import React, {useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {api} from '../../utils/api.util'

import {BreadCrumbs} from '../../components/BreadCrumbs.component'
import {Modal} from '../../components/Modal.componet'

import {
    Typography,
    FormControl,
    FormHelperText,
    TextField,
    Divider,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Checkbox,
    Collapse,
    Button,
    CircularProgress,
    Menu,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton
} from '@material-ui/core'

import {Search} from '@material-ui/icons'

import DataTable from 'react-data-table-component'

import {NavLink} from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// FORMS

import FormAddCatalog from './forms/addCatalog.form'

function Catalogs(){
    // VARIABLES
    const [show, setShow] = useState({
        menuAdd : null,
        modalAddCatalog : true
    })

    // FUNCTIONS
    const toggleShow = (type, value) => setShow({...show, [type] : value})

    // FUNCTIONS

    const showForm = () => {
        if(show.modalAddCatalog) return(<FormAddCatalog close={() =>  toggleShow("modalAddCatalog", false)}/>)
    }

    // RENDER
    return(
        <React.Fragment>
            <Helmet>
                <title>{api.NAME_APP} - Catalogos</title>
           </Helmet>
           
           <div id="customerServices" className="py-1">
                <div className="container">
                    {/* title */}
                    <BreadCrumbs
                        title="Catalogos"
                    >
                        <Typography>Catalogos</Typography>
                        <Typography>Todos</Typography>
                    </BreadCrumbs>
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
                                open={show.menuAdd ? true : false}
                                onClose={() => toggleShow("menuAdd", null)}
                            >
                                <MenuItem onClick={() => toggleShow("modalAddCatalog", true)}>Catalogo</MenuItem>
                            </Menu>
                        </div>
                    </div>
                    {/* <div className="mt-1 back">
                        <DataTable
                            // title="Referencias de importacion"
                            columns={columns}
                            style={{marginTop : "1em"}}
                            data={data}
                            highlightOnHover
                            expandableRows
                            expandOnRowClicked
                            expandableRowsComponent={<MyTable />}
                            subHeader
                            subHeaderComponent={<TextField 
                              label="Buscar"
                              variant="outlined"
                              size="small"
                            />}
                        />
                    </div> */}
                </div>
           </div>
           <Dialog 
                open={show.modalAddCatalog} 
                onClose={() => toggleShow("modalAddCatalog", false)} 
                maxWidth="xs"
                fullWidth={true}
            >
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>{showForm()}</DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default Catalogs;