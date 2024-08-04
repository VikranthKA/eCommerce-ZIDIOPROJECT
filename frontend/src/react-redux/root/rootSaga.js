import {all} from 'redux-saga/effects'
import {
    categoryAllSaga,
    createCategorySaga
  } from "../saga/categorySaga"



export default function* rootSaga(){
    yield all([
        categoryAllSaga(),

    ])
}