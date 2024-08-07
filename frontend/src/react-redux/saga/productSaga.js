import { call, put, takeLatest } from 'redux-saga/effects';
import axios from "../../Utils/api_resources/axios"
import { config, fileConfig } from '../../Utils/api_resources/config';
import { errorInProduct, setAllProducts, setCreatedProduct, setUpdatedProduct } from '../slices/actions/productActions';
import { ADD_CREATE_PRODUCT_SAGA, GET_ALL_PRODUCTS, UPDATE_CREATED_PRODUCT_SAGA } from '../constants/constantTypes';



function* fetchProductsSaga() {
  try {
    const {data} = yield call(axios.get, '/api/products',config);

    if (data) {
      yield put(setAllProducts(data.data))
    } 
  } catch (error) {
    console.log(error,"saga")
    yield put(errorInProduct(error.response.data.error.msg));
  }
}


export function* productAllSaga() {
  yield takeLatest(GET_ALL_PRODUCTS, fetchProductsSaga);
}

function* createNewProduct(action) {
  try {
    const {data} = yield call(axios.post, '/api/product',action.payload,fileConfig);
    console.log(data.data,"new product")

    if (data) {
      yield put(setCreatedProduct(data.data))
    } 
  } catch (error) {
    console.log(error,"saga")
    yield put(errorInProduct(error.response.data.error.msg));
  }
}


export function* setNewCreatedProductSaga() {
  yield takeLatest(ADD_CREATE_PRODUCT_SAGA, createNewProduct);
}


function* updateExistingProduct(action) {
  try {
    const response = yield call(axios.put, `/api/product/${action.payload._id}`,action.payload,fileConfig);
    console.log(response.data,"updated product")

    if (response.data) {
      yield put(setUpdatedProduct(response.data))
    } 
  } catch (error) {
    console.log(error,"saga")
    yield put(errorInProduct(error.response.data.error.msg));
  }
}


export function* setUpdatedProductSaga() {
  yield takeLatest(UPDATE_CREATED_PRODUCT_SAGA, updateExistingProduct)
}