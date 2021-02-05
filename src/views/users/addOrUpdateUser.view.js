import React from 'react'
import {Helmet} from 'react-helmet-async'
import {api} from '../../utils/api.util'

import {BreadCrumbs} from '../../components/BreadCrumbs.component'

import {
    Typography,
    FormControl,
    FormHelperText,
    TextField,
    Divider
} from '@material-ui/core'

import {NavLink} from 'react-router-dom'

import {useForm} from 'react-hook-form'

function AddOrUpdateUser(){
    // VARIABLES
    // const [state, setState] = useState(false)
    const {handleSubmit, errors, register} = useForm()

    // FUNCTIONS

    const generateUser = (value) => { 
        let name1 = value.split(" ")
        document.getElementById("user").value = `${name1[0]}${value.length + Math.floor(Math.random() * (0 - 9) + 9)}${Math.floor(Math.random() * (1 - 999) + 999)}`
    }

    // RENDER
    return(
        <React.Fragment>
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
                        <form className="col-md-8 back">
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
                                                required : {value : true, message : "Debes de introducir el nombre del usuario"},
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
                                                required : {value : true, message : "Debes de introducir los apellidos del usuario"},
                                                pattern : {value : /^[a-zA-Z ]+$/, message : "Solo puedes introducir letras."}
                                            })}
                                        />
                                        <FormHelperText className="text-danger">{errors?.lastname?.message}</FormHelperText>
                                    </FormControl>
                                </div>
                                <div className="col-md-6">
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
                                <div className="col-md-6">
                                    <FormControl>
                                        <TextField 
                                            label="Usuario"
                                            id="user"
                                            name="user"
                                            variant="outlined"
                                            size="small"
                                            disabled
                                            defaultValue="---------------------"
                                            error={errors.user !== undefined ? true : false}
                                            inputRef={register({
                                                required : {value : true, message : "Debes de introducir los apellidos del usuario"},
                                            })}
                                        />
                                        <FormHelperText className="text-danger">{errors?.user?.message}</FormHelperText>
                                    </FormControl>
                                </div>
                            </div>
                        </form>
                    </div>
               </div>
           </div>
        </React.Fragment>
    )
}

export default AddOrUpdateUser;