const INITIAL_STATE = {
    token : null,
    userData : {}
}

export const Session = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch(type){
        case 'SET_SESSION_DATA':
            return {
                ...state,
                token : payload.token,
                userData : payload.userData
            }
        
        default: return state
    }
}