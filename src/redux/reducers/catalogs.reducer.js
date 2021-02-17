const INITIAL_STATE = {
    catalogs : [],
}

export const Catalogs = (state = INITIAL_STATE, action) => {
    const {type, payload} = action

    switch(type){
        case 'SET_CATALOGS':
            return {
                ...state,
                catalogs : payload.catalogs
            }
        
        default: return state
    }
}