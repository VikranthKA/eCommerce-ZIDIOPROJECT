import { call, put, takeLatest } from 'redux-saga/effects';
import {GET_ALL_CATEGORY, getAllCategory ,fetchCategoriesFailure} from "../slices/actions/categoryActions"
import axios from "../../Utils/api_resources/axios"
import config from "../../Utils/api_resources/config"

function* fetchCategoriesSaga() {
  try {
    const response = yield call(axios, '/api/category',config);
    console.log(response,"in cat saga")
    // const data = yield response.json();
    // if (data) {
    //   yield put(getAllCategory(data));
    // } 
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

function* categorySaga() {
  yield takeLatest(GET_ALL_CATEGORY, fetchCategoriesSaga);
}

export default categorySaga;
