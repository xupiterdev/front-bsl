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

function AddOrUpdateUser({history, ...props}){
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
                <title>{api.NAME_APP} - Registrar nuevo usuario</title>
           </Helmet>
           <div id="addOrUpdateUser" className="py-1">
               <div className="container">
                    {/* title */}
                    <BreadCrumbs
                        title="Registrar nuevo usuario"
                    >
                        <Typography>Usuarios</Typography>
                        <NavLink className="link" color="inherit" to="/s/users/all">Todos los usuarios</NavLink>
                        <Typography>Registrar usuario</Typography>
                    </BreadCrumbs>
                    {/* Formulario de registro */}
                    <div className="row row justify-content-center align-items-md-center">
                        <form className="col-md-8" onSubmit={handleSubmit(handleAddOrUpdateUser)}>
                            <div className="back">
                                <Typography variant="subtitle1" className="text-center">Datos de usuario</Typography><Divider />
                                <div className="row mt-1">
                                    <div className="col-md-6">
                                        <FormControl>
                                            <TextField 
                                                label="Nombres"
                                                id="name"
                                                name="name"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => generateUser(e.target.value)}
                                                error={errors.name !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir el nombre"},
                                                    pattern : {value : /^[a-zA-Z ]+$/, message : "Solo puedes introducir letras."}
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.name?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-6">
                                        <FormControl>
                                            <TextField 
                                                label="Apellidos"
                                                id="lastname"
                                                name="lastname"
                                                variant="outlined"
                                                size="small"
                                                error={errors.lastname !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir los apellidos"},
                                                    pattern : {value : /^[a-zA-Z ]+$/, message : "Solo puedes introducir letras."}
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.lastname?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-4">
                                        <FormControl>
                                            <TextField 
                                                label="Puesto de trabajo"
                                                id="jobPosition"
                                                name="jobPosition"
                                                variant="outlined"
                                                size="small"
                                                select
                                                error={errors.jobPosition !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir los apellidos del usuario"}
                                                })}
                                                SelectProps={{native: true}}
                                            >
                                                <option value="Super usuario">Super usuario</option>
                                                <option value="Jefe de area">Jefe de area</option>
                                                <option value="Ejecutivo">Ejecutivo</option>
                                            </TextField>
                                            <FormHelperText className="text-danger">{errors?.jobPosition?.message}</FormHelperText>
                                        </FormControl>
                                    </div> 
                                    <div className="col-md-4">
                                        <FormControl>
                                            <TextField 
                                                label="Usuario"
                                                id="user"
                                                name="user"
                                                variant="outlined"
                                                size="small"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                defaultValue="---------------------"
                                                error={errors.user !== undefined ? true : false}
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir el usuario"},
                                                })}
                                            />
                                            <FormHelperText className="text-danger">{errors?.user?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="col-md-4">
                                        <FormControl>
                                            <TextField 
                                                id="password"
                                                name="password"
                                                type={show.password ? "text" : "password"} 
                                                label="Contraseña" 
                                                variant="outlined"
                                                size="small"
                                                inputRef={register({
                                                    required : {value : true, message : "Debes de introducir una contraseña"},
                                                    pattern : {value : /^[a-zA-Z 0-9]+$/, message : "Solo puedes introducir letra minuscula, letra mayuscula y numeros"},
                                                    minLength : {value : 8, message : "Tu contraseña debe de incluir por lo menos 8 caracteres"},
                                                    maxLength : {value : 16, message : "Tu contraseña dee de incluir por lo maximo  16  caracteres"}
                                                })}
                                                error={errors.password !== undefined ? true : false}
                                                InputProps={{
                                                    endAdornment : (
                                                        <InputAdornment style={{cursor:"pointer"}} onClick={() => setShow({...show, password : !show.password})}>
                                                            {show.password ? <VisibilityOff/> : <Visibility/>}
                                                        </InputAdornment>
                                                    )
                                                }}/>
                                            <FormHelperText className="text-danger">{errors?.password?.message}</FormHelperText>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="back mt-2">
                                <Typography variant="subtitle1" className="text-center">Permisos</Typography><Divider />
                                <div className="col-12 text-center">
                                    {show.isCorrect === false &&  <FormHelperText className="text-danger text-center">Debes de agregar los permisos</FormHelperText>}
                                </div>
                                <div className="row">
                                    <Lista 
                                        datas={modules}
                                        add={addPermissionsToState}
                                    />
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

export default AddOrUpdateUser;

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