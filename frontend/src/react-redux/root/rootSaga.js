import {all} from 'redux-saga/effects'
import {
    categoryAllSaga,
    createCategorySaga,
    deleteCategorySaga,
    updateCategorySaga
  } from "../saga/categorySaga"
import { productAllSaga } from '../saga/productSaga'



export default function* rootSaga(){
    yield all([
        categoryAllSaga(),
        createCategorySaga(),
        updateCategorySaga(),
        deleteCategorySaga(),
        productAllSaga()

    ])
}