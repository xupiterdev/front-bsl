import React,  {useState, useEffect, useCallback} from 'react'
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
    CircularProgress
} from '@material-ui/core'

import {
    Visibility, 
    VisibilityOff,
    ExpandLess,
    ExpandMore 
} from '@material-ui/icons'

import {Loader} from '../../components/Loader.components'

import {NavLink} from 'react-router-dom'

import {useForm} from 'react-hook-form'

import {useSelector, useDispatch} from 'react-redux'
import {GetModule} from '../../redux/actions/modules.action'
import {SignUp} from '../../redux/actions/users.action'

function AddOrUpdateReference({history, ...props}){
    // VARIABLES
    const [show, setShow] = useState({
        password : false,
        loader : true,
        isCorrect : true,
        load : false
    })
    const [permissions, setPermissions] =  useState([])
    const {handleSubmit, errors, register} = useForm()
    const dispatch = useDispatch()
    const modules = useSelector(state => state.Modules.modules)

    // FUNCTIONS
    const toggle = (type, value) => setShow({...show, [type] : value})

    const generateUser = (value) => { 
        let name1 = value.split(" ")
        document.getElementById("user").value = `${name1[0]}${value.length + Math.floor(Math.random() * (0 - 9) + 9)}${Math.floor(Math.random() * (1 - 999) + 999)}`
    }

    const fetchModules = async () => {
        try{
            await dispatch(GetModule())
        }catch(err){
            console.log(err)
        }
    }

    const addPermissionsToState = (_id) => {
        let currentPermissions = permissions;

        if(currentPermissions.includes(_id))currentPermissions.splice(permissions.indexOf(_id), 1);
        else currentPermissions.push(_id)
        
        setPermissions(currentPermissions);
    }

    const  handleAddOrUpdateUser = (data) => {
        if(permissions.length === 0){
            return toggle("isCorrect", false)
        }

        toggle("isCorrect", true)

        try{
            data._Action = permissions
            dispatch(SignUp(data, {
                toggle,
                goBack : history.goBack
            }))
        }catch(err){
            console.log(err)
        }
    }

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
                <title>{api.NAME_APP} - Registrar nueva referencia</title>
           </Helmet>
           <div id="addOrUpdateUser" className="py-1">
               <div className="container">
                    {/* title */}
                    <BreadCrumbs
                        title="Registrar nueva  referencia"
                    >
                        <Typography>Importacion</Typography>
                        <Typography className="link" onClick={() => history.goBack()}>Atencion a clientes</Typography>
                        <Typography>Registrar referencia</Typography>
                    </BreadCrumbs>
                    {/* Formulario de registro */}
                    <div className="row row justify-content-center align-items-md-center">
                        <form className="col-md-8" onSubmit={handleSubmit(handleAddOrUpdateUser)}>
                            <div className="back">
                                <Typography variant="subtitle1" className="text-center">Datos de referencia</Typography><Divider />
                                <div className="row mt-1">
                                    <div className="col-md-6">
                                        <FormControl>
                                            <TextField 
                                                label="Referencia"
                                                id="reference"
                                                name="reference"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => generateUser(e.target.value)}
                                                error={errors.reference !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir una referencia"},
                                                    pattern : {value : /^[a-zA-Z0-9 ]+$/, message : "Solo puedes introducir letras y numeros."}
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.reference?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6">
                                        {/* fecha */}
                                        <FormControl> 
                                            <TextField 
                                                label="Recepción de documentos"
                                                id="documentsReception"
                                                name="documentsReception"
                                                variant="outlined"
                                                size="small"
                                                // type="date"
                                                error={errors.documentsReception !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar una fecha"}
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.documentsReception?.message}</FormHelperText>
                                        </FormControl>
                                    </div> 
                                    <div className="col-md-6">
                                        {/* select */}
                                        <FormControl>
                                            <TextField 
                                                label="Cliente"
                                                id="_CatCliente"
                                                name="_CatCliente"
                                                variant="outlined"
                                                size="small"
                                                select
                                                error={errors._CatCliente !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar un cliente"}
                                                })}
                                                SelectProps={{native: true}}
                                            >
                                                <option value="Super usuario">Super usuario</option>
                                                <option value="Jefe de area">Jefe de area</option>
                                                <option value="Ejecutivo">Ejecutivo</option>
                                            </TextField>
                                            <FormHelperText className="text-danger">{errors?._CatCliente?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl>
                                            <TextField 
                                                label="Tipo de operacion"
                                                id="_CatTypeOperation"
                                                name="_CatTypeOperation"
                                                variant="outlined"
                                                size="small"
                                                select
                                                error={errors._CatTypeOperation !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar un tipo de operacion"}
                                                })}
                                                SelectProps={{native: true}}
                                            >
                                                <option value="Super usuario">Super usuario</option>
                                                <option value="Jefe de area">Jefe de area</option>
                                                <option value="Ejecutivo">Ejecutivo</option>
                                            </TextField>
                                            <FormHelperText className="text-danger">{errors?._CatTypeOperation?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-4">
                                        <FormControl>
                                            <TextField 
                                                label="Tipo de mercancia"
                                                id="_CatTypeMerchandise"
                                                name="_CatTypeMerchandise"
                                                variant="outlined"
                                                size="small"
                                                select
                                                error={errors._CatTypeMerchandise !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar un tipo de mercancia"}
                                                })}
                                                SelectProps={{native: true}}
                                            >
                                                <option value="Super usuario">Super usuario</option>
                                                <option value="Jefe de area">Jefe de area</option>
                                                <option value="Ejecutivo">Ejecutivo</option>
                                            </TextField>
                                            <FormHelperText className="text-danger">{errors?._CatTypeMerchandise?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-4">
                                        <FormControl>
                                            <TextField 
                                                label="Aduana"
                                                id="_CatLogisticOperator"
                                                name="_CatLogisticOperator"
                                                variant="outlined"
                                                size="small"
                                                select
                                                error={errors._CatLogisticOperator !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar una aduana"}
                                                })}
                                                SelectProps={{native: true}}
                                            >
                                                <option value="Super usuario">Super usuario</option>
                                                <option value="Jefe de area">Jefe de area</option>
                                                <option value="Ejecutivo">Ejecutivo</option>
                                            </TextField>
                                            <FormHelperText className="text-danger">{errors?._CatLogisticOperator?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-4">
                                        <FormControl>
                                            <TextField 
                                                label="Oficina comercial"
                                                id="_CatCommercialOffice"
                                                name="_CatCommercialOffice"
                                                variant="outlined"
                                                size="small"
                                                select
                                                error={errors._CatCommercialOffice !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar una oficina comercial"}
                                                })}
                                                SelectProps={{native: true}}
                                            >
                                                <option value="Super usuario">Super usuario</option>
                                                <option value="Jefe de area">Jefe de area</option>
                                                <option value="Ejecutivo">Ejecutivo</option>
                                            </TextField>
                                            <FormHelperText className="text-danger">{errors?._CatCommercialOffice?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl>
                                            <TextField 
                                                label="Contenedor"
                                                id="container"
                                                name="container"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => generateUser(e.target.value)}
                                                error={errors.container !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir un contenedor"},
                                                    pattern : {value : /^[a-zA-Z0-9 ]+$/, message : "Solo puedes introducir letras y numeros."}
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.container?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl>
                                            <TextField 
                                                label="Referencia de contenedor"
                                                id="containerReference"
                                                name="containerReference"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => generateUser(e.target.value)}
                                                error={errors.containerReference !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir la referencia de contenedor"},
                                                    pattern : {value : /^[a-zA-Z0-9 ]+$/, message : "Solo puedes introducir letras y numeros."}
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.containerReference?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-4">
                                        <FormControl>
                                            <TextField 
                                                label="B/M"
                                                id="BM"
                                                name="BM"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => generateUser(e.target.value)}
                                                error={errors.BM !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir el B/M"},
                                                    pattern : {value : /^[a-zA-Z0-9 ]+$/, message : "Solo puedes introducir letras y numeros."}
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.BM?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-4">
                                        <FormControl>
                                            <TextField 
                                                label="BL"
                                                id="BL"
                                                name="BL"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => generateUser(e.target.value)}
                                                error={errors.BL !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir el BL"},
                                                    pattern : {value : /^[a-zA-Z0-9 ]+$/, message : "Solo puedes introducir letras y numeros."}
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.BL?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-4">
                                        <FormControl>
                                            <TextField 
                                                label="Naviera"
                                                id="_CatShipowner"
                                                name="_CatShipowner"
                                                variant="outlined"
                                                size="small"
                                                select
                                                error={errors._CatShipowner !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar una naviera"}
                                                })}
                                                SelectProps={{native: true}}
                                            >
                                                <option value="Super usuario">Super usuario</option>
                                                <option value="Jefe de area">Jefe de area</option>
                                                <option value="Ejecutivo">Ejecutivo</option>
                                            </TextField>
                                            <FormHelperText className="text-danger">{errors?._CatShipowner?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl>
                                            <TextField 
                                                label="Puerto de origen"
                                                id="portOfOrigin"
                                                name="portOfOrigin"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => generateUser(e.target.value)}
                                                error={errors.portOfOrigin !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir el puerto de origen"},
                                                    pattern : {value : /^[a-zA-Z0-9 ]+$/, message : "Solo puedes introducir letras y numeros."}
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.portOfOrigin?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl>
                                            <TextField 
                                                label="Flete maritimo"
                                                id="seaFreight"
                                                name="seaFreight"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => generateUser(e.target.value)}
                                                error={errors.seaFreight !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir el flete maritimo"},
                                                    pattern : {value : /^[a-zA-Z0-9 ]+$/, message : "Solo puedes introducir letras y numeros."}
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.seaFreight?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-12">
                                        <FormControl>
                                            <TextField 
                                                label="Ejecutivo"
                                                id="_Executive"
                                                name="_Executive"
                                                variant="outlined"
                                                size="small"
                                                select
                                                error={errors._Executive !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar una ejecutivo"}
                                                })}
                                                SelectProps={{native: true}}
                                            >
                                                <option value="Super usuario">Super usuario</option>
                                                <option value="Jefe de area">Jefe de area</option>
                                                <option value="Ejecutivo">Ejecutivo</option>
                                            </TextField>
                                            <FormHelperText className="text-danger">{errors?._Executive?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="back mt-2">
                                <Typography variant="subtitle1" className="text-center">Datos de documentos</Typography><Divider />
                                <div className="row mt-1">
                                    <div className="col-md-6">
                                        <FormControl>
                                            <TextField 
                                                label="Proveedor / Cliente"
                                                id="_CatProvider"
                                                name="_CatProvider"
                                                variant="outlined"
                                                size="small"
                                                select
                                                error={errors._CatProvider !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar un provedor / cliente"}
                                                })}
                                                SelectProps={{native: true}}
                                            >
                                                <option value="Super usuario">Super usuario</option>
                                                <option value="Jefe de area">Jefe de area</option>
                                                <option value="Ejecutivo">Ejecutivo</option>
                                            </TextField>
                                            <FormHelperText className="text-danger">{errors?._CatProvider?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6">
                                        {/* select */}
                                        <FormControl>
                                            <TextField 
                                                label="Mercancia"
                                                id="_CatCommodity"
                                                name="_CatCommodity"
                                                variant="outlined"
                                                size="small"
                                                select
                                                error={errors._CatCommodity !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar la mercancia"}
                                                })}
                                                SelectProps={{native: true}}
                                            >
                                                <option value="Super usuario">Super usuario</option>
                                                <option value="Jefe de area">Jefe de area</option>
                                                <option value="Ejecutivo">Ejecutivo</option>
                                            </TextField>
                                            <FormHelperText className="text-danger">{errors?._CatCommodity?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6">
                                        {/* fecha */}
                                        <FormControl> 
                                            <TextField 
                                                label="ETA"
                                                id="ETA"
                                                name="ETA"
                                                variant="outlined"
                                                size="small"
                                                // type="date"
                                                error={errors.ETA !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar una fecha"}
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.ETA?.message}</FormHelperText>
                                        </FormControl>
                                    </div> 
                                    <div className="col-md-6">
                                        <FormControl>
                                            <TextField 
                                                label="Patente"
                                                id="_CatPatent"
                                                name="_CatPatent"
                                                variant="outlined"
                                                size="small"
                                                select
                                                error={errors._CatPatent !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de seleccionar una patente"}
                                                })}
                                                SelectProps={{native: true}}
                                            >
                                                <option value="Super usuario">Super usuario</option>
                                                <option value="Jefe de area">Jefe de area</option>
                                                <option value="Ejecutivo">Ejecutivo</option>
                                            </TextField>
                                            <FormHelperText className="text-danger">{errors?._CatPatent?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            {show.load && <div className="text-center mt-1"><CircularProgress/></div>}
                            <div className="col-12 text-center mt-1">
                                <Button
                                    onClick={() => history.goBack()}
                                    className=" mr-1"
                                >
                                    Volver
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    className="btn-success"
                                    disabled={show.load}
                                >
                                    Guardar
                                </Button>
                            </div>
                        </form>
                    </div>
               </div>
           </div>
        </React.Fragment>
    )
}

export default AddOrUpdateReference;

function Lista({datas, add}){
    return(
        <List>
            {datas.map((data, i) => {
                return(<ListaSimple index={i} datas={data} key={data._id} add={add}/>)
            })}
        </List>
    )
}

function ListaSimple({datas, index, add}){
    const [isOpen, setIsOpen] = useState(false)
    return(
        <>
            <ListItem button onClick={() => setIsOpen(!isOpen)} key={`a-${index}`}>
                <ListItemText id={datas._id} primary={datas.name} />
                {datas.children.length !== 0 && (isOpen ? <ExpandLess /> : <ExpandMore />)}
                {datas._Action.length !== 0 && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {datas.children.length !== 0 && <ListaCollapse datas={datas.children} open={isOpen} add={add}/>}
            {datas._Action.length !== 0 && <ListaCollapse datas={datas._Action} open={isOpen} isAction={true} add={add}/>}
        </>
    )
}

function ListaAction({datas, index, add}){
    const [checked, setChecked] = React.useState([0]); 
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        
        setChecked(newChecked);
    };
    return(
        <>
            <ListItem button onClick={() => {
                handleToggle(index)
                add(datas._id)
            }}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': datas._id }}
                    />
                </ListItemIcon>
                <ListItemText id={datas._id} primary={datas.name} secondary={datas.description}/>
            </ListItem>
        </>
    )
}

var count = -1
function ListaCollapse({datas, open, isAction, add}){
    return(
        <>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className="ml-1">
                {
                    datas.map((data, i) => {
                        if(isAction)return(<ListaAction datas={data} index={count++} key={data._id} add={add}/>)
                        else return(<ListaSimple datas={data} index={i} key={data._id} add={add}/>)
                    })
                }
                </List> 
            </Collapse>
        </>
        
    )
}