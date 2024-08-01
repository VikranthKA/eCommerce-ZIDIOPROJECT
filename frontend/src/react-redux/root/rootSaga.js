import {all} from 'redux-saga/effects'
import categorySaga from "../saga/categorySaga"


export default function* rootSaga(){
    yield all([
        categorySaga(),

    ])
}