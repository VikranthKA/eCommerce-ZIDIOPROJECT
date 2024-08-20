import {configureStore} from '@reduxjs/toolkit'
import rootReducer from '../root/rootReducer'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../root/rootSaga'

const sageMiddleware = createSagaMiddleware()

const persistConfig = {
    key:'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['create/category',"update/category/saga","add/creating/product/saga",'remove/product/from/cart','update/created/product/saga',"update/user/profile/saga",'update/user/profile/saga',"create/review/for/product/saga"],
          ignoredPaths: ['payload'],
        },
      }).concat(sageMiddleware),
  })



sageMiddleware.run(rootSaga)

const persistor = persistStore(store)



export {
    store,persistor
}