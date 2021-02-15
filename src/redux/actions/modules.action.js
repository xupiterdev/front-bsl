import axios from "axios"
import {api} from '../../utils/api.util'
import {toast} from 'react-toastify';

/// CONFIGS
const updateToast = (toastId, label, type) => {
    toast.update(toastId,{
        render : label,
        type : type, 
        autoClose : 3500
    });
}

// ACTIONS
export const GetModule = () => {
    return async (dispatch) => {
        try {
            let modules = await axios.get(api.MODULES.GET)
            dispatch({
                type : "SET_MODULES",
                payload : {
                    modules : modules.data.modules
                }
            })

        } catch (error) {
            goToHome(error, dispatch)
        }
    }
}

export const AddModule = (data, functions) => {
    return async (dispatch) => {
        functions.toggle("loadModal", true);
        let toastId = toast("Cargando..", { autoClose: false });

        try {
            let modules = await axios.post(api.MODULES.ADD, data)

            dispatch({
                type : "SET_MODULES",
                payload : {
                    modules : modules.data.modules
                }
            })
            
            updateToast(toastId, modules.data.msg, toast.TYPE.SUCCESS);
            functions.toggle("loadModal", false);
        } catch (err) {
            if(err.response.status === 403){
                dispatch({
                    type : "SET_SESSION_DATA",
                    payload : {
                        token : null,
                        userData : {}
                    }
                })
            }

            updateToast(toastId, err.response.data.msg, toast.TYPE.WARNING);

            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

export const AddAction = (data, functions) => {
    return async (dispatch) => {
        functions.toggle("loadModal", true);
        let toastId = toast("Cargando..", { autoClose: false });

        try {
            let modules = await axios.post(api.MODULES.ADD_ACTION, data)

            dispatch({
            type : "SET_MODULES",
                payload : {
                    modules : modules.data.modules
                }
            })
            
            updateToast(toastId, modules.data.msg, toast.TYPE.SUCCESS);
            functions.toggle("loadModal", false);
        } catch (err) {
            if(err.response.status === 403){
                dispatch({
                    type : "SET_SESSION_DATA",
                    payload : {
                        token : null,
                        userData : {}
                    }
                })
            }

            updateToast(toastId, err.response.data.msg, toast.TYPE.WARNING);

            console.log("Error in reference redux : ", err.response.status);
        }
    }
}

const goToHome = (err, dispatch, toastId=false) => {
    if(err.response.status === 403){
        dispatch({
            type : "SET_SESSION_DATA",
            payload : {
                token : null,
                userData : {}
            }
        })
    }
    updateToast(toastId, err.response.data.msg, toast.TYPE.WARNING);
    console.log("Error in reference redux : ", err.response.status);
}