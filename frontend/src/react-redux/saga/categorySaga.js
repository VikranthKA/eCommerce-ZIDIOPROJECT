import { call, put, takeLatest } from 'redux-saga/effects';
import { setCategories ,fetchCategoriesFailure} from "../slices/actions/categoryActions"
import axios from "../../Utils/api_resources/axios"
import { GET_ALL_CATEGORY } from '../constants/constantTypes';

function* fetchCategoriesSaga() {
  try {
    const {data} = yield call(axios.get, '/api/category');
    if (data) {
      yield put(setCategories(data))
    } 
  } catch (error) {
    console.log(error,"saga")
    yield put(fetchCategoriesFailure(error.message));
  }
}

function* categorySaga() {
  yield takeLatest(GET_ALL_CATEGORY, fetchCategoriesSaga);
}

export default categorySaga
