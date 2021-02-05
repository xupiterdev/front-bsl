import {api} from './api.util'
import axios from 'axios'
import jwt  from 'jsonwebtoken'

export const isValidToken = (token) => {
    try{
        jwt.verify(token, process.env.REACT_APP_KEY_TOKEN)
        // toast.success("Bievenido", { autoClose: 1000 });
        return true
    }catch(err){
        // toast.error("El token es invalido", { autoClose: 3000 });
        localStorage.clear()
        window.location.href = api.HOST
    }
}

export const setHeaderAXIOS = () => {
    let redux = JSON.parse(localStorage.getItem("redux"));
    if(redux !== null) axios.defaults.headers = {'Authorization': `Bearer ${redux.Session.token}`}
}

export const jsonToQueryString = (query, root) => {
    let params = new URLSearchParams();
    let keys = Object.keys(query)
    keys.map(key => params.append(key, query[key]))
    if(root) params.append("r",true)
    return params.toString()
}