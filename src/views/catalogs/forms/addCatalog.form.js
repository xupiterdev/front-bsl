import React, {useEffect} from 'react'

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

import {Autocomplete} from '@material-ui/lab'

import {useForm} from 'react-hook-form'

import {useDispatch, useSelector} from 'react-redux'
import {GetCatalogs, AddCatalog} from '../../../redux/actions/catalogs.action'
import Catalogs from '../index.view'

export default function FormAddCatalog({close}){
    const {handleSubmit, errors, register} = useForm()
    const dispatch = useDispatch()
    const catalogs = useSelector(state => state.Catalogs.catalogs)
    // FUNCTIONS

    const fetch = async () => {
        try{
            await dispatch(GetCatalogs())
        }catch(err){
            console.log(err)
        }
    }

    const onHandleSubmit = async (data) => {
        console.log(data);
        try{
            await dispatch(AddCatalog(data))
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // RENDER
    return(
        <form id="add-catalog" onSubmit={handleSubmit(onHandleSubmit)}>
            <div>
                <FormControl>
                    <Autocomplete 
                        id="typeof"
                        options={catalogs || []}
                        getOptionLabel={(option) => option.typeof}
                        freeSolo
                        renderInput={(params) => <TextField 
                                                    {...params}
                                                    label="Nombre del catalogo"
                                                    name="typeof"
                                                    variant="outlined"
                                                    size="small"
                                                    error={errors.typeof !== undefined ? true : false}
                                                    inputRef={register({
                                                        required : {value : true, message : "Debes de introducir el nombre del catalogo"},
                                                        pattern : {value : /^[a-zA-Z ]+$/, message : "Solo puedes introducir letras."}
                                                    })}
                                                    />}
                    />
                    <FormHelperText className="text-danger">{errors?.typeof?.message}</FormHelperText>
                </FormControl>
            </div>
            <div className="text-right">
                <Button
                    type="button"
                    onClick={() => close()}
                >close</Button>
                <Button
                    type="submit"
                    className="btn-success ml-1"
                >Enviar</Button>
            </div>
        </form>
    )
}
