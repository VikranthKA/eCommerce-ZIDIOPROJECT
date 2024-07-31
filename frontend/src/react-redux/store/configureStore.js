import {configureStore} from '@reduxjs/toolkit'
import rootReducer from '../root/rootReducer'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'


const sageMiddleware = createSagaMiddleware()
const persistConfig = {
    key:'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(sageMiddleware)
    
})

// sageMiddleware.run(rootSaga)

const persistor = persistStore(store)



export {
    store,persistor
}