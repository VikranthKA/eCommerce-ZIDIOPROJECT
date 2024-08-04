import { call, put, takeLatest } from 'redux-saga/effects';
import { setCategories ,fetchCategoriesFailure, setCreatedData} from "../slices/actions/categoryActions"
import axios from "../../Utils/api_resources/axios"
import { CREATE_CATEGORY, GET_ALL_CATEGORY} from '../constants/constantTypes';
import { config } from '../../Utils/api_resources/config';


function* fetchCategoriesSaga() {
  try {
    const {data} = yield call(axios.get, '/api/category',config);
    if (data) {
      yield put(setCategories(data))
    } 
  } catch (error) {
    console.log(error,"saga")
    yield put(fetchCategoriesFailure(error.message));
  }
}


export function* categoryAllSaga() {
  yield takeLatest(GET_ALL_CATEGORY, fetchCategoriesSaga);
}

function* createNewCategory(action){
  try {
    const {data} = yield call(axios.post,'/api/category',action.payload,)
    if(data){
      yield put(setCreatedData(data))
    }
  } catch (error) {
    console.log(error,"saga")
    yield put(fetchCategoriesFailure(error.message))
    
  }
}

export function* createCategorySaga(){
  yield takeLatest(CREATE_CATEGORY,createNewCategory)
}


   


