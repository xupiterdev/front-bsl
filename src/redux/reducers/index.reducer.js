import {combineReducers} from 'redux'

// REDUCERS
import {Session} from './session.reducer'
import {Modules} from './modules.reducer'

export default combineReducers({
    Session,
    Modules
})