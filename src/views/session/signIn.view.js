import React, {useState} from 'react'
import {Helmet} from 'react-helmet-async'
import {api} from '../../utils/api.util'

import { 
    FormControl,
    FormHelperText,
    TextField,
    Typography,
    Button,
    InputAdornment,
    CircularProgress
} from '@material-ui/core'
import {Send, Visibility, VisibilityOff} from '@material-ui/icons'

import {useForm} from 'react-hook-form'

import {useDispatch} from 'react-redux'
import {SignIn as _SignIn} from '../../redux/actions/session.action'

export default function SignIn () {
    const [show, setShow] = useState({
        password : false,
        loading : false
    })
    const {register, handleSubmit, errors} = useForm()
    const dispatch = useDispatch()

    // helpers

    const toggle = (type, value) => setShow({...show, [type] : value})

    const handleSignIn = async (data) => {
        try{
            await dispatch(_SignIn(data,{
                toggle
            }))
        }catch(err){
            console.log(err)
        }
    }

    return(
        <React.Fragment>
            <Helmet><title>{api.NAME_APP} - Iniciar sesión</title></Helmet>
            <div id="signIn" className="row">
                <div className="col-md-9 d-none d-md-block"></div>
                <div className="col-md-3 row justify-content-center align-items-md-center align-items-start">
                    <form className="form-sign-in col-md-10 col-9" onSubmit={handleSubmit(handleSignIn)}>
                        <Typography variant="h4" className="text-center mb-md-05 mb-1">Bienvenido!</Typography>
                        {show.loading ? <div className="text-center mb-1"><CircularProgress /></div> : ""}
                        <div className="text-center">
                            <FormControl className="col-md-10 mb-1 col-9">
                                <TextField 
                                    id="user" 
                                    name="user" 
                                    label="Usuario" 
                                    variant="outlined"
                                    size="small"
                                    inputRef={register({
                                        required : {value : true, message : "Debes de introducir tu usuario"},
                                        pattern : {value : /^[a-zA-Z 0-9]+$/, message : "Solo puedes introducir numeros y letras."}
                                    })}
                                    error={errors.user !== undefined ? true : false}/>
                                <FormHelperText className="text-danger">{errors?.user?.message}</FormHelperText>
                            </FormControl>
                            <FormControl className="col-md-10 col-9 mb-1">
                                <TextField 
                                    id="password"
                                    name="password"
                                    type={show.password ? "text" : "password"} 
                                    label="Contraseña" 
                                    variant="outlined"
                                    size="small"
                                    inputRef={register({
                                        required : {value : true, message : "Debes de introducir tu contraseña"},
                                        pattern : {value : /^[a-zA-Z 0-9]+$/, message : "Solo puedes introducir letra minuscula, letra mayuscula y numeros"},
                                        minLength : {value : 8, message : "Tu contraseña debe de incluir por lo menos 8 caracteres"},
                                        maxLength : {value : 16, message : "Tu contraseña dee de incluir por lo maximo  16  caracteres"}
                                    })}
                                    error={errors.password !== undefined ? true : false}
                                    InputProps={{
                                        endAdornment : (
                                            <InputAdornment onClick={() => setShow({...show, password : !show.password})}>
                                                {show.password ? <VisibilityOff/> : <Visibility/>}
                                            </InputAdornment>
                                        )
                                    }}/>
                                    <FormHelperText className="text-danger">{errors?.password?.message}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="text-center">
                            <Button 
                                variant="contained" 
                                type="submit"
                                color="primary" 
                                size="small"
                                disabled={show.loading}
                                endIcon={<Send />}>
                                inciar sesion
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}