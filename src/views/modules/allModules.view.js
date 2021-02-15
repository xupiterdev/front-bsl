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
    MenuItem, 
    IconButton
} from '@material-ui/core'

import {
    ExpandMore,
    Add,
    PlaylistAddCheck
} from '@material-ui/icons'

import  {BreadCrumbs} from '../../components/BreadCrumbs.component'
import {Modal} from '../../components/Modal.componet'
import {MenuIconButton} from '../../components/MenuButton.component'

import {useForm} from 'react-hook-form'

import {useDispatch, useSelector} from 'react-redux'
import {AddModule, GetModule, AddAction} from '../../redux/actions/modules.action'

function AllModules(){
    // VARIABLES
    const [show, setShow] = useState({
        modalAddModule : false,
        modalAddSubModule : false,
        loadModal : false,
        modalAddActionModule : false,
        modalAddActionSub : false,
        modalShowAction : []
    })

    // const [predecessor, setPredecessor] = useState(null);

    const {errors, handleSubmit, register} = useForm();
    const dispatch = useDispatch()
    const modules = useSelector(state => state.Modules.modules)

    // FUNCTIONS
    const toggleShow = (type, value) => setShow({...show, [type] : value})

    const fetchModules = async () => {
        try{
            await dispatch(GetModule())
        }catch(err){
            console.log(err)
        }
    }

    const handleAddModule = async (data) => {
        if(show.modalAddSubModule !== false){
            data.type = "Sub"
            data._Module = show.modalAddSubModule;
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

    const handleAddAction = async (data) => {

        if(show.modalAddActionModule) data._Module = show.modalAddActionModule
        if(show.modalAddActionSub) {
            data.type = "Sub"
            data._Module = show.modalAddActionSub
        }

        try{
            await dispatch(AddAction(data, {
                toggle : toggleShow
            }))
            toggleShow(show.modalAddActionModule ? "modalAddActionModule" : "modalAddActionSub", false)
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
                        {/* MODULE */}
                        { 
                            modules.map((module, index) => (
                                <Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-label="Expand"
                                        aria-controls={`additional-actions${index}-modal-content`}
                                        id={`additional-actions${index}-modal-header`}
                                    >
                                        <div className="row col-12 justify-content-between align-items-center">
                                            <Typography >{module.name}</Typography>
                                            <div className="row">
                                                { module._Action.length !== 0 &&
                                                    <IconButton
                                                        size="small"
                                                        className="btn-success mr-05"
                                                        onClick={() => toggleShow("modalShowAction", module._Action) }
                                                    >
                                                        <PlaylistAddCheck />
                                                    </IconButton>
                                                }
                                                <MenuIconButton 
                                                    icon={<Add />}
                                                >
                                                    <MenuItem onClick={() => toggleShow("modalAddSubModule", module._id) }>Sub Modulo</MenuItem>
                                                    {module.children.length === 0 && <MenuItem onClick={() => toggleShow("modalAddActionModule", module._id)}>Accion</MenuItem>}
                                                </MenuIconButton>
                                            </div>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails className="d-block">
                                        {/* SUB */}
                                        {module.children && 
                                            module.children.map((sub, index) => (
                                                    <Accordion key={index}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMore />}
                                                            aria-label="Expand"
                                                            aria-controls={`additional-actions${index}-sub-content`}
                                                            id={`additional-actions${index}-sub-header`}
                                                        >
                                                            <div className="row col-12 justify-content-between align-items-center">
                                                                <Typography >{sub.name}</Typography>
                                                                <div className="row">
                                                                { sub._Action.length !== 0 &&
                                                                    <IconButton
                                                                        size="small"
                                                                        className="btn-success mr-05"
                                                                        onClick={() => toggleShow("modalShowAction", sub._Action) }
                                                                    >
                                                                        <PlaylistAddCheck />
                                                                    </IconButton>
                                                                }
                                                                    <MenuIconButton 
                                                                        icon={<Add />}
                                                                    >
                                                                        <MenuItem onClick={() => toggleShow("modalAddSubsub", sub._id) }>Sub Sub Modulo</MenuItem>
                                                                        <MenuItem onClick={() => toggleShow("modalAddActionSub", sub._id)}>Accion</MenuItem>
                                                                    </MenuIconButton>
                                                                </div>
                                                            </div>
                                                        </AccordionSummary>
                                                        <AccordionDetails className="d-block">
                                                        </AccordionDetails>
                                                    </Accordion>
                                                )
                                            )
                                        }
                                    </AccordionDetails>
                                </Accordion>
                            )
                        )
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
                                required : {value : true, message : "Debes de introducir el nombre del modulo"},
                                pattern : {value : /^[a-zA-Záéíóú ]+$/, message : "Solo puedes introducir letras."}
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
                                pattern : {value : /^[a-zA-Z áéíóú]+$/, message : "Solo puedes introducir letras."}
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
            {/* Modal agregar accion */}
            <Modal
                title={`Agregar nueva acción`}
                open={show.modalAddActionModule || show.modalAddActionSub}
                size="xs"
            >
                <form onSubmit={handleSubmit(handleAddAction)}>
                    <FormControl>
                        <TextField 
                            label={`Nombre de la accion`}
                            id="name"
                            name="name"
                            variant="outlined"
                            size="small"
                            error={errors.name !== undefined ? true : false}
                            inputRef={register({
                                required : {value : true, message : "Debes de introducir la acción"},
                                pattern : {value : /^[a-zA-Záéíóú ]+$/, message : "Solo puedes introducir letras."}
                            })}
                        />
                        <FormHelperText className="text-danger">{errors?.name?.message}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <TextField 
                            label="Descripción"
                            id="description"
                            name="description"
                            variant="outlined"
                            size="small"
                            multiline
                            rows={4}
                            error={errors.shortName !== undefined ? true : false}
                            inputRef={register({
                                required : {value : true, message : "Debes de introducir el nombre del usuario"},
                                pattern : {value : /^[a-zA-Záéíóú ]+$/, message : "Solo puedes introducir letras."}
                            })}
                        />
                        <FormHelperText className="text-danger">{errors?.shortName?.message}</FormHelperText>
                    </FormControl>
                    {show.loadModal ? <div className="text-center mb-1"><CircularProgress /></div> : ""}
                    <div className="text-right">
                        <Button
                            size="small"
                            onClick={() => toggleShow(show.modalAddActionModule ? "modalAddActionModule" : "modalAddActionSub", false)}
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
            {/* Modal mostrar accion */}
            <Modal
                title="Acciones del modulo"
                open={show.modalShowAction.length === 0 ? false : true}
            >
                <div>
                    <ul className="ul-action">
                    {
                        show.modalShowAction.map((action, index) => {
                            return(
                                <li key={index} className="li-action">
                                    <div><Typography variant="subtitle1">{action.name}</Typography></div>
                                    <div><Typography variant="caption">{action.description}</Typography></div>
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
                <div className="text-right">
                    <Button
                        size="small"
                        onClick={() => toggleShow("modalShowAction", [])}
                    >cerrar</Button>
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default AllModules;
