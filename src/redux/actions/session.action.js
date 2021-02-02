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
export const SignIn = (data, functions) => {
    return async (dispatch) => {
        functions.toggle("loading", true);
        let toastId = toast("Cargando..", { autoClose: false });

        try {
            let user = await axios.post(api.USERS.SIGN_IN, data)
            if(user.status === 202){
                updateToast(toastId, user.data.msg, toast.TYPE.WARNING);
                functions.toggle("loading", false);
                return true;
            }
            dispatch({
                type : "SET_SESSION_DATA",
                payload : {
                    token : user.data.token,
                    userData : user.data.userData
                }
            })
            
            updateToast(toastId, user.data.msg, toast.TYPE.SUCCESS);
            functions.toggle("loading", false);
        } catch (err) {console.log(err)}
    }
}

export const SignOut = () => {
    return async (dispatch) => {
        let toastId = toast("Cargando..", { autoClose: false });
        alert("m")
        dispatch({
            type : "SET_SESSION_DATA",
            payload : {
                token : null,
                userData : {}
            }
        })
        updateToast(toastId, "Gracias por trabajar para mi :)", toast.TYPE.SUCCESS);
        localStorage.clear()
    }
}