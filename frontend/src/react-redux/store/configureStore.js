import {applyMiddleware,createStore,combineReducers} from 'redux'
import {thunk} from 'redux-thunk'


const rootReducer = {

}

const configureStore = ()=>{

    const store = createStore(combineReducers(rootReducer),applyMiddleware(thunk))
    return store
}

export default configureStore