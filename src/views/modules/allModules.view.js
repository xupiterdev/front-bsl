import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet-async'
import {api} from '../../utils/api.util'

import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    FormControl,
    FormHelperText,
    TextField,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem 
} from '@material-ui/core'

import {
    ExpandMore,
    Add
} from '@material-ui/icons'

import  {BreadCrumbs} from '../../components/BreadCrumbs.component'
import {Modal} from '../../components/Modal.componet'

import {useForm} from 'react-hook-form'

import {useDispatch, useSelector} from 'react-redux'
import {AddModule, GetModule} from '../../redux/actions/modules.action'

function AllModules(){
    // VARIABLES
    const [show, setShow] = useState({
        modalAddModule : false,
        modalAddSubModule : false,
        loadModal : false,
        menuAdd : false
    })

    // const [predecessor, setPredecessor] = useState(null);

    const {errors, handleSubmit, register} = useForm();
    const {modules} = useSelector(state => state.Modules)
    const dispatch = useDispatch()

    // FUNCTIONS
    const toggleShow = (type, value) => {setShow({...show, [type] : value})}

    const fetchModules = async () => {
        try{
            await dispatch(GetModule())
        }catch(err){
            console.log(err)
        }
    }

    const handleAddModule = async (data) => {
        if(show.modalAddModule) data.kind = "Modulo"
        else if(show.modalAddSubModule !== false){
            data.kind = "Sub"
            data._Predecessor = show.modalAddSubModule;
        }

        try{
            await dispatch(AddModule(data, {
                toggle : toggleShow
            }))
            toggleShow(show.modalAddModule ? "modalAddModule" : "modalAddSubModule", false)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchModules()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    // RENDER
    return(
        <React.Fragment>
            <Helmet>
                <title>{api.NAME_APP} - Todos los modulos</title>
            </Helmet>
            <div id="allModules" className="py-1">
                <div className="container">
                    {/* titulo */}
                    <BreadCrumbs
                        title="Todos los modulos"
                    >
                        <Typography>Modulos</Typography>
                        <Typography>Todos los modulos</Typography>
                    </BreadCrumbs>
                    <div className="mb-1">
                        <Button 
                            variant="contained" 
                            className="btn-success"
                            size="small"
                            startIcon={<Add/>}
                            onClick={(event) => toggleShow("modalAddModule", true)}
                        >agregar modulo</Button>
                    </div>
                    <div className="back back-padding-out">
                        {
                            modules.map((module, index) => {
                                return(
                                    <Accordion key={index}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                            aria-label="Expand"
                                            aria-controls={`additional-actions${index}-content`}
                                            id={`additional-actions${index}-header`}
                                        >
                                            <div className="row col-12 justify-content-between align-items-center">
                                                <Typography >{module.name}</Typography>
                                                <div>
                                                    <Button
                                                        variant="contained"
                                                        className="btn-success"
                                                        startIcon={<Add/>}
                                                        size="small"
                                                        onClick={() => toggleShow("modalAddSubModule", module._id) }
                                                    >
                                                        sub modulo
                                                    </Button>
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
                                                        open={show.menuAdd === false ? false : true}
                                                        onClose={() => toggleShow("menuAdd", false)}
                                                    >
                                                        <MenuItem >Usuario</MenuItem>
                                                    </Menu>
                                                </div>
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails className="d-block">
                                            {
                                                module.sub[0] !== null ? module.sub.map((sub) => {
                                                    return(
                                                        <Accordion className="col-12">
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMore />}
                                                                id="acciones"
                                                            >
                                                                <div className="row col-12 justify-content-between align-items-center">
                                                                    <Typography>{sub.name}</Typography>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="primary"
                                                                        size="small"
                                                                    >Sub Sub modulo</Button>
                                                                </div>
                                                            </AccordionSummary>
                                                            <AccordionDetails>
                                                                {
                                                                    sub.subSub[0] !== null ? sub.subSub.map((subSub) => {
                                                                        return(
                                                                            <Accordion className="col-12">
                                                                                <AccordionSummary
                                                                                    expandIcon={<ExpandMore />}
                                                                                    id="acciones"
                                                                                >
                                                                                    <div className="row col-12 justify-content-between align-items-center">
                                                                                        <Typography>{subSub.name}</Typography>
                                                                                        <Button
                                                                                            variant="contained"
                                                                                            color="primary"
                                                                                            size="small"
                                                                                        >Agregar accion</Button>
                                                                                    </div>
                                                                                </AccordionSummary>
                                                                                <AccordionDetails>
                                                                                    
                                                                                </AccordionDetails>
                                                                            </Accordion>
                                                                        )
                                                                    }) : ""
                                                                }
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    )
                                                }) : ""
                                            }
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {/* Modal agregar modulo */}
            <Modal
                title={`Agregar nuevo ${show.modalAddModule ? "modulo" : "sub modulo"}`}
                open={show.modalAddModule || show.modalAddSubModule}
                size="xs"
            >
                <form onSubmit={handleSubmit(handleAddModule)}>
                    <FormControl>
                        <TextField 
                            label={`Nombre ${show.modalAddModule ? "modulo" : "sub modulo"}`}
                            id="name"
                            name="name"
                            variant="outlined"
                            size="small"
                            error={errors.name !== undefined ? true : false}
                            inputRef={register({
                                required : {value : true, message : "Debes de introducir el nombre del usuario"},
                                pattern : {value : /^[a-zA-Z ]+$/, message : "Solo puedes introducir letras."}
                            })}
                        />
                        <FormHelperText className="text-danger">{errors?.name?.message}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <TextField 
                            label="Nombre corto"
                            id="shortName"
                            name="shortName"
                            variant="outlined"
                            size="small"
                            error={errors.shortName !== undefined ? true : false}
                            inputRef={register({
                                required : {value : true, message : "Debes de introducir el nombre del usuario"},
                                pattern : {value : /^[a-zA-Z ]+$/, message : "Solo puedes introducir letras."}
                            })}
                        />
                        <FormHelperText className="text-danger">{errors?.shortName?.message}</FormHelperText>
                    </FormControl>
                    {show.loadModal ? <div className="text-center mb-1"><CircularProgress /></div> : ""}
                    <div className="text-right">
                        <Button
                            size="small"
                            onClick={() => toggleShow(show.modalAddModule ? "modalAddModule" : "modalAddSubModule", false)}
                        >cerrar</Button>
                        <Button
                            className="ml-1 btn-success"
                            type="submit"
                            variant="contained"
                            size="small"
                            disabled={show.loadModal}
                        >guardar</Button>
                    </div>
                </form>
            </Modal>
        </React.Fragment>
    )
}

export default AllModules;