import React, {useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {api} from '../../utils/api.util'

import {BreadCrumbs} from '../../components/BreadCrumbs.component'

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
const data = [{
  "Acciones" : <IconButton size="small" className="btn-success"><Search /></IconButton>,
	"No" : "3927482638",
	"Referencia" : "H2G4T415445",
	"Cliente" : "Bachoco",
	"Referencia corresponsal" : "FJJHV874BJ",
	"Recepcion de documentos" : "05/01/2021",
	"Tipo de operacion" : "Importacion",
	"Tipo de mercancia" : "Carga suelta",
	"Aduana" : "Altamira",
	"Oficina comercial" : "CDMX",
	"Contenedor" : "BILU",
	"Referencia contenedor" : "BILU123456B",
	"B / M" : "JHBKB",
	"Naviera" : "Cosco",
	"BL" : "FUYRDT",
	"Puerto de origen" : "Veracruz",
	"Flete maritimo" : "JDFG764HGF",
},
{
  "Acciones" : <IconButton size="small" className="btn-success"><Search /></IconButton>,
	"No" : "3927482638",
	"Referencia" : "H2G4T415445",
	"Cliente" : "Bachoco",
	"Referencia corresponsal" : "FJJHV874BJ",
	"Recepcion de documentos" : "05/01/2021",
	"Tipo de operacion" : "Importacion",
	"Tipo de mercancia" : "Carga suelta",
	"Aduana" : "Altamira",
	"Oficina comercial" : "CDMX",
	"Contenedor" : "BILU",
	"Referencia contenedor" : "BILU123456B",
	"B / M" : "JHBKB",
	"Naviera" : "Cosco",
	"BL" : "FUYRDT",
	"Puerto de origen" : "Veracruz",
	"Flete maritimo" : "JDFG764HGF",
},{
  "Acciones" : <IconButton size="small" className="btn-success"><Search /></IconButton>,
	"No" : "3927482638",
	"Referencia" : "H2G4T415445",
	"Cliente" : "Bachoco",
	"Referencia corresponsal" : "FJJHV874BJ",
	"Recepcion de documentos" : "05/01/2021",
	"Tipo de operacion" : "Importacion",
	"Tipo de mercancia" : "Carga suelta",
	"Aduana" : "Altamira",
	"Oficina comercial" : "CDMX",
	"Contenedor" : "BILU",
	"Referencia contenedor" : "BILU123456B",
	"B / M" : "JHBKB",
	"Naviera" : "Cosco",
	"BL" : "FUYRDT",
	"Puerto de origen" : "Veracruz",
	"Flete maritimo" : "JDFG764HGF",
}];


const columns = [
    {
      name: 'Acciones',
      selector: 'Acciones',
      sortable: true,
    },
    {
      name: 'No',
      selector: 'No',
      sortable: false,
      grow:1.5
    },
    {
      name: 'Referencia',
      selector: 'Referencia',
      sortable: true,
      grow:1.5
    },
    {
      name: 'Cliente',
      selector: 'Cliente',
      sortable: true
    },
    {
      name: 'Referencia corresponsal',
      selector: 'Referencia corresponsal',
      sortable: true,
      grow:1.5
    },
    {
      name: 'Tipo de operacion',
      selector: 'Tipo de operacion',
      sortable: true
    },
    {
      name: 'Tipo de mercancia',
      selector: 'Tipo de mercancia',
      sortable: true,
      grow:1.5
    },
    {
      name: 'Aduana',
      selector: 'Aduana',
      sortable: true
    },
    {
      name: 'Oficina comercial',
      selector: 'Oficina comercial',
      sortable: true
    },
    {
      name: 'Contenedor',
      selector: 'Contenedor',
      sortable: true
    },
    {
      name: 'Referencia contenedor',
      selector: 'Referencia contenedor',
      sortable: true
    },
    {
      name: 'B / M',
      selector: 'B / M',
      sortable: true
    },
    {
      name: 'Naviera',
      selector: 'Naviera',
      sortable: true
    },
    {
      name: 'BL',
      selector: 'BL',
      sortable: true
    },
    {
      name: 'Puerto de origen',
      selector: 'Puerto de origen',
      sortable: true
    },
    {
      name: 'Flete maritimo',
      selector: 'Flete maritimo',
      sortable: true
    },
  ];
function Imports(){
    // VARIABLES
    const [show, setShow] = useState({
        menuAdd : null
    })
    // FUNCTIONS
    const toggleShow = (type, value) => setShow({...show, [type] : value})

    // FUNCTIONS

    // RENDER
    return(
        <React.Fragment>
            <Helmet>
                <title>{api.NAME_APP} - Atencion a clientes</title>
           </Helmet>
           
           <div id="customerServices" className="py-1">
                <div className="container">
                    {/* title */}
                    <BreadCrumbs
                        title="Atencion a clientes"
                    >
                        <Typography>Importacion</Typography>
                        <Typography>Atencion a clientes</Typography>
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
                                <MenuItem component={NavLink} to="/s/importacion/atencion-cliente/agregar-referencia">Referencia</MenuItem>
                            </Menu>
                        </div>
                    </div>
                    <div className="mt-1 back">
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
                    </div>
                </div>
           </div>
        </React.Fragment>
    )
}

export default Imports;
function MyTable() {
  return(
    <div className="more-info-table">
      <TableContainer>
        <div style={{
          width : document.getElementsByClassName("NfIlA")[0].scrollWidth - 50
        }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Referencia</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell className="th">Referencia corresponsal</TableCell>
                <TableCell>Tipo de operacion</TableCell>
                <TableCell>Tipo de mercancia</TableCell>
                <TableCell>Aduana</TableCell>
                <TableCell>Oficina Comercial</TableCell>
                <TableCell>Contenedor</TableCell>
                <TableCell>Referencia cliente</TableCell>
                <TableCell>B/M</TableCell>
                <TableCell>Naviera</TableCell>
                <TableCell>BL</TableCell>
                <TableCell>Puerto de origen</TableCell>
                <TableCell>Flete maritimo</TableCell>
                <TableCell>No</TableCell>
                <TableCell>Referencia</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Referencia corresponsal</TableCell>
                <TableCell>Tipo de operacion</TableCell>
                <TableCell>Tipo de mercancia</TableCell>
                <TableCell>Aduana</TableCell>
                <TableCell>Oficina Comercial</TableCell>
                <TableCell>Contenedor</TableCell>
                <TableCell>Referencia cliente</TableCell>
                <TableCell>B/M</TableCell>
                <TableCell>Naviera</TableCell>
                <TableCell>BL</TableCell>
                <TableCell>Puerto de origen</TableCell>
                <TableCell>Flete maritimo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Referencia</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell className="th">Referencia corresponsal</TableCell>
                  <TableCell>Tipo de operacion</TableCell>
                  <TableCell>Tipo de mercancia</TableCell>
                  <TableCell>Aduana</TableCell>
                  <TableCell>Oficina Comercial</TableCell>
                  <TableCell>Contenedor</TableCell>
                  <TableCell>Referencia cliente</TableCell>
                  <TableCell>B/M</TableCell>
                  <TableCell>Naviera</TableCell>
                  <TableCell>BL</TableCell>
                  <TableCell>Puerto de origen</TableCell>
                  <TableCell>Flete maritimo</TableCell>
                  <TableCell>No</TableCell>
                  <TableCell>Referencia</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Referencia corresponsal</TableCell>
                  <TableCell>Tipo de operacion</TableCell>
                  <TableCell>Tipo de mercancia</TableCell>
                  <TableCell>Aduana</TableCell>
                  <TableCell>Oficina Comercial</TableCell>
                  <TableCell>Contenedor</TableCell>
                  <TableCell>Referencia cliente</TableCell>
                  <TableCell>B/M</TableCell>
                  <TableCell>Naviera</TableCell>
                  <TableCell>BL</TableCell>
                  <TableCell>Puerto de origen</TableCell>
                  <TableCell>Flete maritimo</TableCell>
                </TableRow>
              </TableBody>
          </Table>
        </div>
      </TableContainer>
    </div>
  )
}