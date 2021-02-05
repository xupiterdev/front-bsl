const INITIAL_STATE = {
    modules : []
}

export const Modules = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch(type){
        case 'SET_MODULES':
            return {
                ...state,
                modules : payload.modules
            }
        
        default: return state
    }
}