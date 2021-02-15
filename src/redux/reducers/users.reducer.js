const INITIAL_STATE = {
    users : []
}

export const Users = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch(type){
        case 'SET_USERS':
            return {
                ...state,
                users : payload.users
            }
        
        default: return state
    }
}