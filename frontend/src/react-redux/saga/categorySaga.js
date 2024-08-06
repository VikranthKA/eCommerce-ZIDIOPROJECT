import { call, put, takeLatest } from 'redux-saga/effects';
import { setCategories ,fetchCategoriesFailure, setCreatedCategoryData, setUpdatedCategoryData, setRemovedCategory} from "../slices/actions/categoryActions"
import axios from "../../Utils/api_resources/axios"
import { CREATE_CATEGORY, DELETE_CATEGORY_SAGA, GET_ALL_CATEGORY, REMOVE_CATEGORY_EDIT_ID, UPDATE_CATEGORY_SAGA} from '../constants/constantTypes';
import { config, fileConfig } from '../../Utils/api_resources/config';


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
      const {data} = yield call(axios.post,'/api/category',action.payload,fileConfig)
        yield put(setCreatedCategoryData(data.data))
      

  } catch (error) {
    console.log(error,"saga")
    yield put(fetchCategoriesFailure(error.message))
    
  }
}

export function* createCategorySaga(){
  yield takeLatest(CREATE_CATEGORY,createNewCategory)
}

function* updateexistsCategory(action){

  try {
    if(action?.payload?._id){
      const {data} = yield call(axios.put,`/api/category/${action.payload._id}`,action.payload.data,fileConfig)
      if(data){
        yield put(setUpdatedCategoryData(data))
      }

    }
  } catch (error) {
    console.log(error,"saga")
    yield put(fetchCategoriesFailure(error.message))
    
  }
}

export function* updateCategorySaga(){
  yield takeLatest(UPDATE_CATEGORY_SAGA,updateexistsCategory)
}

function* deleteExistsCategory(action){

  try {
    console.log(action?.payload?._id)
    if(action?.payload?._id){
      console.log("makingApi")
      const response = yield call(axios.delete,`/api/category/${action.payload._id}`,fileConfig)
      console.log(response,"res")
      if(response.status===200){
        yield put(setRemovedCategory(response.data))
      }else{
        yield put(fetchCategoriesFailure(response.data.msg))

      }

    }
  } catch (error) {
    console.log(error,"saga")
    yield put(fetchCategoriesFailure(error.response.data.msg))
    
  }
}

export function* deleteCategorySaga(){
  yield takeLatest(DELETE_CATEGORY_SAGA,deleteExistsCategory)
}



