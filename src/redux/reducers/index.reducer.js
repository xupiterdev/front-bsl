import {combineReducers} from 'redux'

// REDUCERS
import {Session} from './session.reducer'
import {Modules} from './modules.reducer'
import {Users} from './users.reducer'

export default combineReducers({
    Session,
    Modules,
    Users
})