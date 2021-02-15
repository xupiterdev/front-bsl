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
export const SignUp = (data, functions) => {
    return async (dispatch) => {
        functions.toggle("load", true);
        let toastId = toast("Cargando..", { autoClose: false });

        try {
            let users = await axios.post(api.USERS.SIGN_UP, data)

            dispatch({
            type : "SET_USERS",
                payload : {
                    users : users.data.users
                }
            })
            
            updateToast(toastId, users.data.msg, toast.TYPE.SUCCESS);
            functions.toggle("load", false);
            functions.goBack()
        } catch (err) {
            goToHome(err, dispatch, toastId)
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